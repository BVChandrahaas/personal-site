import { CURRENTLY_READING, ReadingItem } from "@/lib/reading";

type CurrentlyReadingProps = {
  items?: ReadingItem[];
  title?: string;
};

export default function CurrentlyReading({
  items = CURRENTLY_READING,
  title = "Currently Dwelling On",
}: CurrentlyReadingProps) {
  return (
    <div className="bg-surface-2 border border-border rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-base" role="img" aria-label="reading">
            📖
          </span>
          <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        </div>
        <span className="text-[11px] font-mono text-text-muted bg-surface-1 px-2 py-0.5 rounded border border-border">
          This Week
        </span>
      </div>

      {/* List of articles */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="group text-xs flex flex-col gap-1">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary group-hover:text-text-accent transition-colors flex items-start justify-between gap-1.5 leading-snug"
            >
              <span>{item.title}</span>
              <svg
                className="w-3 h-3 text-text-muted group-hover:text-text-accent shrink-0 mt-0.5 transition-colors"
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

            <p className="text-[11px] font-mono text-text-muted">
              by {item.author}
            </p>

            {item.note && (
              <p className="text-text-secondary text-[11px] leading-relaxed italic bg-surface-1/60 p-2 rounded border border-border/50 mt-0.5">
                &ldquo;{item.note}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
