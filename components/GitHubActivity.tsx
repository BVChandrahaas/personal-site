import { GitHubEvent, formatTimeAgo } from "@/lib/github";

type GitHubActivityProps = {
  events: GitHubEvent[];
  username?: string;
};

export default function GitHubActivity({
  events,
  username = "BVChandrahaas",
}: GitHubActivityProps) {
  return (
    <div className="bg-surface-2 border border-border rounded-xl p-5 shadow-xs transition-all hover:border-border-strong">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <h3 className="text-sm font-medium text-text-primary">
            GitHub Activity
          </h3>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
        >
          @{username}
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      {/* Events List */}
      {events.length > 0 ? (
        <div className="space-y-3.5">
          {events.map((ev) => (
            <div key={ev.id} className="group text-xs flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={ev.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-semibold text-text-accent hover:underline truncate"
                >
                  {ev.repoName}
                </a>
                <span className="text-[11px] text-text-muted shrink-0 font-mono">
                  {formatTimeAgo(ev.createdAt)}
                </span>
              </div>
              <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">
                {ev.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-text-muted py-2">No recent events found.</p>
      )}

      {/* Footer link */}
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
        <span>Building in public</span>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-accent hover:underline font-medium"
        >
          View GitHub →
        </a>
      </div>
    </div>
  );
}
