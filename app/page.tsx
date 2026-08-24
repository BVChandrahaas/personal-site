import Link from "next/link";
import Nav from "@/components/Nav";
import Card from "@/components/Card";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-10 flex-1 w-full">
        {/* Hero */}
        <section className="mb-14">
          <h1 className="font-voice text-2xl text-text-primary mb-2">
            B.V. Chandrahaas
          </h1>
          <p className="text-sm text-text-secondary mb-4">
            AI/ML Engineer building production LLM systems, researching
            applied ML.
          </p>
          <div className="flex gap-2 text-xs">
            <a
              href="/resume.pdf"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              Resume
            </a>
            <a
              href="https://github.com"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* About */}
        <section className="mb-14">
          <p className="text-sm leading-7 text-text-primary max-w-xl">
            I have about two years of production experience across mTouch
            Labs and SignalX.ai, spanning LLM API integrations, RAG
            pipelines, multi-agent systems, and backend infrastructure. I
            hold four publications in applied computer vision and ML, and am
            currently deepening my fundamentals by building an LLM from
            pretraining through alignment while exploring a PhD path
            targeting Fall 2027.
          </p>
        </section>

        {/* Experience */}
        <section id="work" className="mb-14">
          <h2 className="text-base font-medium text-text-primary mb-3">
            Experience
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="mTouch Labs"
              description="Compliance agents, RFP automation, voice AI lead intelligence."
              meta="AI/ML Engineer · Current"
            />
            <Card
              title="SignalX.ai"
              description="RAG assistants, multi-agent risk systems, document pipelines."
              meta="AI/ML Engineer"
            />
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-14">
          <h2 className="text-base font-medium text-text-primary mb-3">
            Publications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="Demeter ensemble framework"
              description="Paddy disease classification via ensemble learning."
              meta="ICISML"
            />
            <Card
              title="Monkeypox lesion detection"
              description="Computer vision approach to lesion identification."
              meta="AVSS 2026"
            />
            <Card
              title="Recommendation systems study"
              description="Applied ML for personalized recommendations."
              meta="ICISML"
            />
            <Card
              title="YouTube summarization"
              description="ML pipeline for automatic video summarization."
              meta="ICISML"
            />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-14">
          <h2 className="text-base font-medium text-text-primary mb-3">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="nanoGPT from scratch"
              description="13.8M param decoder, TinyStories, custom byte-level BPE tokenizer."
              meta="In progress"
            />
            <Card
              title="QLoRA fine-tuning"
              description="Second project in a four-part ML competency roadmap."
              meta="Planned"
            />
          </div>
        </section>

        {/* Blog preview */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-medium text-text-primary">
              Latest articles
            </h2>
            <Link href="/blog" className="text-xs text-text-accent">
              View all →
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-surface-2 border border-border rounded-xl p-3 block hover:border-border-strong"
                >
                  <p className="text-xs text-text-muted mb-1.5">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {post.readTime}
                  </p>
                  <p className="text-sm font-medium text-text-primary">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-surface-2 border border-dashed border-border-strong rounded-xl p-4 text-sm text-text-muted">
              Articles coming soon.
            </div>
          )}
        </section>

        {/* Contact */}
        <section id="contact" className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-text-muted">
              Based in Hyderabad · open to Bangalore, Pune · open to SDE/MLE
              roles · Fall 2027 PhD applicant
            </p>
            <a
              href="mailto:chandrahaas@email.com"
              className="text-xs text-text-accent"
            >
              chandrahaas@email.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
