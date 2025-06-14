import LegacyYearPage from "@/components/legacyPage";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;

  return <LegacyYearPage year={year} />;
}
