export type ProjectStatus = 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';
export type ProjectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate?: string | null;
    dueDate?: string | null;
    color?: string;
    icon?: string;
    ownerId: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    memberCount?: number;
    taskCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectPayload {
    name: string;
    description?: string;
    status?: ProjectStatus;
    priority?: ProjectPriority;
    startDate?: string | null;
    dueDate?: string | null;
    color?: string;
    icon?: string;
}

export interface UpdateProjectPayload {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    priority?: ProjectPriority;
    startDate?: string | null;
    dueDate?: string | null;
    color?: string;
    icon?: string;
}

export interface ProjectResponse {
    success: boolean;
    message: string;
    data: Project[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface SingleProjectResponse {
    success: boolean;
    message: string;
    data: Project & {
        taskStats?: {
            total: number;
            todo: number;
            inProgress: number;
            inReview: number;
            done: number;
        };
    };
}
