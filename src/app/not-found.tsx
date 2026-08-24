import Link from "next/link";
import { FooterSection } from "@/components/FooterSection";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 section-padding pt-[4.5rem] sm:pt-20 flex flex-col items-center justify-center min-h-[55vh] sm:min-h-[60vh] text-center px-2">
        <p className="label-uppercase mb-4">404</p>
        <h1 className="heading-section mb-6">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-10">
          This page may have moved. You can head back to the home page from here.
        </p>
        <Link
          href="/"
          className="bg-accent text-accent-foreground px-8 py-3.5 text-sm font-medium inline-flex min-h-11 items-center justify-center w-full max-w-xs sm:w-auto"
        >
          Back Home
        </Link>
      </main>
      <FooterSection />
    </>
  );
}
