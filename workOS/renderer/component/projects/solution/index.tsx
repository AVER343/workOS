import { Grid, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { I_SolutionsModel } from "../../../utils/db/interfaces";
import { CloseBadgeComponent } from "../../badge/close";
import SolutionComponent from "./solution.component";

export function SolutionItemContainer(
  { e,
    setSelectedIndex,
    index,
    setIsModalOpen,
    onSave }: {
      e: I_SolutionsModel,
      setSelectedIndex: React.Dispatch<any>,
      index: number,
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
      onSave
    }
): React.JSX.Element {
  return (
    <Grid style={{ minWidth: "350px", marginTop: "15px" }} xs={3} key={e.id}>
      <motion.li
        layout
        // initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
        key={e.id}
      >
        <CloseBadgeComponent
          key={e.id}
          id={e.id}
          topPercent={0}
          rightPercent={0}
          content={
            <Tooltip enterDelay={300} color={"error"} content={"Delete"}>
              X
            </Tooltip>
          }
          onPress={() => {
            setSelectedIndex(index);
            setIsModalOpen(true);
          }}
        >
          <SolutionComponent isNew={false} solution={e} onSave={onSave} />
        </CloseBadgeComponent>
      </motion.li>
    </Grid>
  );
}
