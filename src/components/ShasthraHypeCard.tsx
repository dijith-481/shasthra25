"use client";
import { useState, useEffect } from "react";

import { BlurredCircle } from "./BlurredCircle";
import { BackdropCircle } from "./BackdropCircle";
import { GlitchText } from "./GlitchText";
import { Particle } from "./Particle";
import { useWindowSize } from "../hooks/useWindowSize";
import { isMobileDevice } from "../utils/isMobile";
import Link from "next/link";
import { useColorContext } from "@/context/color";
import { mixColors } from "@/utils/colorUtils";

const COLOR_PALETTE = [
  "bg-cyan-500",
  "bg-blue-500",
  "bg-purple-600",
  "bg-fuchsia-500",
];

type CircleType = "blur" | "backdrop";
interface CircleData {
  id: number;
  type: CircleType;
  top: number;
  left: number;
  rotation: number;
  size: number;
  colorClass: string;
}
interface ParticleData {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const ShasthraHypeCard = () => {
  const { color, setColor } = useColorContext();
  const mobile = isMobileDevice();
  const { width } = useWindowSize();

  const circleCount = mobile ? 0 : Math.floor(40 + (width || 0) * 0.04);
  const particleCount = Math.floor(circleCount / 4);

  const [circlesData, setCirclesData] = useState<CircleData[]>([]);
  const [particlesData, setParticlesData] = useState<ParticleData[]>([]);

  useEffect(() => {
    setCirclesData(
      Array.from({ length: circleCount }, (_, i) => ({
        id: i,
        type: Math.random() > 0.1 ? "blur" : "backdrop",
        top: random(0, 100),
        left: random(0, 100),
        rotation: random(0, 360),
        size: random(100, (width || 1000) * 0.15),
        colorClass:
          COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
      })),
    );
    setParticlesData(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: random(0, 100),
        duration: random(5, 15),
        delay: random(0, 10),
        size: random(2, 8),
      })),
    );
  }, [circleCount, particleCount, width]);

  return (
    <section
      id="hypeCard"
      className="relative w-full    overflow-visible h-full    py-20 flex flex-col justify-center items-center overflow-x-clip"
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-black  "></div>

      <div className="w-full min-h-full flex flex-col justify-center items-center z-10 px-4 flex-5/6">
        <p className="font-sans text-base md:text-lg text-evening-sea-400/70 tracking-[0.2em] uppercase ">
          BE PART OF IT.
        </p>

        <div
          className="relative w-full flex justify-center items-center my-2"
          onMouseEnter={() => setColor(mixColors("#00C8EC", "#8A3BCD", 0.5, 1))}
        >
          <h2 className="text-[15vw] font-black tracking-tighter bg-gradient-to-r  leading-none from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent select-none">
            SHASTHRA&apos;25
          </h2>
          <div className="absolute inset-0 z-10">
            {circlesData.map((data) =>
              data.type === "blur" ? (
                <BlurredCircle key={data.id} {...data} />
              ) : (
                <BackdropCircle key={data.id} {...data} />
              ),
            )}
          </div>
        </div>

        <div className="relative w-full h-16  flex flex-col justify-center items-center">
          <div className="absolute inset-0 z-0">
            {particlesData.map((p) => (
              <Particle key={p.id} {...p} color={color} />
            ))}
          </div>
          <div className="z-1">
            <GlitchText />
          </div>
          <div
            className="flex items-center z-1 gap-2 text-2xl justify-center flex-row my-4 
            tracking-tighter bg-gradient-to-r  leading-none from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent select-none"
          >
            <Link
              className="hover:text-white transition-colors ease-linear duration-500 "
              href="/competitions"
            >
              Competitions
            </Link>

            <Link
              className="hover:text-white transition-colors ease-linear duration-500 "
              href="/events"
            >
              Events
            </Link>
            <Link
              className="hover:text-white transition-colors ease-linear duration-500 "
              href="/schedule"
            >
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
