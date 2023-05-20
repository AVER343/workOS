import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ProjectPage: NextPage = () => {
  const DynamicSolutionContainer = dynamic(() => import("../../../container/solution"), { 'ssr': false, })
  return (
    <React.Fragment>
      <DynamicSolutionContainer />
    </React.Fragment>
  );
};

export default ProjectPage;
