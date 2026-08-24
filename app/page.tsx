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
          <h1 className="font-voice text-3xl text-text-primary mb-2">
            B.V. Chandrahaas
          </h1>
          <p className="text-base text-text-secondary mb-4">
            AI/ML Engineer building production LLM systems, researching
            applied ML.
          </p>
          <div className="flex gap-2 text-sm">
            <a
              href="/resume.pdf"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              Resume
            </a>
            <a
              href="https://github.com/BVChandrahaas"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/bvchandrahaas"
              className="border border-border-strong rounded-md px-3 py-1.5 text-text-secondary hover:text-text-primary"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* About */}
        <section className="mb-14">
          <p className="text-base leading-7 text-text-primary max-w-xl">
            I&apos;m an AI/ML engineer specializing in LLM systems. I build
            production LLM systems, multi-agent workflows, RAG pipelines, and
            backend infrastructure. I hold four publications in applied
            computer vision and ML, and am currently associated with
            early-stage startups while deepening my fundamentals as a
            research enthusiast.
          </p>
        </section>

        {/* Experience */}
        <section id="work" className="mb-14">
          <h2 className="text-lg font-medium text-text-primary mb-3">
            Experience
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="mTouch Labs"
              description="Vendor compliance agents, document pipelines, third-party voice assistant integrations, OCR processing at 30 docs/min."
              meta="AI/ML Engineer · Current"
            />
            <Card
              title="SignalX.ai"
              description="RAG assistant (Xena) serving 10 clients at 250 queries/user monthly, multi-agent risk system (RiskGPT), document pipelines."
              meta="AI Engineer"
            />
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mb-14">
          <h2 className="text-lg font-medium text-text-primary mb-3">
            Publications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card
              title="Monkeypox lesion detection"
              description="Empirical study on classification of monkeypox skin lesions."
              meta="ICISML 2022"
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9hKACrgAAAAJ&citation_for_view=9hKACrgAAAAJ:u5HHmVD_uO8C"
            />
            <Card
              title="Mobile recommendation systems"
              description="Hybrid content & collaborative filtering approach for phone recommendations."
              meta="ICISML 2023"
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9hKACrgAAAAJ&citation_for_view=9hKACrgAAAAJ:u-x6o8ySG0sC"
            />
            <Card
              title="Synapsys"
              description="ML pipeline for automatic video summarization."
              meta="ICISML 2024"
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9hKACrgAAAAJ&citation_for_view=9hKACrgAAAAJ:d1gkVwhDpl0C"
            />
            <Card
              title="Demeter ensemble framework"
              description="Paddy disease detection via deep ensembles and few-shot learning."
              meta="AVSS 2026 (accepted)"
            />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-14">
          <h2 className="text-lg font-medium text-text-primary mb-3">
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
              meta="In progress"
            />
            <Card
              title="Paddy Doctor"
              description="Applied tool for paddy disease detection."
              meta="Completed"
              href="https://github.com/BVChandrahaas/PaddyDoctor"
            />
            <Card
              title="Swessen"
              description="Vector database built from scratch."
              meta="In progress"
              href="https://github.com/BVChandrahaas/Swessen"
            />
          </div>
        </section>

        {/* Blog preview */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-lg font-medium text-text-primary">
              Latest articles
            </h2>
            <Link href="/blog" className="text-sm text-text-accent">
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
                  <p className="text-sm text-text-muted mb-1.5">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {post.readTime}
                  </p>
                  <p className="text-base font-medium text-text-primary mb-1">
                    {post.title}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-surface-2 border border-dashed border-border-strong rounded-xl p-4 text-base text-text-muted">
              Articles coming soon.
            </div>
          )}
        </section>

        {/* Contact */}
        <section id="contact" className="mb-14">
          <h2 className="text-lg font-medium text-text-primary mb-1">
            Contact
          </h2>
          <p className="text-sm text-text-muted mb-3">
            Based in Hyderabad · open to relocate · open to SDE, AI/ML roles.
            Available for freelance consulting and research collaborations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card
              title="Email"
              description="bvchandrahaas@gmail.com"
              href="mailto:bvchandrahaas@gmail.com"
            />
            <Card
              title="Phone"
              description="+91 7993577106"
              href="tel:+917993577106"
            />
            <Card
              title="LinkedIn"
              description="linkedin.com/in/bvchandrahaas"
              href="https://linkedin.com/in/bvchandrahaas"
            />
          </div>
        </section>
      </main>
    </>
  );
}
