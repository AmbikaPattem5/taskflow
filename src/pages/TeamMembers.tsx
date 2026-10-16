import InviteMemberModal from "../features/members/components/InviteMemberModal"
import { useState, useEffect } from "react"
import type { UserRole, UserStatus, Member } from "../types/memberTypes"
import { EllipsisVertical } from 'lucide-react';
import toast from "react-hot-toast"
import { getMembers } from "../services/memberService"
import MemberActionsMenu from "../features/members/components/MemberActionsMenu"

const Role = {
    Admin: "ADMIN",
    Manager: "MANAGER",
    Member: "MEMBER"
} as const;

const Status = {
    Active: "ACTIVE",
    Inactive: "INACTIVE"
} as const;

function TeamMembers() {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [search, setSearch] = useState<string>("");
    const [role, setRole] = useState<UserRole | string>("")
    const [status, setStatus] = useState<UserStatus | string>("")
    const [members, setMembers] = useState<Member[]>([])
    const [openMenuMemberId, setOpenMenuMemberId] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = e.target;
        if (name == "role") {
            setRole(value)
        }
        else if (name == "search") {
            setSearch(value)
        }
        else {
            setStatus(value)
        }
    }
    const fetchMembers = async () => {
        try {
            const response = await getMembers(status, role, search)
            console.log("rensponse is", response)
            setMembers(response.data)
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to fetch team members");
        }
    };
    useEffect(() => {
        fetchMembers();
    }, [status, role, search])
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                    <div>
                        <input type="text" name="search" className="border border-gray-400 h-7 w-full max-w-xs rounded" value={search} onChange={handleChange} />
                    </div>
                    <div>
                        <select className="border border-gray-400 h-7 w-full w-max-xs rounded" name="role" value={role} onChange={handleChange}>
                            <option value="">All Roles</option>
                            {Object.entries(Role).map(([key, value]) => {
                                return (
                                    <option key={key} value={value}>{value}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <select name="status" className="border border-gray-400 h-7 w-full w-max-xs rounded" value={status} onChange={handleChange}>
                            <option value="">Select Status</option>
                            {Object.entries(Status).map(([key, value]) => {
                                return (
                                    <option key={key}>{value}</option>
                                )
                            })}
                            <option></option>
                        </select>
                    </div>
                </div>
                <div>
                    <button onClick={() => setIsInviteModalOpen(true)}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >+ Invite Member</button>
                    {isInviteModalOpen && <InviteMemberModal onClose={() => setIsInviteModalOpen(false)} onSuccess={fetchMembers} />}
                </div>
            </div>
            <div>
                {members && members.length > 0 ?
                    <table className="border w-full border-gray-300 rounded-3xl bg-white shadow-xs">
                        <thead>
                            <tr className="border-b border-gray-300 bg-gray-200 h-10 font-semibold text-center text-sm">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {members.map((member) => {
                                return (
                                    <tr key={member.id} className="border-b border-gray-200 hover:bg-slate-50 transition">

                                        <td className="text-center font-semibold text-slate-900 text-sm">{member.name}</td>
                                        <td className="text-center text-slate-700 text-sm">{member.email}</td>
                                        <td className="text-center text-slate-600 text-sm max-w-xs truncate">{member.role}</td>
                                        <td className="text-center text-slate-600 text-sm max-w-xs truncate">{member.status}</td>
                                        <td className="text-center text-slate-600 text-sm max-w-xs truncate">{member.joinedAt}</td>

                                        <td className="relative">
                                            <div className="flex gap-1.5 justify-center items-center py-2">
                                                <button onClick={() => setOpenMenuMemberId(openMenuMemberId === member.id ? null : member.id)}>
                                                    <EllipsisVertical size={24} className="text-gray-800" />
                                                </button>
                                            </div>
                                            {openMenuMemberId === member.id && (
                                                <MemberActionsMenu onClose={() => setOpenMenuMemberId(null)} member={member} onSuccess={fetchMembers} />
                                            )}
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    : (
                        <div className="flex justify-center">
                            <h3>No Team Members yet</h3>
                            <p>Invite your team Members to start collaborating</p>
                            <button onClick={() => setIsInviteModalOpen(true)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                            >+ Invite Member</button>
                            {isInviteModalOpen && <InviteMemberModal onClose={() => setIsInviteModalOpen(false)} onSuccess={fetchMembers} />}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default TeamMembers