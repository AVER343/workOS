import { NextRouter } from "next/router";

export const Routing = (route: NextRouter) => {
  const currentRoute = route.asPath.split("/").filter((e) => e);
  console.log(currentRoute);
  if (currentRoute[0] == "initiatives") {
    if (currentRoute.length == 2) {
      console.log("initia");
    } else {
      console.log("solutions page");
    }
  } else if (currentRoute[0] == "home") {
    console.log("home");
  } else if (currentRoute[0] == "projects") {
    console.log("projects");
  }
};
