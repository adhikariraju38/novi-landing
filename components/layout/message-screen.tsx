import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NoviMark } from "@/components/icons";
import { footer } from "@/lib/content";

/**
 * Shared shell for 404 and error screens. Deliberately not the full site header:
 * on a dead end the only useful controls are the way back and the theme.
 */
export function MessageScreen({
  code,
  title,
  body,
  children,
}: {
  code: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-line border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="ease-out-quart flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] motion-reduce:hover:scale-100"
          >
            <NoviMark className="text-accent size-7" />
            <span className="font-serif text-2xl tracking-tight">Novi</span>
          </Link>
          <ThemeToggle />
        </Container>
      </header>

      <main className="flex flex-1 items-center py-20">
        <Container>
          <p className="text-meta text-ink-faint font-mono tracking-[0.13em] uppercase">{code}</p>
          <h1 className="text-display-lg text-ink mt-5 max-w-[16ch] font-serif">{title}</h1>
          <p className="text-lead text-ink-muted mt-5 max-w-xl">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>
        </Container>
      </main>

      <footer className="border-line border-t">
        <Container className="flex h-16 items-center">
          <p className="text-ink-faint text-xs">{footer.copyright}</p>
        </Container>
      </footer>
    </div>
  );
}

export { Button, Container };
