import { AboutSection } from "@/components/AboutSection";
import { BrandStorySection } from "@/components/BrandStorySection";
import { FooterSection } from "@/components/FooterSection";
import { GallerySection } from "@/components/GallerySection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PillarsSection } from "@/components/PillarsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Navbar variant="transparent" />
      <main className="flex-1">
        <HeroSection />
        <PillarsSection />
        <AboutSection />
        <GallerySection />
        <ProcessSection />
        <BrandStorySection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </>
  );
}
