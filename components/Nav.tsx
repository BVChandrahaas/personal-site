import Link from "next/link";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#publications", label: "Publications" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-3xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium text-text-primary">
          chandrahaas.dev
        </Link>
        <nav className="flex gap-5 text-sm text-text-secondary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
