import api from './api'
import type { LoginFormData } from "../schemas/auth/loginSchema";
import type { RegisterFormData } from "../schemas/auth/registerSchema"
import type { ForgotPasswordFormData } from "../schemas/auth/forgotPasswordSchema"
import type { ResetPasswordFormData } from "../schemas/auth/resetPasswordSchema"
import type { LoginResponse, ResetPasswordPayload } from "../features/auth/authTypes"
export async function login(data: LoginFormData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
}

export async function register(data: RegisterFormData) {
    const response = await api.post('/auth/register', data);
    return response.data;

}

export async function forgotPassword(data: ForgotPasswordFormData) {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;


}
export async function resetPassword(data: ResetPasswordPayload) {
    const response = await api.post(`/auth/reset-password`, data);
    return response.data;


}
