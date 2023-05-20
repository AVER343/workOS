import dynamic from "next/dynamic";

export default function SolutionPage() {
  const SpreadSheet = dynamic(
    () => import("../../../../../container/solution/spreadsheet"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  return <SpreadSheet />;
}
