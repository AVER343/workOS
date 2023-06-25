import dynamic from "next/dynamic";
import React from "react";
import LayoutComponent from "./layout";
import { motion } from "framer-motion";

export default function LayoutContainer({ children, ...props }) {
  return <LayoutComponent  {...props}>{children}</LayoutComponent>;
}
