import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SolutionsContainer from "../../../container/solutions";
const Home: NextPage = () => {
  return (
    <React.Fragment>
      <SolutionsContainer />
    </React.Fragment>
  );
};

export default Home;
