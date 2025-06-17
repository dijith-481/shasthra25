"use client";
import { ItemsList } from "@/components/ItemList";
import { useEffect, useState } from "react";
import { ItemType } from "@/components/ItemCard";

export default function CompetitionsList() {
  const [competitions, setCompetitions] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "csTech", "genTech", "nonTech"];

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch("data/competitions.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ItemType[] = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error("Failed to fetch competitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <ItemsList
      filters={filters}
      name="Competitions"
      items={competitions}
      loading={loading}
    />
  );
}
