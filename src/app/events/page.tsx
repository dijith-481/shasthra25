"use client";

import { useState, useEffect } from "react";
import EventCard, { EventType } from "@/components/EventCard";
import { AnimatePresence, motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [lastActiveColor, setLastActiveColor] = useState<string>("white");
  const [activeSort, setActiveSort] = useState<string>("All");
  const [visibleEvents, setVisibleEvents] = useState<EventType[]>([]);

  const activeEvent = active ? events.find((e) => e.id === active) : null;

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

  useEffect(() => {
    setVisibleEvents(
      events.filter((event) => {
        if (activeSort === "All") {
          return true;
        }
        return event.type === activeSort;
      }),
    );

    setActive(null);
  }, [activeSort, events]);

  useEffect(() => {
    if (activeEvent) {
      setLastActiveColor(activeEvent.color);
    }
  }, [activeEvent]);

  return (
    <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930">
      <section
        id="events"
        className="relative overflow-hidden h-3/4 max-h-svh md:min-h-dvh flex flex-col  items-center w-full"
      >
        <AnimatePresence initial={false} mode="sync">
          {/* FIX 4: Use activeEvent for all details to prevent mismatches. */}
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
                initial={{ color: "white", filter: "blur(4px)" }}
                animate={{
                  color: activeEvent.color,
                  filter: "blur(3px)",
                }}
                exit={{ color: "white", filter: "blur(4px)" }}
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
            <div className="h-full max-w-4xl overflow-y-scroll p-4 w-full flex flex-wrap gap-4  justify-around">
              {visibleEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  setActive={setActive}
                  index={0}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute  overflow-hidden  bottom-4 backdrop-blur-md text-black space-x-[-1rem]  rounded-full bg-white/70 flex flex-row items-center justify-center h-12 ">
          {["All", "General", "Talk", "Conference", "Workshop"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSort(item)}
              className={`text-sm   ease-in-out duration-500  px-6 py-1.5  h-full min-w-24 hover:text-black transition-all
${activeSort === item ? "bg-emerald-300 rounded-none z-15" : " z-14 hover:bg-evening-sea-300/80 rounded-4xl"}
`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
