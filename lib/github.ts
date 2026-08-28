export type GitHubEvent = {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  message: string;
  createdAt: string;
};

export async function getLatestGitHubEvents(
  username: string = "BVChandrahaas",
  limit: number = 5
): Promise<GitHubEvent[]> {
  try {
    const headers = {
      "User-Agent": "personal-website",
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch user public events feed
    const eventsPromise = fetch(
      `https://api.github.com/users/${username}/events/public`,
      { headers, next: { revalidate: 120 } }
    ).then((r) => (r.ok ? r.json() : [])).catch(() => []);

    // 2. Fetch user's public repositories to get direct commit history
    const reposPromise = fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      { headers, next: { revalidate: 120 } }
    ).then((r) => (r.ok ? r.json() : [])).catch(() => []);

    const [events, repos] = await Promise.all([eventsPromise, reposPromise]);

    const allEvents: GitHubEvent[] = [];

    // Process user public events
    if (Array.isArray(events)) {
      for (const ev of events) {
        const rawRepoName = ev.repo?.name || "";
        const repoShortName = rawRepoName.replace(`${username}/`, "");
        const repoUrl = `https://github.com/${rawRepoName}`;
        const createdAt = ev.created_at;

        if (ev.type === "PushEvent") {
          const commits = ev.payload?.commits;
          const ref = (ev.payload?.ref || "main").replace("refs/heads/", "");
          const commitMsg =
            commits && commits.length > 0 && commits[commits.length - 1]?.message
              ? commits[commits.length - 1].message
              : `Pushed commits to ${ref}`;

          allEvents.push({
            id: ev.id,
            type: "PushEvent",
            repoName: repoShortName,
            repoUrl,
            message: commitMsg.split("\n")[0],
            createdAt,
          });
        } else if (ev.type === "PullRequestReviewEvent") {
          const state = ev.payload?.review?.state || "reviewed";
          const prNum = ev.payload?.pull_request?.number || "";
          const actionLabel = state === "approved" ? "Approved" : "Reviewed";
          allEvents.push({
            id: ev.id,
            type: "PullRequestReviewEvent",
            repoName: repoShortName,
            repoUrl,
            message: `${actionLabel} PR ${prNum ? `#${prNum}` : ""}`.trim(),
            createdAt,
          });
        } else if (ev.type === "PullRequestEvent") {
          const action = ev.payload?.action || "opened";
          const title = ev.payload?.pull_request?.title || "";
          const prNum = ev.payload?.number || ev.payload?.pull_request?.number || "";
          allEvents.push({
            id: ev.id,
            type: "PullRequestEvent",
            repoName: repoShortName,
            repoUrl,
            message: `${action} PR #${prNum}: ${title}`.trim(),
            createdAt,
          });
        }
      }
    }

    // Process direct commits from active public repos
    if (Array.isArray(repos)) {
      const commitPromises = repos.slice(0, 4).map(async (repo: any) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?per_page=3`,
            { headers, next: { revalidate: 120 } }
          );
          if (!res.ok) return [];
          const commits = await res.json();
          if (!Array.isArray(commits)) return [];
          return commits.map((c: any) => ({
            id: c.sha,
            type: "PushEvent",
            repoName: repo.name,
            repoUrl: repo.html_url,
            message: (c.commit?.message || "Updated code").split("\n")[0],
            createdAt: c.commit?.author?.date || c.commit?.committer?.date || new Date().toISOString(),
          }));
        } catch {
          return [];
        }
      });

      const repoCommits = (await Promise.all(commitPromises)).flat();
      allEvents.push(...repoCommits);
    }

    if (allEvents.length === 0) return getFallbackEvents();

    // Sort by date descending
    allEvents.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Deduplicate by repoName + message
    const uniqueEvents: GitHubEvent[] = [];
    const seenKeys = new Set<string>();

    for (const ev of allEvents) {
      const key = `${ev.repoName}:${ev.message}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        uniqueEvents.push(ev);
      }
      if (uniqueEvents.length >= limit) break;
    }

    return uniqueEvents.length > 0 ? uniqueEvents : getFallbackEvents();
  } catch (err) {
    console.error("Error fetching GitHub events:", err);
    return getFallbackEvents();
  }
}

function getFallbackEvents(): GitHubEvent[] {
  return [
    {
      id: "fallback-1",
      type: "PushEvent",
      repoName: "Swessen",
      repoUrl: "https://github.com/BVChandrahaas/Swessen",
      message: "MemTable storage buffer & Tombstone handling",
      createdAt: new Date().toISOString(),
    },
    {
      id: "fallback-2",
      type: "PushEvent",
      repoName: "nanoGPT",
      repoUrl: "https://github.com/BVChandrahaas",
      message: "13.8M param decoder training on TinyStories",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: "fallback-3",
      type: "PushEvent",
      repoName: "personal-site",
      repoUrl: "https://github.com/BVChandrahaas/personal-site",
      message: "Responsive layout & live GitHub activity sidebar",
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
  ];
}

export function formatTimeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
