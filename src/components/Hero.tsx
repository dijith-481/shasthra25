"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechParticles } from "./TechParticles";
import ItemCard, { ItemType } from "@/components/ItemCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useColorContext } from "@/context/color";
import { mixColors } from "@/utils/colorUtils";

const desktopCardPositions = [
  {
    top: "5%",
    left: "10%",
    rotateX: 10,
    rotateY: -15,
    scale: 0.58,
    rotateZ: 0,
    translateX: "0%",
  },
  {
    top: "10%",
    left: "80%",
    rotateX: -5,
    rotateY: -30,
    scale: 0.65,
    rotateZ: -12,
    translateX: "-50%",
  },
  {
    top: "50%",
    left: "0%",
    rotateX: -15,
    rotateY: 10,
    scale: 0.52,
    rotateZ: 20,
    translateX: "0%",
  },
  {
    top: "55%",
    left: "50%",
    rotateX: 20,
    rotateY: -10,
    scale: 0.45,
    rotateZ: -10,
    translateX: "-50%",
  },
];

const mobileCardPositions = [
  {
    top: "10%",
    left: "12%",
    rotateX: 30,
    rotateY: -15,
    scale: 0.5,
    rotateZ: -5,
    translateX: "-50%",
  },
  {
    top: "45%",
    left: "10%",
    rotateX: -10,
    rotateY: -30,
    scale: 0.33,
    rotateZ: -4,
    translateX: "0%",
  },
  {
    top: "15%",
    left: "80%",
    rotateX: -20,
    rotateY: 35,
    scale: 0.35,
    rotateZ: 20,
    translateX: "-50%",
  },
  {
    top: "42%",
    left: "55%",
    rotateX: -5,
    rotateY: 5,
    scale: 0.43,
    rotateZ: 10,
    translateX: "0%",
  },
];

const RotatingCard = ({
  item,
  position,
}: {
  item: ItemType;
  position: (typeof desktopCardPositions)[0];
}) => {
  const { setColor } = useColorContext();
  return (
    <motion.div
      className="absolute inline-block"
      onMouseEnter={() => setColor(mixColors(item.color, "#ffffff", 0.7, 1))}
      style={{ ...position, transformStyle: "preserve-3d" }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={item.id}
          className="pointer-events-none select-none"
          initial={{ rotateY: 90, opacity: 0, scale: 0.95 }}
          animate={{
            rotateY: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          exit={{
            rotateY: -90,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",

            transform: `translateX(${position.translateX ?? "0%"}) rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg) rotateZ(${position.rotateZ ?? 0}deg) scale(${position.scale})`,
          }}
        >
          <ItemCard
            name="Showcase"
            item={item}
            setActive={() => {}}
            buttonText="SHASTHRA'25"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export const Hero = () => {
  const isMobile = useIsMobile();
  const cardPositions = isMobile ? mobileCardPositions : desktopCardPositions;
  const numCards = cardPositions.length;
  const { color } = useColorContext();

  const [allItems, setAllItems] = useState<ItemType[]>([]);
  const [displayedItems, setDisplayedItems] = useState<ItemType[]>([]);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const [eventsRes, competitionsRes] = await Promise.all([
          fetch("/data/events.json"),
          fetch("/data/competitions.json"),
        ]);
        const eventsData = await eventsRes.json();
        const competitionsData = await competitionsRes.json();
        setAllItems([...eventsData, ...competitionsData]);
      } catch (error) {
        console.error("Failed to fetch hero items:", error);
      }
    };
    fetchAllItems();
  }, []);

  useEffect(() => {
    if (allItems.length < numCards) return;
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    const initialItems = [...allItems]
      .sort(() => 0.5 - Math.random())
      .slice(0, numCards);
    setDisplayedItems(initialItems);
    const updateCard = (index: number) => {
      setDisplayedItems((prev) => {
        const getNewItem = () => {
          const newItem = allItems[Math.floor(Math.random() * allItems.length)];
          if (prev.some((di) => di.id === newItem.id)) return getNewItem();
          return newItem;
        };
        const newItems = [...prev];
        newItems[index] = getNewItem();
        return newItems;
      });
      const randomDelay = 4000 + Math.random() * 4000;
      timeoutIds.current[index] = setTimeout(
        () => updateCard(index),
        randomDelay,
      );
    };
    for (let i = 0; i < numCards; i++) {
      const initialRandomDelay = 1000 + Math.random() * 4000;
      timeoutIds.current[i] = setTimeout(
        () => updateCard(i),
        initialRandomDelay,
      );
    }
    return () => timeoutIds.current.forEach(clearTimeout);
  }, [allItems, numCards]);

  const title = "SHASTHRA'25";

  const titleContainerVariants = {
    animate: { transition: { delayChildren: 0.4, staggerChildren: 0.1 } },
  };

  return (
    <section className="relative  min-h-dvh h-[110dvh] w-full flex items-center justify-center bg-black overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full  z-10"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        <Suspense fallback={null}>
          <TechParticles />
        </Suspense>
      </div>
      <div className="absolute inset-0 z-20">
        {displayedItems.map((item, index) => {
          const position = cardPositions[index];
          if (!position) return null;
          return <RotatingCard key={index} item={item} position={position} />;
        })}
      </div>
      <div className="relative z-30 text-center mix-blend-hard-light p-4">
        <motion.h1
          variants={titleContainerVariants}
          initial="initial"
          animate="animate"
          className="text-[15vw] ease-in-out duration-500 transition-all md:text-[12vw] font-extrabold tracking-tighter flex overflow-hidden"
          style={{ color: color }}
          aria-label={title}
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  ease: "easeOut",
                  duration: 1,
                },
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="mt-2 text-[4vw] md:text-[2vw] tracking-widest">
            MARCH 20, 21, 22
          </p>
          <p className="mt-2 text-[3vw] md:text-[1.5vw] tracking-wider font-light">
            A Fusion of Technology, Innovation, and Creativity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
