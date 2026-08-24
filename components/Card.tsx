import { ReactNode } from "react";

export default function Card({
  icon,
  title,
  description,
  meta,
  href,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  meta?: string;
  href?: string;
}) {
  const content = (
    <>
      {icon && <div className="text-text-accent text-xl mb-2">{icon}</div>}
      {meta && (
        <p className="text-sm text-text-muted mb-1">{meta}</p>
      )}
      <p className="text-base font-medium text-text-primary mb-1">{title}</p>
      <p className="text-sm text-text-secondary">{description}</p>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="bg-surface-2 border border-border rounded-xl p-4 block hover:border-border-strong"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="bg-surface-2 border border-border rounded-xl p-4">
      {content}
    </div>
  );
}
