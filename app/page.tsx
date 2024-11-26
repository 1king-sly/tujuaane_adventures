"use client";
import Hero from "@/components/Homepage/Hero";
import Services from "@/components/Homepage/Services";
import Testimonials from "@/components/Homepage/Testimonials";
import Partners from "@/components/Homepage/Partners";
import Events from "@/components/Homepage/Events";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <Services />

      <Events />

      <Testimonials />
      <Partners />
    </div>
  );
}
