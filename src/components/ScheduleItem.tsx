import { ItemType } from "@/components/ItemCard";
import { AnimatePresence, motion } from "framer-motion";
import { isMobileDevice } from "@/utils/isMobile";
import Link from "next/link";
import { mixColors } from "@/utils/colorUtils";
import { formatTime } from "@/utils/formatTime";

interface ScheduleItemProps {
  item: ItemType;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
}
export const ScheduleItem = ({
  item,
  isActive,
  setActive,
}: ScheduleItemProps) => {
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={item.id}
        layout="position"
        initial={!isMobileDevice() ? { scaleX: 0.0 } : { scaleX: 1.0 }}
        whileHover={{ scale: 1.001 }}
        whileInView={
          isActive && !isMobileDevice() ? { scaleX: 1.01 } : { scaleX: 1.0 }
        }
        exit={!isMobileDevice() ? { scaleX: 0.0 } : { scaleX: 1.0 }}
        transition={{ duration: 0.1, delay: 0.0, ease: "easeInOut" }}
        onMouseOver={() => setActive(item.id)}
        className={`w-7/8 max-w-2xl   my-2  rounded-lg backdrop-blur-2xl border-l-4 hover:border-b-4 hover:border-l-0 transition-all duration-300 `}
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
          <div className="flex justify-between h-full  p-4 items-center">
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
                {formatTime(item.time)}
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
