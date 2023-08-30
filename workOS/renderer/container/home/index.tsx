import React, { useEffect } from "react";
// import ProjectListComponent from '../../component/initiatives/project-list.component'
import { useDispatch, useSelector } from "react-redux";
import {
  createInitiative,
  deleteInitiative,
  editInitiative,
  getAllInitiatives,
} from "../../redux/intiatives";
import { AppState } from "../../redux/store";
import { I_InitiativesModel } from "../../utils/db/interfaces";
import { Button, Text, Row, Spacer } from "@nextui-org/react";
import ProjectListComponent from "../../component/projects/project-list.component";
import { Database } from "../../utils/db";
import HomeListComponent from "../../component/home/home-list.component";
import { useRouter } from "next/router";
import PaginationComponent from "../../component/pagination";
import { CreateInitiative } from "../../component/home/edit-initiative.component";
function HomeContainer() {
  const initiatives = useSelector(
    (state: AppState) => state.initiatives.initiatives
  );
  const dispatch = useDispatch();
  const handleCreate = (project: I_InitiativesModel) => {
    dispatch(createInitiative(project));
  };
  const handleDelete = (id: string) => {
    dispatch(deleteInitiative(id));
  };
  useEffect(() => {
    dispatch(getAllInitiatives());
  }, []);
  function onEdit(initiative_new: I_InitiativesModel) {
    dispatch(editInitiative(initiative_new));
  }
  return (
    <>
      <Row justify="center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          style={{ width: "250px" }}
          weight="bold"
        >
          Intiatives
        </Text>
      </Row>
      <CreateInitiative onEdit={onEdit} handleCreate={handleCreate} />
      <Spacer />
      <Spacer />
      <HomeListComponent
        onEdit={onEdit}
        deleteInititive={handleDelete}
        initiatives={initiatives}
      />
    </>
  );
}

export default HomeContainer;
