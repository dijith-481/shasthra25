import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { ScheduleItem } from "@/components/ScheduleItem";
import { AnimatePresence, motion } from "framer-motion";
import DropDown from "@/components/Ui/Dropdown";
import { mixColors } from "@/utils/colorUtils";
import { isMobileDevice } from "@/utils/isMobile";
import { useColorContext } from "@/context/color";
import { ItemType } from "@/components/ItemCard";
import { formatDate, formatTime } from "@/utils/formatTime";

interface ScheduleListProps {
  items: ItemType[];
  loading: boolean;
  dayFilters: string[];
  typeFilters: string[];
  name: string;
}

export const ScheduleList = ({
  items,
  loading,
  dayFilters,
  typeFilters,
  name,
}: ScheduleListProps) => {
  const { setColor, color } = useColorContext();

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleSortDropdown = () => setIsSortDropdownOpen((prev) => !prev);

  const [isDayFilterDropdownOpen, setIsDayFilterDropdownOpen] = useState(false);
  const dayFilterDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleDayFilterDropdown = () =>
    setIsDayFilterDropdownOpen((prev) => !prev);

  const [isTypeFilterDropdownOpen, setIsTypeFilterDropdownOpen] =
    useState(false);
  const typeFilterDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleTypeFilterDropdown = () =>
    setIsTypeFilterDropdownOpen((prev) => !prev);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [sortKey, setSortKey] = useState<string>("time");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [activeDayFilter, setActiveDayFilter] = useState<string>("All Days");
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>("All");

  const [active, setActive] = useState<string | null>(null);
  const activeItem = active ? items.find((e) => e.id === active) : null;

  const handleScroll = () => {
    if (!itemRef.current) return;
    setScrollPosition(itemRef.current.scrollTop);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (!itemRef.current) return;
    const current = itemRef.current;
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, [itemRef, loading]);

  const visibleItems = useMemo(() => {
    const dayFiltered = items.filter((item) => {
      if (activeDayFilter === "All Days") return true;
      const itemDate = new Date(item.time).toISOString().split("T")[0];
      if (activeDayFilter === "Day 1" && itemDate === "2025-03-20") return true;
      if (activeDayFilter === "Day 2" && itemDate === "2025-03-21") return true;
      if (activeDayFilter === "Day 3" && itemDate === "2025-03-22") return true;
      return false;
    });

    const typeFiltered = dayFiltered.filter((item) => {
      if (activeTypeFilter === "All") return true;
      return item.type.toLowerCase() === activeTypeFilter.toLowerCase();
    });

    const sorted = [...typeFiltered].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;
      switch (sortKey) {
        case "time":
          valA = new Date(a.time).getTime() || 0;
          valB = new Date(b.time).getTime() || 0;
          break;
        case "name":
        default:
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
      }
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [items, activeDayFilter, activeTypeFilter, sortKey, sortDirection]);

  useEffect(() => {
    if (!itemRef.current || !isMobile) return;
    const clientHeight = itemRef.current.clientHeight;
    const scrollHeight = itemRef.current.scrollHeight;

    if (visibleItems.length === 0) {
      setActive(null);
      return;
    }
    const averageChildHeight = scrollHeight / visibleItems.length;
    const activeElement = Math.floor(
      (scrollPosition + clientHeight / 8) / averageChildHeight,
    );

    if (activeElement < 0) setActive(null);
    else if (activeElement > visibleItems.length - 1)
      setActive(visibleItems[visibleItems.length - 1]?.id);
    else setActive(visibleItems[activeElement]?.id);
  }, [scrollPosition, visibleItems, isMobile]);

  useEffect(() => {
    setActive(null);
    if (itemRef.current) itemRef.current.scrollTop = 0;
  }, [activeDayFilter, activeTypeFilter]);

  useEffect(() => {
    if (activeItem) {
      setColor(activeItem.color);
    }
  }, [activeItem, setColor]);

  return (
    <main className="bg-black md:pt-18 h-dvh pt-10  ">
      <section
        id={name.toLowerCase()}
        className="relative overflow-hidden h-full flex flex-col items-center w-full"
      >
        <AnimatePresence initial={false} mode="sync">
          {activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ filter: "blur(25px)", opacity: 0 }}
              animate={{ filter: "blur(15px)", opacity: 0.7 }}
              exit={{ filter: "blur(40px)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-0 left-0 h-screen w-screen "
            >
              <Image
                src={activeItem.image}
                width={1920}
                height={1080}
                alt="Blurred background"
                className="w-screen h-screen object-cover opacity-50 "
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed top-12 left-2 mb-12">
          <h2
            className="text-6xl md:text-8xl blur-[1px] transition-colors ease-linear duration-500 font-bold py-4 tracking-tighter cursor-pointer"
            style={{ color: color }}
          >
            {name}
          </h2>
          <AnimatePresence initial={false} mode="sync">
            {activeItem && (
              <motion.h2
                key={activeItem.id}
                initial={{ color: "#ffffff", filter: "blur(4px)" }}
                animate={{
                  color: activeItem.color,
                  filter: "blur(3px)",
                }}
                exit={{ color: "#ffffff", filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "linear" }}
                className="text-4xl md:text-6xl mix-blend-difference font-bold md:py-8 py-4 tracking-tighter cursor-pointer opacity-50"
              >
                {activeItem.name}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="text-center text-evening-sea-300">
            Loading {name.toLowerCase()}...
          </div>
        ) : (
          <div
            ref={itemRef}
            className="h-full w-full text-white gap-0 mb-18 overflow-y-scroll z-5 p-4 flex flex-col items-center"
            style={{
              paddingTop:
                isMobile && itemRef.current
                  ? itemRef.current.clientHeight / 2 + "px"
                  : "96px",
            }}
          >
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <ScheduleItem
                  time={
                    activeDayFilter !== "All Days"
                      ? formatTime(item.time)
                      : formatDate(item.time)
                  }
                  key={item.id}
                  item={item}
                  setActive={setActive}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-evening-sea-300 mt-24"
              >
                No items match the current filters.
              </motion.div>
            )}
          </div>
        )}
        <div className="absolute bottom-4 h-12 flex gap-2 flex-row justify-center items-center flex-wrap">
          <div className="hidden md:flex overflow-hidden h-full backdrop-blur-md text-black rounded-full bg-white/70 items-center justify-center">
            {dayFilters.map((item) => (
              <button
                key={item}
                style={{
                  backgroundColor:
                    activeDayFilter === item ? color + "c0" : color + "80",
                }}
                onClick={() => setActiveDayFilter(item)}
                className={`text-sm capitalize ease-in-out duration-500 px-6 py-1.5 h-full min-w-24 hover:text-black transition-all ${
                  activeDayFilter === item
                    ? "bg-evening-sea-400/70 rounded-none z-15"
                    : " z-14 hover:opacity-100 opacity-75 "
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative h-full flex  md:hidden">
            <button
              ref={dayFilterDropdownRef}
              style={{
                backgroundColor: mixColors(color, "#ffffff", 0.8, 0.7),
              }}
              onClick={toggleDayFilterDropdown}
              className="w-full h-full rounded-4xl bg-white/70 backdrop-blur-md px-4 flex items-center justify-between text-black"
            >
              <span className="font-semibold">{activeDayFilter}</span>
              <span className="text-xs">▼</span>
            </button>
            <DropDown
              options={Object.fromEntries(dayFilters.map((f) => [f, f]))}
              color={color}
              selectedOption={activeDayFilter}
              onSelect={(option: string) => {
                setActiveDayFilter(option);
                toggleDayFilterDropdown();
              }}
              triggerRef={dayFilterDropdownRef}
              onClose={toggleDayFilterDropdown}
              isOpen={isDayFilterDropdownOpen}
            />
          </div>

          <div className="relative h-full flex  md:w-48">
            <button
              ref={typeFilterDropdownRef}
              style={{
                backgroundColor: mixColors(color, "#ffffff", 0.7, 0.7),
              }}
              onClick={toggleTypeFilterDropdown}
              className="w-full h-full rounded-4xl bg-white/70 backdrop-blur-md px-4 flex items-center justify-between text-black"
            >
              <span className="font-semibold capitalize">
                {activeTypeFilter}
              </span>
              <span className="text-xs">▼</span>
            </button>
            <DropDown
              options={Object.fromEntries(typeFilters.map((f) => [f, f]))}
              color={color}
              selectedOption={activeTypeFilter}
              onSelect={(option: string) => {
                setActiveTypeFilter(option);
                toggleTypeFilterDropdown();
              }}
              triggerRef={typeFilterDropdownRef}
              onClose={toggleTypeFilterDropdown}
              isOpen={isTypeFilterDropdownOpen}
            />
          </div>

          <button
            className="rounded-4xl bg-white/70 h-full w-12 items-center flex justify-center text-black text-xl font-bold transition-colors ease-linear duration-500"
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.6, 0.7),
            }}
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            title={`Sort ${
              sortDirection === "asc" ? "Descending" : "Ascending"
            }`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
          <button
            className="rounded-4xl bg-white/70 h-full font-black backdrop-blur-md aspect-square items-center flex justify-center text-black transition-colors ease-linear duration-500"
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.5, 0.7),
            }}
            ref={sortDropdownRef}
            onClick={toggleSortDropdown}
          >
            sort
          </button>
          <DropDown
            options={{
              time: "Time",
              name: "Name",
            }}
            color={color}
            selectedOption={sortKey}
            onSelect={(option: string) => {
              setSortKey(option);
              toggleSortDropdown();
            }}
            triggerRef={sortDropdownRef}
            onClose={toggleSortDropdown}
            isOpen={isSortDropdownOpen}
          />
        </div>
      </section>
    </main>
  );
};
