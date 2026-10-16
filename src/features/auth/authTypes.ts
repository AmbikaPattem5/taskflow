export type UserRole = "ADMIN" | "MANAGER" | "MEMBER";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
export interface LoginResponse {
    success: boolean,
    message: string,
    data: {
        user: {
            id: string,
            name: string,
            email: string,
            role: UserRole,
            avatar: string
        },
        token: string
    }
}

export interface ResetPasswordPayload {
    token: string,
    password: string
}