import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "framer-motion";

interface MarqueeItem {
  color: string;
  name: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  delay?: number;
  right?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 50,
  delay = 0,
  right = false,
}) => {
  const marqueeItems = [...items, ...items, ...items, ...items];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    if (marqueeRef.current) {
      const { scrollWidth } = marqueeRef.current;
      setMarqueeWidth(scrollWidth / 2);
    }
  }, [items]);

  useEffect(() => {
    if (marqueeWidth > 0) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [marqueeWidth, delay]);

  const baseX = useMotionValue(0);
  const directionFactor = useRef(right ? 1 : -1);

  useAnimationFrame((_time, delta) => {
    if (!isAnimating || marqueeWidth === 0) return;
    const moveBy = directionFactor.current * speed * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => {
    const rangeStart = right ? -marqueeWidth : 0;
    const rangeEnd = right ? 0 : -marqueeWidth;
    return `${wrap(rangeStart, rangeEnd, v)}px`;
  });

  return (
    <div
      className="relative w-3/4 h-8   max-w-2xl overflow-hidden my-1  
[mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_70%,transparent_100%)]
      "
    >
      <motion.div
        ref={marqueeRef}
        className="flex h-full flex-row items-center justify-center gap-2 "
        style={{ x }}
      >
        {marqueeItems.map((item, index) => (
          <div key={index} className=" w-full  h-full  rounded-xl aspect-video">
            <div
              className="flex items-center justify-center h-full w-24 px-2 py-0.5 rounded-xl text-sm text-evening-sea-950  "
              style={{
                backgroundColor: item.color,
              }}
            >
              {item.name}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
