import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-10 flex-1 w-full">
        <Link href="/blog" className="text-base text-text-accent mb-5 inline-block">
          ← Back to blog
        </Link>

        <span className="text-xs px-2 py-0.5 rounded-md bg-bg-accent text-text-accent">
          {post.tag}
        </span>

        <h1 className="font-voice text-3xl text-text-primary mt-3.5 mb-2 leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-text-muted mb-6">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {post.readTime} read
        </p>

        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </>
  );
}
