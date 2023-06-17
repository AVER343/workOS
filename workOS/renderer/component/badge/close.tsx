import { Badge } from "@nextui-org/react"
import React, { ReactNode } from "react";
import ScaleWrapper from "../wrapper/scale";
import { randomUUID } from "crypto";
import { motion } from 'framer-motion'
export function CloseBadgeComponent(props: {
  id: string;
  children: ReactNode;
  onPress: () => void;
  content: ReactNode;
  topPercent?: number;
  rightPercent?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1, rotate: 0 }}
      whileTap={{
        scale: 1,
        rotate: 0,
        borderRadius: "100%"
      }}
    >
      <Badge
        style={{
          top: `calc(${props.topPercent ?? 5}% + var(--nextui--badgePlacementVOffset))`,
          right: `calc(${props.rightPercent ?? 3}% + var(--nextui--badgePlacementVOffset))`,
          userSelect: "none",
          cursor: "pointer",
          backgroundColor: "red",
          width: "25px",
          height: "25px",
        }}
        className="close-badge"
        key={props.id}
        content={props.content}
        color="error"
        onClick={props.onPress}
        placement="top-right"
        size="md"
      >
        {props.children}
      </Badge></motion.div>
  );
}
