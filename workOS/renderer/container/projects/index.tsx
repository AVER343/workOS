import React, { useEffect, useState } from "react";
import ProjectListComponent from "../../component/projects/project-list.component";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  deleteProject,
  editProject,
  getAllProjects,
} from "../../redux/projects";
import { AppState } from "../../redux/store";
import { I_ProjectModel } from "../../utils/db/interfaces";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import EditProjectModal from "../../component/modal/projects/project-edit.modal";
function ProjectContainer() {
  const router = useRouter();
  const projects = useSelector((state: any) => state.projects.projects);
  const dispatch = useDispatch();
  const handleCreate = (project: I_ProjectModel) => {
    dispatch(createProject(project));
  };
  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };
  const handleEdit = (obj: I_ProjectModel) => {
    dispatch(editProject(obj));
  };
  useEffect(() => {
    dispatch(getAllProjects({ initiative_id: router.query.initiative_id }));
  }, [router.route]);
  return (
    <>
      <Button onPress={() => router.back()}>BACK</Button>
      <CreateProject handleCreate={handleCreate} router={router} />

      <ProjectListComponent
        onSave={handleEdit}
        deleteProject={handleDelete}
        projects={projects}
      />
    </>
  );
}

export default ProjectContainer;
function CreateProject({
  handleCreate,
  router,
}: {
  handleCreate: (project: I_ProjectModel) => void;
  router: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <EditProjectModal
          onSave={handleCreate}
          isModalOpen={isModalOpen}
          onClose={async () => setIsModalOpen(false)}
          isNew={true}
          project={{
            initiative_id: router.query.initiative_id,
            project_title: "",
            project_description: "",
            project_objective: { client: "", internal: "" },
            project_solution_ids: [],
            id: uuidv4(),
            project_url: "",
          }}
        />
      )}
      <Button
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        CREATE NEW
      </Button>
    </>
  );
}
