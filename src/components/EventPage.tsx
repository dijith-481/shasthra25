"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EventCard, { EventType } from "@/components/EventCard";
import DropDown from "@/components/Ui/Dropdown";
import {
  CalendarIcon,
  FeeIcon,
  ContactIcon,
  VenueIcon,
} from "@/components/Ui/Icons";

interface ContactType {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface EventDetailsType {
  about: string;
  rules: string;
  format: string;
  contact: ContactType;
  isClosed: boolean;
  fee: number;
  venue: string;
}

const hexToRgb = (hexColor: string | undefined) => {
  if (!hexColor) return { r: 0, g: 0, b: 0 };
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return { r, g, b };
};

const mixColors = (
  hexColor1: string | undefined,
  hexColor2: string,
  amount: number,
  alpha?: number,
) => {
  const { r: r1, g: g1, b: b1 } = hexToRgb(hexColor1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(hexColor2);
  const r = Math.floor(r1 * (1 - amount) + r2 * amount);
  const g = Math.floor(g1 * (1 - amount) + g2 * amount);
  const b = Math.floor(b1 * (1 - amount) + b2 * amount);
  return `rgba(${r}, ${g}, ${b}, ${alpha || 1})`;
};

const getContrastColor = (hexColor: string) => {
  const { r, g, b } = hexToRgb(hexColor);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000000" : "#FFFFFF";
};

export default function EventPage({ id }: { id: string }) {
  const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(
    null,
  );
  const [eventBase, setEventBase] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("about");

  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const navDropdownRef = useRef<HTMLButtonElement>(null);
  const toggleNavDropdown = () => setIsNavDropdownOpen((prev) => !prev);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailsResponse, baseResponse] = await Promise.all([
          fetch(`/data/events/${id}.json`),
          fetch(`/data/events.json`),
        ]);
        if (!detailsResponse.ok)
          throw new Error(`Event details for '${id}' not found.`);
        if (!baseResponse.ok)
          throw new Error("Could not load base events data.");
        const detailsData: EventDetailsType = await detailsResponse.json();
        const baseData: EventType[] = await baseResponse.json();
        const baseEventInfo = baseData.find((event) => event.id == id);
        if (!baseEventInfo)
          throw new Error(`Base event info for '${id}' not found.`);
        setEventDetails(detailsData);
        setEventBase(baseEventInfo);
      } catch (err: any) {
        console.error("Failed to fetch event data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEventData();
  }, [id]);

