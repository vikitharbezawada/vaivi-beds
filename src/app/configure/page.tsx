import {
  CustomerJourneyPrototype,
} from "@/components/CustomerJourneyPrototype";
import { FooterSection } from "@/components/FooterSection";
import { Navbar } from "@/components/Navbar";

export default function ConfigurePage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 overflow-x-hidden pt-[4.5rem] sm:pt-20">
        <CustomerJourneyPrototype variant="A" />
      </main>
      <FooterSection />
    </>
  );
}
