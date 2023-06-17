import dynamic from "next/dynamic";
import React from "react";
import LayoutComponent from "./layout";

export default function LayoutContainer({ children, ...props }) {
  console.log({ children, props })
  return <LayoutComponent {...props}>{children}</LayoutComponent>;
}
