import { motion, AnimatePresence } from "framer-motion";
import { useColorContext } from "@/context/color";
import ItemCard, { ItemType } from "@/components/ItemCard";
import { mixColors } from "@/utils/colorUtils";
export const desktopCardPositions = [
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

export const mobileCardPositions = [
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

export const RotatingCard = ({
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
