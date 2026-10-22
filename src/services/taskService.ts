import type { TaskPayload } from "../types/taskTypes";
import api from "./api";

export async function createNewtask(data: TaskPayload) {
    const { project, assignee, dueDate, ...rest } = data;
    const payload = {
        ...rest,
        assigneeId: assignee || null,
        dueDate: dueDate || null,
    };
    const response = await api.post(`/projects/${project}/tasks`, payload);
    return response.data;
}