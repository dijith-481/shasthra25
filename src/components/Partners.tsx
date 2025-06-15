import { useEffect, useRef, useState } from "react";
import { Marquee } from "./Marquee";
import { AnimatePresence, motion } from "framer-motion";

const partners = [
  {
    type: "Platinum Sponser",
    name: "something",
    logoUrl: "something.jpg",
    color: "#91C9D7",
  },
  {
    type: "Platinum Sponser",
    name: "seal",
    logoUrl: "seal.jpg",
    color: "#C41D21",
  },
  {
    type: "Happiness Sponser",
    name: "triangle",
    logoUrl: "triangle.jpg",
    color: "#D28B7C",
  },
  {
    type: "Media Sponser",
    name: "42",
    logoUrl: "42.jpg",
    color: "#B74C31",
  },
];

const otherPartners = [
  {
    name: "FOO",
    color: "#A0FACE",
  },
  {
    name: "SEA",
    color: "#B0A0A0",
  },
  {
    name: "3",
    color: "#D0FAB2",
  },
  {
    name: "AF",
    color: "#A0A0A0",
  },
  {
    name: "THING",
    color: "#C0AFA0",
  },
  {
    name: "CC",
    color: "#CACACA",
  },
  {
    name: "SOME",
    color: "#ACBACA",
  },
];

export const Partners = () => {
  const platinumPartners = partners.filter(
    (p) => p.type === "Platinum Sponser",
  );
  const otherMainPartners = partners.filter(
    (p) => p.type !== "Platinum Sponser",
  );
  console.log(otherMainPartners);
  const [activePartner, setActivePartner] = useState<{
    type: string;
    name: string;
    logoUrl: string;
    color: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setActivePartner(null);
      }, 8000);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const setPartnerTonull = () => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <section
      id="partners"
      className="relative  h-3/4 md:min-h-dvh flex flex-col justify-center items-center w-full
      
      "
    >
      <AnimatePresence initial={false} mode="sync">
        {activePartner && (
          <motion.div
            key={activePartner.name}
            initial={{ opacity: 0, scale: 1.0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(40px)" }}
            exit={{ opacity: 0, scale: 1.0, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 md:h-[120dvh] w-full "
          >
            <img
              src={activePartner.logoUrl}
              alt="Blurred background"
              className="w-full h-full  object-cover opacity-50    saturate-80 "
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full px-4 py-20 z-10 h-full flex flex-col justify-center items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold pb-6  text-evening-sea-50"
          animate={{
            color:
              activePartner?.type === "Platinum Sponser"
                ? activePartner.color
                : "#FFFFFF",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          Platinum Sponsors
        </motion.h2>
        <div className="grid grid-cols-2  gap-8 max-w-4xl mx-auto pb-6">
          {platinumPartners.map((partner, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setActivePartner(partner);
                setIsOpen(true);
              }}
              onMouseLeave={setPartnerTonull}
              className="cursor-pointer    "
            >
              <div className="transition-all group duration-300 flex justify-center items-center flex-col overflow-hidden backdrop-blur-3xl  w-full h-full rounded-2xl    ">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="w-32 aspect-video md:w-64  object-cover group-hover:scale-105 transition-all duration-300 "
                />
                <h3
                  className="text-xl font-bold mb-2    transition-all duration-300 "
                  style={{
                    color: partner.color,
                  }}
                >
                  {partner.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mx-auto ">
          {otherMainPartners.map((partner, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setActivePartner(partner);
                setIsOpen(true);
              }}
              onMouseLeave={setPartnerTonull}
              className="cursor-pointer flex flex-col justify-center items-center"
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold pb-4 "
                animate={{
                  color:
                    activePartner?.type === partner.type
                      ? activePartner.color
                      : "#FFFFFF",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {partner.type}
              </motion.h2>
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="w-32 aspect-video md:w-48 rounded-2xl object-cover border-0 hover:border-2 border-white/10 hover:scale-105
                transition-all duration-300 "
              />
              <h3 className="text-xl font-bold mb-2 text-white">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
        <div className="w-full justify-center items-center flex pt-8 flex-col ">
          <h2 className="text-2xl md:text-3xl font-bold   text-evening-sea-50">
            Community Partners
          </h2>
          <Marquee items={otherPartners} speed={30} />
          <Marquee items={otherPartners} speed={20} delay={1} right={true} />
          <Marquee items={otherPartners} speed={25} delay={2} />
        </div>
      </div>
    </section>
  );
};
