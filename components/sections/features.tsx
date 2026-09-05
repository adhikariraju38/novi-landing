import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { featureVisuals } from "./feature-visuals";
import { BoardIcon, ImportIcon, ThreadIcon, TimelineIcon } from "@/components/icons";
import { features } from "@/lib/content";

const icons = {
  board: BoardIcon,
  thread: ThreadIcon,
  timeline: TimelineIcon,
  import: ImportIcon,
};

export function Features() {
  return (
    <section id="features" className="border-line scroll-mt-20 border-t py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={features.eyebrow}
          heading={features.heading}
          supporting={features.supporting}
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {features.cards.map((card, index) => {
            const Icon = icons[card.icon];
            const Visual = featureVisuals[card.id];

            return (
              <Reveal as="li" key={card.id} delay={index * 0.06}>
                <article className="group border-line bg-surface ease-out-quart hover:border-line-strong hover:shadow-lift h-full rounded-xl border p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <span className="bg-accent-soft text-accent ease-out-quart grid size-10 place-items-center rounded-lg transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                        <Icon className="size-5" />
                      </span>
                      <h3 className="text-ink mt-5 text-[1.0625rem] font-medium">{card.title}</h3>
                      <p className="text-ink-muted mt-2 text-[0.9375rem] leading-relaxed">
                        {card.body}
                      </p>
                    </div>

                    <div className="w-full shrink-0 sm:w-[44%]">
                      <Visual />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
