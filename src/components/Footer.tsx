import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

import { BlurredCircle } from "./BlurredCircle";
import { BackdropCircle } from "./BackdropCircle";
import { GlitchText } from "./GlitchText";
import { Particle } from "./Particle";
import { useWindowSize } from "../hooks/useWindowSize";

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

export const Footer = () => {
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
        size: random(2, 4),
      })),
    );
  }, [circleCount, particleCount, width]);

  return (
    <section
      id="footer"
      className="relative w-full    overflow-visible h-full    md:min-h-dvh flex flex-col justify-center items-center       
overflow-x-clip
      "
    >
      <div className="absolute top-0 left-0  z-1 w-[200vw] translate-x-[-25%]  h-full   blur-2xl  md:blur-3xl bg-evening-sea-950  "></div>

      <div className="w-full min-h-full flex flex-col justify-center items-center z-10 px-4 flex-5/6">
        <p className="font-sans text-base md:text-lg text-evening-sea-400/70 tracking-[0.2em] uppercase ">
          BE PART OF IT.
        </p>

        <div className="relative w-full flex justify-center items-center my-2">
          <h2 className="text-[15vw] font-black tracking-tighter bg-gradient-to-r  leading-none from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent select-none">
            SHASTHRA'25
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
              <Particle key={p.id} {...p} />
            ))}
          </div>
          <div className="z-1">
            <GlitchText />
          </div>
        </div>
      </div>
      <div className="relative flex items-center flex-col z-4 justify-center  gap-y-4 mb-8  ">
        <div className=" relative flex items-center  h-full mt-20 justify-center gap-0   ">
          <div className="absolute inset-8 -z-2  bg-evening-sea-930"></div>
          {[
            { href: "legacy/facebook", icon: FaFacebookF, label: "Facebook" },
            { href: "legacy/twitter", icon: FaTwitter, label: "Twitter" },
            { href: "legacy/instagram", icon: FaInstagram, label: "Instagram" },
            { href: "legacy/linkedin", icon: FaLinkedinIn, label: "LinkedIn" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-24 md:h-24 w-12 h-12 flex items-center justify-center  hover:bg-evening-sea-920 hover:scale-105 rounded-full bg-evening-sea-930  transition-all duration-300"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
        <p className=" text-sm text-gray-500">
          © {new Date().getFullYear()} SHASTHRA'25. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent,
  );
}
