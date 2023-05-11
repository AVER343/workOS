import type { NextPage } from "next";
import React, { useEffect } from "react";
import ProjectContainer from "../../../container/projects";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  return (
    <React.Fragment>
      <ProjectContainer />
    </React.Fragment>
  );
};

export default Home;
