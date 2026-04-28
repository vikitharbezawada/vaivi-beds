import { ConfiguratorSection } from "@/components/ConfiguratorSection";
import { FooterSection } from "@/components/FooterSection";
import { Navbar } from "@/components/Navbar";

export default async function ConfigurePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const referenceImage = params.ref
    ? decodeURIComponent(params.ref)
    : undefined;

  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 pt-[4.5rem] sm:pt-20">
        <div className="section-padding max-w-full overflow-x-hidden !pt-10 md:!pt-16">
          <ConfiguratorSection referenceImage={referenceImage} />
        </div>
      </main>
      <FooterSection />
    </>
  );
}
