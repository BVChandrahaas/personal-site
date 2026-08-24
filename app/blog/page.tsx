import Link from "next/link";
import Nav from "@/components/Nav";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-10 flex-1 w-full">
        <h1 className="text-2xl font-medium text-text-primary mb-1">
          Writing
        </h1>
        <p className="text-base text-text-secondary mb-6">
          Notes on ML systems, research, and building in public.
        </p>

        <div className="flex flex-col gap-2.5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface-2 border border-border rounded-xl px-4 py-3.5 block hover:border-border-strong"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs px-2 py-0.5 rounded-md bg-bg-accent text-text-accent">
                  {post.tag}
                </span>
                <span className="text-sm text-text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {post.readTime}
                </span>
              </div>
              <p className="text-base font-medium text-text-primary mb-0.5">
                {post.title}
              </p>
              <p className="text-sm text-text-secondary">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