  const renderContent = () => {
    if (!eventDetails) return null;

    switch (activeTab) {
      case "about":
        return <p>{eventDetails.about}</p>;
      case "rules":
        return eventDetails.rules
          .split("\n")
          .map((line, index) => <p key={index}>{line}</p>);
      case "format":
        return <p>{eventDetails.format}</p>;
      case "contact":
        return (
          <div
            className="  rounded-lg p-6 "
            style={{
              backgroundColor: mixColors(eventBase?.color, "#ffffff", 0.5, 0.7),
            }}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-12 h-12  rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: eventBase?.color + "80" }}
              >
                <ContactIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {eventDetails.contact.name}
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <strong className="w-20 text-gray-600">Email:</strong>
                <a
                  href={`mailto:${eventDetails.contact.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {eventDetails.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <strong className="w-20 text-gray-600">Phone:</strong>
                <a
                  href={`tel:${eventDetails.contact.phone}`}
                  className="text-blue-500 hover:underline"
                >
                  {eventDetails.contact.phone}
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <p>{eventDetails.about}</p>;
    }
  };

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930 min-h-dvh flex items-center justify-center">
        <div className="text-center text-evening-sea-300">Loading event...</div>
      </main>
    );
  }
  if (error || !eventBase) {
    return (
      <main className="bg-gradient-to-b from-evening-sea-950 to-evening-sea-930 min-h-dvh flex items-center justify-center">
        <div className="text-center text-red-400">
          <h2>Error</h2>
          <p>{error || "Could not load the event."}</p>
          <Link
            href="/events"
            className="mt-4 inline-block px-4 py-2 bg-evening-sea-700 rounded-lg"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const textColor = getContrastColor(eventBase.color);

  return (
    <main>
      <section className="relative overflow-hidden  max-h-svh min-h-dvh flex flex-col  items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 h-screen w-screen"
        >
          <img
            src={eventBase.image}
            alt="Blurred background"
            className="w-screen h-screen object-cover z-0 blur-md opacity-70 "
          />
        </motion.div>

        <div
          className="h-full max-w-7/8 md:max-w-4xl z-2 overflow-y-scroll p-4 w-full flex flex-wrap gap-4 pb-20 justify-center items-center  rounded-3xl bg-white/50"
          style={{
            backgroundColor: mixColors(eventBase.color, "#ffffff", 0.4, 0.7),
          }}
        >
          <div className="flex w-full flex-col md:flex-row items-center justify-center  md:gap-6  md:p-6 border-b border-white/20 flex-shrink-0">
            <div className="pointer-events-none transform translate-x-[-32px] md:translate-0 scale-50 w-34 h-43 md:w-full md:h-full md:scale-100 origin-top">
              <EventCard event={eventBase} setActive={() => {}} />
            </div>
            <div className="flex flex-col items-center md:items-start w-full">
              <h1
                className="text-4xl md:text-6xl font-bold tracking-tighter text-center md:text-left"
                style={{ color: eventBase.color }}
              >
                {eventBase.name}
              </h1>
              <div className="flex flex-wrap w-full gap-2 my-4 justify-center md:justify-start">
                <div
                  className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: eventBase.color, color: textColor }}
                >
                  <CalendarIcon />{" "}
                  {new Date(eventBase.time).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(eventBase.time).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div
                  className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: eventBase.color, color: textColor }}
                >
                  <FeeIcon /> Fee: ₹{eventDetails?.fee}
                </div>
                <div
                  className="flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: eventBase.color, color: textColor }}
                >
                  <VenueIcon /> {eventDetails?.venue}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow p-4 md:p-6 overflow-y-auto text-black prose prose-lg">
            {renderContent()}
          </div>
        </div>

        <div className="absolute z-10 bottom-16 md:bottom-4 h-12 flex gap-2 flex-row justify-center items-center">
          <div className="hidden md:flex overflow-hidden h-full backdrop-blur-md text-black space-x-[-1rem] rounded-full bg-white/70 items-center justify-center">
            {["about", "rules", "format", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-sm capitalize ease-in-out duration-500 px-6 py-1.5 h-full min-w-24 hover:text-black transition-all
        ${activeTab === item ? "bg-evening-sea-400/70 rounded-none z-15" : " z-14 hover:bg-evening-sea-300/70 rounded-4xl"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative h-full flex w-48 md:hidden">
            <button
              ref={navDropdownRef}
              onClick={toggleNavDropdown}
              className="w-full h-full rounded-4xl bg-white/70 backdrop-blur-md px-4 flex items-center justify-between text-black"
            >
              <span className="font-semibold capitalize">{activeTab}</span>
              <span className="text-xs">▼</span>
            </button>
            <DropDown
              options={{
                about: "About",
                rules: "Rules",
                format: "Format",
                contact: "Contact",
              }}
              selectedOption={activeTab}
              onSelect={(option: string) => {
                setActiveTab(option);
                toggleNavDropdown();
              }}
              triggerRef={navDropdownRef}
              onClose={toggleNavDropdown}
              isOpen={isNavDropdownOpen}
            />
          </div>

          {eventDetails?.isClosed ? (
            <button
              disabled
              className="h-12 text-sm rounded-4xl bg-red-400/80 text-white px-6 min-w-24 cursor-not-allowed"
            >
              Closed
            </button>
          ) : (
            <Link
              href={`/legacy/${id}`}
              className="h-12 flex items-center justify-center backdrop-blur-sm text-sm rounded-4xl 80 text-white font-bold px-6 min-w-24 transition-colors"
              style={{
                backgroundColor: eventBase?.color + "c0",
              }}
            >
              Register
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
