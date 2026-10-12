import type { MembersPayload, MemberResponse, UserRole, UserStatus, EditMemberResponse, InviteMemberResponse } from "../types/memberTypes"
import api from "./api"
export async function handleInviteMember(data: MembersPayload) {
    const response = await api.post<InviteMemberResponse>('/members', data);
    return response.data;


}
export async function getMembers(status: string, role: string, search: string) {
    const response = await api.get<MemberResponse>('/members', {
        params: {
            status: status || undefined,
            role: role || undefined,
            search: search || undefined,
        }
    });
    return response.data;


}

export async function updateUserRole(id: string, role: UserRole | string) {
    const response = await api.patch<EditMemberResponse>(`/members/${id}`, { role });
    return response.data;


}
export async function userStatus(id: string, status: UserStatus) {
    const response = await api.patch<EditMemberResponse>(`/members/${id}`, { status });
    return response.data;


}

export async function editUserDetails(id: string, data: MembersPayload) {
    const response = await api.patch<EditMemberResponse>(`/members/${id}`, data);
    return response.data;


}
