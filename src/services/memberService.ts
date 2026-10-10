import type { MembersPayload, MemberResponse, UserRole } from "../types/memberTypes"
import api from "./api"
export async function handleInviteMember(data: MembersPayload) {
    const response = await api.post('/members', data);
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
    const response = await api.patch(`/members/${id}`, { role });
    return response.data;


}