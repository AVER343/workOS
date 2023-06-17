import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSolutions,
  createSolution,
  editSolution,
  deleteSolution,
} from "../../redux/solutions";
import { AppState } from "../../redux/store";
import { Button, Grid, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import {
  I_SolutionTableModel,
  I_SolutionsModel,
} from "../../utils/db/interfaces";
import { randomUUID } from "crypto";
import { getAllInitiatives } from "../../redux/intiatives";
import { motion } from "framer-motion";
import { CloseBadgeComponent } from "../../component/badge/close";
import { DeleteModalComponent } from "../../component/modal/common_modals";
import EditSolutionModal from "../../component/projects/solution/editSolution.modal";
import ItemComponent from "../../component/home/item.component";
import { SolutionItemContainer } from "../../component/projects/solution";
import SolutionItemComponent from "../../component/solution/solution-item.component";
import SolutionListComponent from "../../component/solution/solution-list.component";
import LayoutContainer from "../../layout";
import { Database } from "../../utils/db";
function SolutionsContainer() {
  const router = useRouter();
  const solutions = useSelector((state: AppState) => state.solutions.solutions);
  const dispatch = useDispatch();
  const handleCreate = ({
    solution,
    solutionTable,
  }: {
    solutionTable: any;
    solution: I_SolutionsModel;
  }) => {
    dispatch(createSolution({ solution, solutionTable }));
  };
  const onSave = (data: I_SolutionsModel) => {
    dispatch(editSolution(data));
  };
  const onDelete = (data: I_SolutionsModel) => {
    dispatch(deleteSolution(data));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [seleectIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    if (typeof router.query.project_id == "string") {
      {
        dispatch(getAllSolutions({ project_id: router.query.project_id }));
      }
    }
  }, [router.query.project_id]);
  let project_id = router.asPath.split("/")[2];
  const db = new Database().InitiativeModels();
  return (
    <>
      <LayoutContainer parentUrl={`/initiatives/${db.projects.adapter.read().find((project) => project.id == project_id)
        .initiative_id
        }`}
        parentName={`Project`}>
        {isDeleteModalOpen && (
          <>
            <DeleteModalComponent
              initiative={solutions[seleectIndex]}
              onClose={() => {
                setIsDeleteModalOpen(false);
              }}
              onDelete={() => {
                onDelete(solutions[seleectIndex]);
                setIsDeleteModalOpen(false);
              }}
              isModalOpen={isDeleteModalOpen}

            /></>
        )}
        {isModalOpen && (
          <EditSolutionModal
            onEdit={(solution) => {
              let table_id = randomUUID();
              handleCreate({
                solution: {
                  project_id:
                    typeof router.query.project_id == "string" &&
                    router.query.project_id,
                  created_on: new Date().toDateString(),
                  title: solution.title,
                  id: randomUUID(),
                  overvew: solution.overvew,
                  table_id: [table_id],
                },
                solutionTable: {
                  table_id,
                  columns: [
                    {
                      id: "64e82fff-bd45-4560-b9f1-a7ed25d62da6",
                      columnId: "64e82fff-bd45-4560-b9f1-a7ed25d62da6",
                      width: 150,
                      resizable: true,
                      reorderable: true,
                    },
                    {
                      id: "7822ef87-68a1-46ef-9c52-684bce887bf3",
                      columnId: "7822ef87-68a1-46ef-9c52-684bce887bf3",
                      resizable: true,
                      reorderable: true,
                      width: 75,
                    },
                    {
                      id: "a3381c4f-c114-4580-a7bd-e7f3e8978562",
                      columnId: "a3381c4f-c114-4580-a7bd-e7f3e8978562",
                      resizable: true,
                      reorderable: true,
                      width: 150,
                    },
                    {
                      id: "f2b9eb5b-b47b-4d62-86e3-4ec3f07c5c82",
                      columnId: "f2b9eb5b-b47b-4d62-86e3-4ec3f07c5c82",
                      resizable: true,
                      reorderable: true,
                      width: 75,
                    },
                    {
                      id: "78a5a972-335e-4fa5-921b-48ae27bd7c86",
                      columnId: "78a5a972-335e-4fa5-921b-48ae27bd7c86",
                      resizable: true,
                      reorderable: true,
                      width: 75,
                    },
                    {
                      id: "3516ee84-3e57-4b3b-bf9a-04815eb641e3",
                      columnId: "3516ee84-3e57-4b3b-bf9a-04815eb641e3",
                      resizable: true,
                      reorderable: true,
                      width: 120,
                    },
                    {
                      id: "f24a7a79-ef7c fg-44f0-99f5-9535faaf3026",
                      columnId: "f24a7a79-ef7c-44f0-99f5-9535faaf3026",
                      resizable: true,
                      reorderable: true,
                      width: 250,
                    },
                    {
                      id: "d24a7a79-ef7c-44f0-99f5-9535faaf3026",
                      columnId: "d24a7a79-ef7c-44f0-99f5-9535faaf3026",
                      resizable: true,
                      reorderable: true,
                      width: 200,
                    },
                    {
                      id: "55de7f45-a2a1-4b69-ac0e-d067f7364a6d",
                      columnId: "55de7f45-a2a1-4b69-ac0e-d067f7364a6d",
                      resizable: true,
                      reorderable: true,
                      width: 50,
                    },
                    {
                      id: "45de7f45-a2a1-4b69-ac0e-d067f7364a6d",
                      columnId: "45de7f45-a2a1-4b69-ac0e-d067f7364a6d",
                      resizable: true,
                      reorderable: true,
                      width: 50,
                    },
                  ],
                  rows: [
                    {
                      rowId: "topHeader",
                      cells: [
                        {
                          type: "text",
                          text: "",
                          columnId: "64e82fff-bd45-4560-b9f1-a7ed25d62da6",
                        },
                        {
                          type: "text",
                          text: "Name",
                          columnId: "7822ef87-68a1-46ef-9c52-684bce887bf3",

                          value: null,
                        },
                        {
                          type: "text",
                          text: "Email",
                          columnId: "a3381c4f-c114-4580-a7bd-e7f3e8978562",

                          value: null,
                        },
                        {
                          type: "text",
                          text: "Title",
                          columnId: "f2b9eb5b-b47b-4d62-86e3-4ec3f07c5c82",

                          value: null,
                        },
                        {
                          type: "text",
                          text: "Role",
                          columnId: "78a5a972-335e-4fa5-921b-48ae27bd7c86",

                          value: null,
                        },
                        {
                          type: "text",
                          text: "Cost to Company(Per hour)",
                          columnId: "f24a7a79-ef7c-44f0-99f5-9535faaf3026",

                          value: "0",
                        },
                        {
                          type: "text",
                          text: "Total Cost To Customer",
                          columnId: "3516ee84-3e57-4b3b-bf9a-04815eb641e3",

                          value: "0",
                        },

                        {
                          type: "text",
                          text: "Total Cost to Company",
                          columnId: "d24a7a79-ef7c-44f0-99f5-9535faaf3026",

                          value: "",
                        },
                        {
                          type: "text",
                          text: "Total Hours",
                          columnId: "55de7f45-a2a1-4b69-ac0e-d067f7364a6d",

                          value: "",
                        },
                        {
                          type: "text",
                          text: "Profit",
                          columnId: "45de7f45-a2a1-4b69-ac0e-d067f7364a6d",
                          value: "0",
                        },
                      ],
                    },
                  ],
                },
              });
            }}
            solutionData={JSON.parse(JSON.stringify({}))}
            onClose={async () => setIsModalOpen(false)}
            isNew={true}
          />
        )}
        {isEditModalOpen && (
          <EditSolutionModal
            onEdit={(solution) => { }}
            solutionData={JSON.parse(JSON.stringify({}))}
            onClose={async () => setIsModalOpen(false)}
            isNew={true}
          />
        )}
        <Button
          onPress={() => {
            setIsModalOpen(true);
          }}
        >
          Create
        </Button>
        <SolutionListComponent
          onSave={onSave}
          selectedIndex={seleectIndex}
          setSelectedIndex={setSelectedIndex}
          solutions={solutions}
          deleteSolution={onDelete}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
        />
      </LayoutContainer>
    </>

  );
}

export default SolutionsContainer;
