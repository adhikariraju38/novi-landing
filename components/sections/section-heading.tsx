import { Reveal } from "@/components/ui/reveal";

/** Eyebrow and heading on the left, supporting line set against it on the right. */
export function SectionHeading({
  eyebrow,
  heading,
  supporting,
}: {
  eyebrow: string;
  heading: string;
  supporting: string;
}) {
  return (
    <Reveal>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-meta text-ink-faint font-mono tracking-[0.13em] uppercase">
            {eyebrow}
          </p>
          <h2 className="text-display-lg text-ink mt-5 max-w-[18ch] font-serif">{heading}</h2>
        </div>
        <p className="text-lead text-ink-muted max-w-2xl lg:pb-2">{supporting}</p>
      </div>
    </Reveal>
  );
}
