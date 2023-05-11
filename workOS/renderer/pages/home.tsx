import type { NextPage } from "next";
import React from "react";
import HomeContainer from "../container/home";
import PaginationComponent from "../component/pagination";
const Home: NextPage = () => {
  return (
    <React.Fragment>
      <HomeContainer />
    </React.Fragment>
  );
};

export default Home;
