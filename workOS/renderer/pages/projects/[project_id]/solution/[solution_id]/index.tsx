import dynamic from "next/dynamic";

export default function SolutionPage() {
  const SpreadSheet = dynamic(
    () => import("../../../../../container/solutions/spreadsheet"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  return <SpreadSheet />;
}
