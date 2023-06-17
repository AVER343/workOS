import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Database } from "../../../utils/db";
import LayoutContainer from "../../../layout";
const ProjectPage: NextPage = (props: { parentUrl: string }) => {
  const DynamicSolutionContainer = dynamic(
    () => import("../../../container/solution"),
    { ssr: false }
  );
  return (
      <React.Fragment>
        <DynamicSolutionContainer />
      </React.Fragment>
  );
};
export default ProjectPage;
