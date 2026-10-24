import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bvchandrahaas.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard search engines (Googlebot, Bingbot, DuckDuckBot, Applebot)
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Explicit allow for AI Search, Copilot, Grounding & Citation bots
        userAgent: [
          "Bingbot",          // Powers Microsoft Copilot web search
          "OAI-SearchBot",    // OpenAI / ChatGPT Search
          "ChatGPT-User",     // ChatGPT real-time link fetching
          "PerplexityBot",    // Perplexity AI Search
          "Claude-SearchBot", // Anthropic / Claude web search
          "Claude-User",      // Claude real-time link fetching
          "Google-Extended",  // Gemini grounding & AI visibility
          "Applebot-Extended" // Apple Intelligence search
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
