import dynamic from "next/dynamic";
import React from "react";

export default function LayoutContainer({ children }) {
  const DynamicHeader = dynamic(() => import("./layout"), {
    ssr: false,
    loading: () => children,
  });
  return <DynamicHeader children={children} />;
}
