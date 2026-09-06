import type { Metadata } from "next";
import Link from "next/link";
import { MessageScreen } from "@/components/layout/message-screen";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

const ELSEWHERE = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

export default function NotFound() {
  return (
    <MessageScreen
      code="404 · page not found"
      title="This page went quiet."
      body="The link may be out of date, or the page may have moved. Everything else is still where you left it."
    >
      <Button href="/" size="lg">
        Back to the homepage
      </Button>

      <nav aria-label="Elsewhere on the site" className="flex flex-wrap items-center gap-1">
        {ELSEWHERE.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-ink-muted ease-out-quart hover:text-ink rounded-md px-3 py-2 text-sm transition-[color,transform] duration-200 hover:scale-[1.04] active:scale-[0.96] motion-reduce:hover:scale-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </MessageScreen>
  );
}
