import type { CreateProjectPayload, Project } from "../types/projectTypes"
import api from "./api"

export async function createProject(data: CreateProjectPayload) {
    const response = await api.post<Project>("/projects", data);
    return response.data;


}