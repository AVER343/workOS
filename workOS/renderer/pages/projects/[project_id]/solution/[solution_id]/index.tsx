import dynamic from "next/dynamic";
import LayoutContainer from "../../../../../layout";
import { useRouter } from "next/router";

export default function SolutionPage() {
  let router = useRouter();
  const SpreadSheet = dynamic(
    () => import("../../../../../container/speadsheet"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  return (
    <LayoutContainer
      parentName={"Solution"}
      parentUrl={router.asPath.split("/").slice(0, 3).join("/")}
    >
      <SpreadSheet />
    </LayoutContainer>
  );
}
