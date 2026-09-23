"use client";

import OpeningScreen from "@/components/OpeningScreen";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import DateReveal from "@/components/DateReveal";
import Invitation from "@/components/Invitation";
import Quote from "@/components/Quote";
import Timeline from "@/components/Timeline";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import Venue from "@/components/Venue";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <SmoothScroll />

      <OpeningScreen />

      <div className="website">
        <Hero />
        <Countdown />
        <DateReveal />
        <Invitation />
        <Quote />
        <Timeline />
        
        <Gallery />
        <Venue />

        <Footer />
      </div>
    </main>
  );
}