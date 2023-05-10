export interface I_ProjectModel{
    id: string;
    initiative_id: string;
    project_overview?: string;
    project_description?: string;
    project_objective: {
        client?: any;
        internal?: any;
    },
    project_title: string;
    project_solution_ids: string[]
    project_url?: string;
}