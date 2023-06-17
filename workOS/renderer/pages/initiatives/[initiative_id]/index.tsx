import type { NextPage } from "next";
import React, { useEffect } from "react";
import ProjectContainer from "../../../container/projects";
import { useRouter } from "next/router";
import LayoutContainer from "../../../layout";
const Home: NextPage = (props) => {
  return (
    <LayoutContainer
      parentUrl={"/home"}
      parentName={`Home`}
      parentIcon={"home"}
    >
      <ProjectContainer />
    </LayoutContainer>
  );
};
export default Home;
