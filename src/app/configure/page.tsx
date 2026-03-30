import { ConfiguratorSection } from "@/components/ConfiguratorSection";
import { FooterSection } from "@/components/FooterSection";
import { Navbar } from "@/components/Navbar";

export default function ConfigurePage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 pt-[4.5rem] sm:pt-20">
        <div className="section-padding max-w-full overflow-x-hidden !pt-10 md:!pt-16">
          <ConfiguratorSection />
        </div>
      </main>
      <FooterSection />
    </>
  );
}
