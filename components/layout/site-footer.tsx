import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { EmailSignup } from "@/components/ui/email-signup";
import { NoviMark, socialIcons } from "@/components/icons";
import { footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
            <div>
              <a
                href="#top"
                className="ease-out-quart flex w-fit items-center gap-2 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] motion-reduce:hover:scale-100"
              >
                <NoviMark className="text-accent size-7" />
                <span className="font-serif text-2xl tracking-tight">Novi</span>
              </a>
              <p className="text-ink-muted mt-4 max-w-xs text-sm leading-relaxed">
                {footer.tagline}
              </p>
              <div className="mt-10">
                <EmailSignup />
              </div>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {footer.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-meta text-ink-faint font-mono tracking-[0.13em] uppercase">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-0.5">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-ink-muted ease-out-quart hover:text-ink inline-block py-1.5 text-sm transition-[color,transform] duration-200 hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </Reveal>
      </Container>

      <div className="border-line border-t">
        <Container className="flex flex-col-reverse items-center gap-5 py-6 sm:flex-row sm:gap-6">
          <p className="text-ink-faint text-xs">{footer.copyright}</p>

          <ul className="flex items-center gap-5 sm:ml-auto">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ink-faint ease-out-quart hover:text-ink inline-block py-2 text-xs transition-[color,transform] duration-200 hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-1">
            {footer.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="text-ink-faint ease-out-quart hover:bg-surface-active hover:text-ink grid size-8 place-items-center rounded-md transition-[transform,background-color,color] duration-200 hover:scale-110 active:scale-90 active:duration-75 motion-reduce:hover:scale-100"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
