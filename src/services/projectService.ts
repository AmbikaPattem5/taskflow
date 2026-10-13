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