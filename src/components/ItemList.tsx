import { useState, useEffect, useRef, useMemo } from "react";
import ItemCard, { ItemType } from "@/components/ItemCard";
import { AnimatePresence, motion } from "framer-motion";
import DropDown from "@/components/Ui/Dropdown";
import { mixColors } from "@/utils/colorUtils";
import { isMobileDevice } from "@/utils/isMobile";
import { useColorContext } from "@/context/color";
import Image from "next/image";

interface ItemListProps {
  items: ItemType[];
  loading: boolean;
  filters: string[];
  name: string;
}

export function ItemsList({ items, loading, filters, name }: ItemListProps) {
  const { setColor, color } = useColorContext();

  const [isDropdownOpen, setIsdropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const toggleDropdown = () => setIsdropdownOpen((prev) => !prev);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleFilterDropdown = () => setIsFilterDropdownOpen((prev) => !prev);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeSort, setActiveSort] = useState<string>("All");

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
    const filtered = items.filter((item) => {
      if (activeSort === "All") {
        return true;
      }
      return item.type === activeSort;
    });

    const sorted = [...filtered].sort((a, b) => {
      let valA: number | string;
      let valB: number | string;

      switch (sortKey) {
        case "prize":
          if (a.prize !== undefined) valA = parseInt(a.prize, 10) || 0;
          else valA = 0;

          if (b.prize !== undefined) valB = parseInt(b.prize, 10) || 0;
          else valB = 0;
          break;
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
  }, [items, activeSort, sortKey, sortDirection]);

  useEffect(() => {
    if (!itemRef.current || !isMobile) return;
    const w = window.innerWidth;
    const clientHeight = itemRef.current.clientHeight;
    const scrollHeight = itemRef.current.scrollHeight - w / 2;
    const childHeight = scrollHeight / visibleItems.length;
    const activeElement = Math.floor(
      (scrollPosition + clientHeight / 2 - w / 3) / childHeight,
    );

    if (activeElement < 0) setActive(null);
    else if (activeElement > visibleItems.length - 1)
      setActive(visibleItems[visibleItems.length - 1].id);
    else setActive(visibleItems[activeElement].id);
  }, [scrollPosition, visibleItems, isMobile]);

  useEffect(() => {
    setActive(null);
  }, [activeSort]);

  useEffect(() => {
    if (activeItem) {
      setColor(activeItem.color);
    }
  }, [activeItem, setColor]);

  return (
    <main className="bg-gradient-to-b md:pt-18 h-dvh   pt-10 from-evening-sea-950 to-evening-sea-930">
      <section
        id={name.toLowerCase()}
        className="relative overflow-hidden   h-full flex flex-col  items-center w-full"
      >
        <AnimatePresence initial={false} mode="sync">
          {activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ filter: "blur(25px)", opacity: 0 }}
              animate={{ filter: "blur(20px)", opacity: 1 }}
              exit={{ filter: "blur(100px)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-0 left-0 h-screen  w-screen "
            >
              <Image
                src={activeItem.image}
                width={1920}
                height={1080}
                alt="Blurred background"
                className="w-screen h-screen  object-cover  opacity-50 saturate-50  "
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className=" fixed top-12 left-2  mb-12">
          <h2
            className="text-6xl md:text-8xl blur-[1px]  transition-colors ease-linear duration-500 font-bold  py-4 tracking-tighter cursor-pointer"
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
                className="text-4xl md:text-6xl mix-blend-difference font-bold md:py-8 py-4 tracking-tighter cursor-pointer   "
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
            className="h-full max-w-4xl text-black gap-4    mb-18   overflow-y-scroll p-4 w-full flex flex-wrap   justify-center

                "
            style={{
              paddingTop:
                isMobile && itemRef.current
                  ? itemRef.current.clientHeight / 2 + "px"
                  : "96px",
            }}
          >
            {visibleItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                setActive={setActive}
                name={name}
              />
            ))}
          </div>
        )}
        <div className="absolute bottom-4 h-12 flex gap-2 flex-row justify-center items-center">
          <div className="hidden md:flex overflow-hidden h-full backdrop-blur-md text-black  rounded-full bg-white/70 items-center justify-center">
            {filters.map((item) => (
              <button
                key={item}
                style={{
                  backgroundColor:
                    activeSort === item ? color + "c0" : color + "80",
                }}
                onClick={() => setActiveSort(item)}
                className={`text-sm capitalize ease-in-out duration-500 px-6 py-1.5 h-full min-w-24 hover:text-black transition-all
        ${activeSort === item ? "bg-evening-sea-400/70 rounded-none z-15" : " z-14 hover:opacity-100 opacity-75 "}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative h-full flex w-48 md:hidden">
            <button
              ref={filterDropdownRef}
              style={{
                backgroundColor: mixColors(color, "#ffffff", 0.8, 0.7),
              }}
              onClick={toggleFilterDropdown}
              className="w-full h-full rounded-4xl bg-white/70 backdrop-blur-md px-4 flex items-center justify-between text-black"
            >
              <span className="font-semibold">{activeSort}</span>
              <span className="text-xs">▼</span>
            </button>
            <DropDown
              options={{
                All: "All",
                General: "General",
                Talk: "Talk",
                Conference: "Conference",
                Workshop: "Workshop",
              }}
              color={color}
              selectedOption={activeSort}
              onSelect={(option: string) => {
                setActiveSort(option);
                toggleFilterDropdown();
              }}
              triggerRef={filterDropdownRef}
              onClose={toggleFilterDropdown}
              isOpen={isFilterDropdownOpen}
            />
          </div>

          <button
            className="rounded-4xl bg-white/70 h-full w-12 items-center flex justify-center text-black text-xl font-bold
            transition-colors ease-linear duration-500  
            "
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.7, 0.7),
            }}
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
          <button
            className="rounded-4xl bg-white/70 h-full font-black backdrop-blur-md aspect-square items-center flex justify-center text-black

            transition-colors ease-linear duration-500  
            "
            style={{
              backgroundColor: mixColors(color, "#ffffff", 0.5, 0.7),
            }}
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
            sort
          </button>
          <DropDown
            options={{
              name: "Name",
              prize: "Prize",
              time: "Time",
            }}
            color={color}
            selectedOption={sortKey}
            onSelect={(option: string) => {
              setSortKey(option);
              toggleDropdown();
            }}
            triggerRef={dropdownRef}
            onClose={toggleDropdown}
            isOpen={isDropdownOpen}
          />
        </div>
      </section>
    </main>
  );
}
