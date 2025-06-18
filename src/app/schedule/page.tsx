"use client";

import { useState, useEffect } from "react";
import { ItemType } from "@/components/ItemCard";
import { ScheduleList } from "@/components/ScheduleList";

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const dayFilters = ["All Days", "Day 1", "Day 2", "Day 3"];
  const typeFilters = [
    "All",
    "General",
    "Talk",
    "Conference",
    "Workshop",
    "Competition",
  ];

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const [eventsRes, competitionsRes] = await Promise.all([
          fetch("/data/events.json"),
          fetch("/data/competitions.json"),
        ]);

        if (!eventsRes.ok || !competitionsRes.ok) {
          throw new Error("Network response was not ok");
        }

        const eventsData: ItemType[] = await eventsRes.json();
        const competitionsData: ItemType[] = await competitionsRes.json();

        const typedCompetitions = competitionsData.map((comp) => ({
          ...comp,
          type: "Competition",
        }));

        const combinedData = [...eventsData, ...typedCompetitions];
        setScheduleItems(combinedData);
      } catch (error) {
        console.error("Failed to fetch schedule data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  return (
    <ScheduleList
      dayFilters={dayFilters}
      typeFilters={typeFilters}
      name="Schedule"
      items={scheduleItems}
      loading={loading}
    />
  );
}
