import type { CreateProjectPayload, Project, ProjectResponse } from "../types/projectTypes"
import api from "./api"

export async function createProject(data: CreateProjectPayload) {
    const response = await api.post<Project>("/projects", data);
    return response.data;


}
export async function getAllProjects() {
    const response = await api.get<ProjectResponse>("/projects");
    return response.data;


}

export async function editProject(id: string, data: Partial<CreateProjectPayload>) {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
}