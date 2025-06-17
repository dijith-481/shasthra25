"use client";
import { useState, useEffect } from "react";
import { ItemType } from "@/components/ItemCard";
import ItemPage from "@/components/ItemPage";
import { ItemDetailsType } from "@/utils/types";
import { useColorContext } from "@/context/color";

export default function CompetitionPage({ id }: { id: string }) {
  const [competitionDetails, setCompetitionDetails] =
    useState<ItemDetailsType | null>(null);
  const [competitionBase, setCompetitionBase] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setColor } = useColorContext();

  useEffect(() => {
    const fetchCompetitonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailsResponse, baseResponse] = await Promise.all([
          fetch(`/data/events/1.json`),
          fetch(`/data/competitions.json`),
        ]);
        if (!detailsResponse.ok)
          throw new Error(`Competition details for '${id}' not found.`);
        if (!baseResponse.ok)
          throw new Error("Could not load base Competition data.");
        const detailsData: ItemDetailsType = await detailsResponse.json();
        const baseData: ItemType[] = await baseResponse.json();
        const baseCompetitionInfo = baseData.find(
          (competition) => competition.id == id,
        );
        if (!baseCompetitionInfo)
          throw new Error(`Base competition info for '${id}' not found.`);
        setCompetitionDetails(detailsData);
        setCompetitionBase(baseCompetitionInfo);
        setColor(baseCompetitionInfo.color);
      } catch (err: any) {
        console.error("Failed to fetch competition data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCompetitonData();
  }, [id]);

  return (
    <ItemPage
      name="Competitions"
      loading={loading}
      itemDetails={competitionDetails}
      itemBase={competitionBase}
      error={error}
    />
  );
}
