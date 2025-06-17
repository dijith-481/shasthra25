"use client";
import { ItemsList } from "@/components/ItemList";
import { useEffect, useState } from "react";
import { ItemType } from "@/components/ItemCard";

export default function EventsList() {
  const [events, setEvents] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "General", "Talk", "Conference", "Workshop"];
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ItemType[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ItemsList
      filters={filters}
      name="Events"
      items={events}
      loading={loading}
    />
  );
}
