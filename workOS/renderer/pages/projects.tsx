import type { NextPage } from "next";
import React from "react";
import ProjectContainer from "../container/projects";
const Home: NextPage = () => {
    return (
        <React.Fragment>
            <ProjectContainer />
        </React.Fragment>
    );
};

export default Home;