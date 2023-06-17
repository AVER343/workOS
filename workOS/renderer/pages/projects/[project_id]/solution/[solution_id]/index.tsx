import dynamic from "next/dynamic";

export default function SolutionPage() {
  const SpreadSheet = dynamic(
    () => import("../../../../../container/speadsheet"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  return <SpreadSheet />;
}
