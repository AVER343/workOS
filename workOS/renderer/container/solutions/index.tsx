import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import solutions, {
  getAllSolutions,
  createSolution,
} from "../../redux/solutions";
import { AppState } from "../../redux/store";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { I_SolutionsModel } from "../../utils/db/interfaces";
import { randomUUID } from "crypto";
function SolutionsContainer() {
  const router = useRouter();
  const solutions = useSelector((state: AppState) => state.solutions.solutions);
  const dispatch = useDispatch();
  const handleCreate = ({
    project_id,
    solution,
  }: {
    project_id: string;
    solution: I_SolutionsModel;
  }) => {
    dispatch(createSolution({ project_id, solution }));
  };
  // const handleDelete = (id: string) => {
  //   dispatch(deleteProject(id));
  // };
  // const handleEdit = (obj: I_ProjectModel) => {
  //   dispatch(editProject(obj));
  // };
  useEffect(() => {
    if (typeof router.query.project_id == "string")
      dispatch(getAllSolutions({ project_id: router.query.project_id }));
  }, [router.route]);
  return (
    <>
      <Button onPress={() => router.back()}>BACK</Button>
      <Button
        onPress={() => {
          handleCreate({
            solution: {
              created_on: new Date().toDateString(),
              title: "title = " + randomUUID(),
              id: randomUUID(),
              overvew: "Overview",
              data: [],
            },
            project_id:
              typeof router.query.project_id == "string" &&
              router.query.project_id,
          });
        }}
      >
        Create
      </Button>
      {solutions.map((e) => (
        <p
          onClick={() =>
            router.push(`/projects/${router.query.project_id}/solution/${e.id}`)
          }
        >
          {JSON.stringify(e)}
        </p>
      ))}
    </>
  );
}

export default SolutionsContainer;
