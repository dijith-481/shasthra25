"use client";
import { Hero } from "@/components/Hero";
import { PastFests } from "@/components/PastFests";
import { ImageCarousel } from "@/components/ImageCarousel";
import { Partners } from "@/components/Partners"; // Assuming you have a Partners component
import { ShasthraHypeCard } from "@/components/ShasthraHypeCard"; // Assuming you have a Footer component
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { Ambassador } from "@/components/Ambassador";
import { Seperator } from "@/components/Seperator";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <About />
      <PastFests />
      <Seperator />
      <Partners />
      <Ambassador />
      <ImageCarousel />
      <Seperator />
      <ShasthraHypeCard />
      <Footer />
    </main>
  );
}
