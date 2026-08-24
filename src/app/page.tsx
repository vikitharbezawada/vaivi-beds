import { AboutSection } from "@/components/AboutSection";
import { FooterSection } from "@/components/FooterSection";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Navbar variant="transparent" />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </>
  );
}
