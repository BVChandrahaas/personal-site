import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B.V. Chandrahaas — AI/ML Engineer",
  description:
    "AI/ML Engineer building production LLM systems, researching applied ML.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
