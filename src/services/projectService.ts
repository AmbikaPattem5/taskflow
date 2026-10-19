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

export async function archieveProject(id: string) {
    return editProject(id, { status: "ARCHIVED" });
}

export interface ProjectMemberUser {
    id: string;
    _id?: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
}

export interface ProjectMember {
    id: string;
    _id?: string;
    projectId?: string;
    user: ProjectMemberUser;
    role: "ADMIN" | "MANAGER" | "MEMBER";
    joinedAt: string;
}

export interface ProjectMembersResponse {
    success: boolean;
    message: string;
    data: ProjectMember[];
}

export async function getProjectMembers(projectId: string) {
    const response = await api.get<ProjectMembersResponse>(`/projects/${projectId}/members`);
    return response.data;
}

export async function addProjectMember(projectId: string, data: { email: string; role?: string }) {
    const response = await api.post(`/projects/${projectId}/members`, data);
    return response.data;
}

export async function updateProjectMemberRole(projectId: string, userId: string, role: string) {
    const response = await api.patch(`/projects/${projectId}/members/${userId}`, { role });
    return response.data;
}

export async function removeProjectMember(projectId: string, userId: string) {
    const response = await api.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
}