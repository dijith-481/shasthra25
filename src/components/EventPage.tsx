"use client";
import { useState, useEffect } from "react";
import { ItemType } from "@/components/ItemCard";
import ItemPage from "@/components/ItemPage";
import { ItemDetailsType } from "@/utils/types";
import { useColorContext } from "@/context/color";

export default function EventPage({ id }: { id: string }) {
  const [eventDetails, setEventDetails] = useState<ItemDetailsType | null>(
    null,
  );
  const [eventBase, setEventBase] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setColor } = useColorContext();

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailsResponse, baseResponse] = await Promise.all([
          fetch(`/data/events/1.json`),
          fetch(`/data/events.json`),
        ]);
        if (!detailsResponse.ok)
          throw new Error(`Event details for '${id}' not found.`);
        if (!baseResponse.ok)
          throw new Error("Could not load base events data.");
        const detailsData: ItemDetailsType = await detailsResponse.json();
        const baseData: ItemType[] = await baseResponse.json();
        const baseEventInfo = baseData.find((event) => event.id == id);
        if (!baseEventInfo)
          throw new Error(`Base event info for '${id}' not found.`);
        setEventDetails(detailsData);
        setEventBase(baseEventInfo);
        setColor(baseEventInfo.color);
      } catch (err: unknown) {
        {
          console.error("Failed to fetch competition data:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else if (typeof err === "string") {
            setError(err);
          } else if (
            typeof err === "object" &&
            err !== null &&
            "message" in err
          ) {
            setError((err as { message: string }).message);
          } else {
            setError("An unknown error occurred.");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEventData();
  }, [id, setColor]);

  return (
    <ItemPage
      name="Events"
      loading={loading}
      itemDetails={eventDetails}
      itemBase={eventBase}
      error={error}
    />
  );
}
