"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import EventCard, { EventType } from "@/components/EventCard";
import { AnimatePresence, motion } from "framer-motion";
import DropDown from "@/components/Ui/Dropdown";

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [lastActiveColor, setLastActiveColor] = useState<string>("white");
  const [activeSort, setActiveSort] = useState<string>("All");

  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const activeEvent = active ? events.find((e) => e.id === active) : null;

  const [isDropdownOpen, setIsdropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const toggleDropdown = () => setIsdropdownOpen((prev) => !prev);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleFilterDropdown = () => setIsFilterDropdownOpen((prev) => !prev);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: EventType[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const visibleEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      if (activeSort === "All") {
        return true;
      }
      return event.type === activeSort;
    });

    const sorted = [...filtered].sort((a, b) => {
      let valA: any, valB: any;

      switch (sortKey) {
        case "prize":
          valA = parseInt(a.prize, 10) || 0;
          valB = parseInt(b.prize, 10) || 0;
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
  }, [events, activeSort, sortKey, sortDirection]);

  useEffect(() => {
    setActive(null);
  }, [activeSort]);

  useEffect(() => {
    if (activeEvent) {
      setLastActiveColor(activeEvent.color);
    }
  }, [activeEvent]);

  return (
    <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930">
      <section
        id="events"
        className="relative overflow-hidden  max-h-svh min-h-dvh flex flex-col  items-center w-full"
      >
        <AnimatePresence initial={false} mode="sync">
          {activeEvent && (
            <motion.div
              key={activeEvent.id}
              initial={{ filter: "blur(25px)", opacity: 0 }}
              animate={{ filter: "blur(20px)", opacity: 1 }}
              exit={{ filter: "blur(100px)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="fixed top-0 left-0 h-screen  w-screen "
            >
              <img
                src={activeEvent.image}
                alt="Blurred background"
                className="w-screen h-screen  object-cover  opacity-50 saturate-50  "
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className=" fixed top-1/8 left-2  mb-12">
          <AnimatePresence initial={false} mode="sync">
            {activeEvent && (
              <motion.h2
                key={activeEvent.id}
                initial={{ color: "#ffffff", filter: "blur(4px)" }}
                animate={{
                  color: activeEvent.color,
                  filter: "blur(3px)",
                }}
                exit={{ color: "#ffffff", filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "linear" }}
                className="text-4xl md:text-6xl mix-blend-difference font-bold md:py-8 py-4 tracking-tighter cursor-pointer   "
              >
                {activeEvent.name}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-5 mx-auto px-4  flex flex-col items-center w-full">
          <h2
            className="text-4xl md:text-6xl  transition-colors ease-linear duration-500 font-bold md:py-8 py-4 tracking-tighter cursor-pointer"
            style={{ color: lastActiveColor }}
          >
            Shasthra'25 Events
          </h2>
        </div>
        {loading ? (
          <div className="text-center text-evening-sea-300">
            Loading events...
          </div>
        ) : (
          <>
            <div className="h-full max-w-4xl overflow-y-scroll p-4 w-full flex flex-wrap gap-4 pb-20 justify-center">
              {visibleEvents.map((event) => (
                <EventCard key={event.id} event={event} setActive={setActive} />
              ))}
            </div>
          </>
        )}
        <div className="absolute bottom-4 h-12 flex gap-2 flex-row justify-center items-center">
          <div className="hidden md:flex overflow-hidden h-full backdrop-blur-md text-black space-x-[-1rem] rounded-full bg-white/70 items-center justify-center">
            {["All", "General", "Talk", "Conference", "Workshop"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setActiveSort(item)}
                  className={`text-sm ease-in-out duration-500 px-6 py-1.5 h-full min-w-24 hover:text-black transition-all
        ${activeSort === item ? "bg-evening-sea-400/70 rounded-none z-15" : " z-14 hover:bg-evening-sea-300/70 rounded-4xl"}`}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="relative h-full flex w-48 md:hidden">
            <button
              ref={filterDropdownRef}
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
            className="rounded-4xl bg-white/70 h-full w-12 items-center flex justify-center text-black text-xl font-bold"
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
          <button
            className="rounded-4xl bg-white/70 h-full font-black aspect-square items-center flex justify-center text-black"
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
