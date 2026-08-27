import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title = "B.V. Chandrahaas | AI/ML Engineer";
const description =
  "AI/ML Engineer building production LLM systems, multi-agent workflows, and RAG pipelines, researching applied ML.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chandrahaas.dev"),
  title,
  description,
  openGraph: {
    type: "website",
    url: "https://chandrahaas.dev",
    siteName: "B.V. Chandrahaas",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
