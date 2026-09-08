import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { HairEditorial } from "@/components/sections/HairEditorial";
import { Treatments } from "@/components/sections/Treatments";
import { Products } from "@/components/sections/Products";
import { Product3D } from "@/components/sections/Product3D";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Page() {
  return (
    <>
      {/* KASSEN COIFFURE → descoberta → experiência → serviços → transformação → produtos → desejo → agendamento */}
      <Hero />
      <Experience />
      <Services />
      <HairEditorial />
      <Treatments />
      <Products />
      <Product3D />
      <Gallery />
      <BeforeAfter />
      <Testimonials />
      <InstagramFeed />
      <FinalCta />
    </>
  );
}
