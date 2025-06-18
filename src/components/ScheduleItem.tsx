import { ItemType } from "@/components/ItemCard";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { mixColors } from "@/utils/colorUtils";

interface ScheduleItemProps {
  item: ItemType;
  time: string;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
}
export const ScheduleItem = ({ item, time, setActive }: ScheduleItemProps) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={item.id}
        layout="position"
        layoutScroll
        initial={{ scaleX: 0.0 }}
        whileInView={{ scaleX: 1.0 }}
        exit={{ scaleX: 0.0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseOver={() => setActive(item.id)}
        whileHover={{ borderLeftWidth: "8px" }}
        className={`w-7/8 max-w-2xl my-2 rounded-lg backdrop-blur-2xl border-l-4 transition-all duration-300`}
        style={{
          borderColor: item.color,
          backgroundColor: mixColors(item.color, "#ffffff", 0.7, 0.8),
        }}
      >
        <Link
          className="h-full"
          href={
            item.type === "Competition"
              ? `/competitions/${item.id}`
              : `/events/${item.id}`
          }
        >
          <div className="flex justify-between h-full p-4 items-center">
            <div className="flex-1 pr-4">
              <h3 className="text-xl font-bold text-black">{item.name}</h3>
              <p
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: mixColors(item.color, "#000000", 0.4, 1) }}
              >
                {item.type}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                className="text-lg font-semibold text-black"
                style={{ color: mixColors(item.color, "#000000", 0.7, 1) }}
              >
                {time}
              </p>
              {item.prize && (
                <p className="text-sm text-yellow-800">Prize: {item.prize}</p>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
