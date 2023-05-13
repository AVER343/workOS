import React from "react";
import HeaderComponent from "./header";
import { Container } from "@nextui-org/react";

function LayoutComponent({ children }) {
  return <Container className="ml-2 mr-2 mb-1 mt-2">{children}</Container>;
}

export default LayoutComponent;
