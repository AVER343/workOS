import style from "./close.module.scss";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
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
      style={{ position: "relative" }}
      whileHover={{ scale: 1, rotate: 0 }}
      whileTap={{
        scale: 1,
        rotate: 0,
        borderRadius: "100%",
      }}
    >
      <div className={style.close} onClick={props.onPress}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <svg viewBox="0 0 36 36" className={style.circle}>
          <path
            strokeDasharray="100, 100"
            d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
      {props.children}
    </motion.div>
  );
}
