import type { TaskPayload } from "../types/taskTypes"
import api from "./api"

export async function createNewtask(data: TaskPayload) {
    const response = await api.post(`/projects/:projectId/tasks`);
    return response.data;
}