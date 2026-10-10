export type UserRole = "ADMIN" | "MANAGER" | "MEMBER"
export type UserStatus = "ACTIVE" | "INACTIVE"
export interface MembersPayload {
    email: string,
    name: string,
    role: UserRole,
    password?: string,
    projectId?: string
}
export interface Member {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar: string;
    joinedAt: string;
    projects: any[];
}

export interface MemberResponse {
    success: boolean,
    message: string,
    data: Member[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNext: boolean,
        hasPrev: boolean
    }
}
