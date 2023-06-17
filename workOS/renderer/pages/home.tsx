import type { NextPage } from "next";
import React, { Suspense } from "react";
import HomeContainer from "../container/home";
import PaginationComponent from "../component/pagination";
import LayoutContainer from "../layout";
const Home: NextPage<{ parentUrl: string }> = ({ parentUrl }) => {
  return (
    <LayoutContainer parentUrl={""}>
      <React.Fragment>
        <HomeContainer />
      </React.Fragment>
    </LayoutContainer>
  );
};

export default Home;
