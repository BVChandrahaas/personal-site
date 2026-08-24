import { ReactNode } from "react";

export default function Card({
  icon,
  title,
  description,
  meta,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <div className="bg-surface-2 border border-border rounded-xl p-4">
      {icon && <div className="text-text-accent text-lg mb-2">{icon}</div>}
      {meta && (
        <p className="text-xs text-text-muted mb-1">{meta}</p>
      )}
      <p className="text-sm font-medium text-text-primary mb-1">{title}</p>
      <p className="text-xs text-text-secondary">{description}</p>
    </div>
  );
}
