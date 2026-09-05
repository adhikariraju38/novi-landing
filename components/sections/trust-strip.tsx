import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { trust } from "@/lib/content";

export function TrustStrip() {
  return (
    <section aria-label="Customers" className="border-line border-t py-12">
      <Container>
        <Reveal>
          <p className="text-meta text-ink-faint text-center font-mono tracking-[0.13em] uppercase">
            {trust.label}
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
            {trust.companies.map((company) => (
              <li
                key={company}
                className="text-ink-faint hover:text-ink-muted font-serif text-xl transition-colors duration-300 sm:text-2xl"
              >
                {company}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
