import CompetitionPage from "@/components/CompetitionPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CompetitionPage id={id} />;
}
