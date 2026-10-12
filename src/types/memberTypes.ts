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
export interface EditMemberResponse {
    success: boolean,
    message: string,
    data: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        status: UserStatus;
        avatar: string;
        updatedAt: string;
    }
}

export interface InviteMemberResponse {
    success: boolean,
    message: string,
    data: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        avatar: string;
        joinedAt: string,
        status: UserStatus;
        temporaryPassword: string
    }
}