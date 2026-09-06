import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { CtaBand } from "@/components/sections/cta-band";
import { CommandPalette } from "@/components/ui/command-palette";
import { DemoModal } from "@/components/ui/demo-modal";
import { SignupModal } from "@/components/ui/signup-modal";
import { ContactModal } from "@/components/ui/contact-modal";
import { OverlayProvider } from "@/components/overlay-provider";

export default function Home() {
  return (
    <OverlayProvider>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaBand />
      </main>
      <SiteFooter />
      <CommandPalette />
      <DemoModal />
      <SignupModal />
      <ContactModal />
    </OverlayProvider>
  );
}
