import { Badge } from "@nextui-org/react";
import React, { ReactNode } from "react";
import ScaleWrapper from "../wrapper/scale";
import { randomUUID } from "crypto";

export function CloseBadgeComponent(props: {
  id: string;
  children: ReactNode;
  onPress: () => void;
  content: ReactNode;
}) {
  return (
    <Badge
      style={{
        top: `calc(5% + var(--nextui--badgePlacementVOffset))`,
        right: `calc(3% + var(--nextui--badgePlacementVOffset))`,
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
    </Badge>
  );
}
