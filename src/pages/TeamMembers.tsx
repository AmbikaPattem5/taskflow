import InviteMemberModal from "../features/members/components/InviteMemberModal";
import { useState, useEffect } from "react";
import type { UserRole, UserStatus, Member } from "../types/memberTypes";
import { EllipsisVertical, Search, UserPlus, Users, CheckCircle2, XCircle } from 'lucide-react';
import toast from "react-hot-toast";
import { getMembers } from "../services/memberService";
import MemberActionsMenu from "../features/members/components/MemberActionsMenu";

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
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [role, setRole] = useState<UserRole | string>("");
    const [status, setStatus] = useState<UserStatus | string>("");
    const [members, setMembers] = useState<Member[]>([]);
    const [openMenuMemberId, setOpenMenuMemberId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = e.target;
        if (name === "role") {
            setRole(value);
        } else if (name === "search") {
            setSearch(value);
        } else {
            setStatus(value);
        }
    }

    const fetchMembers = async () => {
        try {
            setIsLoading(true);
            const response = await getMembers(status, role, search);
            setMembers(Array.isArray(response?.data) ? response.data : []);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to fetch team members");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [status, role, search]);

    const getRoleBadge = (r: string) => {
        const roleUpper = (r || "").toUpperCase();
        if (roleUpper === "ADMIN") {
            return "bg-purple-50 text-purple-700 border-purple-200/80";
        }
        if (roleUpper === "MANAGER") {
            return "bg-blue-50 text-blue-700 border-blue-200/80";
        }
        return "bg-slate-50 text-slate-700 border-slate-200";
    };

    const getStatusBadge = (s: string) => {
        const statusUpper = (s || "").toUpperCase();
        if (statusUpper === "ACTIVE") {
            return {
                classes: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
                icon: <CheckCircle2 size={12} className="text-emerald-500" />
            };
        }
        return {
            classes: "bg-slate-100 text-slate-600 border-slate-200",
            icon: <XCircle size={12} className="text-slate-400" />
        };
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "—";
        try {
            const d = new Date(dateString);
            if (isNaN(d.getTime())) return dateString;
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members</h1>
                        {!isLoading && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                                {members.length} {members.length === 1 ? "Member" : "Members"}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your team roster, roles, and workspace invitations
                    </p>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsInviteModalOpen(true)}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Invite Member</span>
                    </button>
                    {isInviteModalOpen && (
                        <InviteMemberModal
                            onClose={() => setIsInviteModalOpen(false)}
                            onSuccess={fetchMembers}
                        />
                    )}
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search members by name or email..."
                        value={search}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                    <div className="relative flex-1 md:w-44">
                        <select
                            name="role"
                            value={role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                        >
                            <option value="">All Roles</option>
                            {Object.entries(Role).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative flex-1 md:w-44">
                        <select
                            name="status"
                            value={status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                        >
                            <option value="">All Status</option>
                            {Object.entries(Status).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div>
                {isLoading ? (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs animate-pulse space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                                <div className="flex items-center gap-3 w-1/3">
                                    <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
                                    <div className="space-y-1.5 flex-1">
                                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="h-5 bg-slate-100 rounded w-20"></div>
                                <div className="h-5 bg-slate-100 rounded w-20"></div>
                                <div className="h-4 bg-slate-100 rounded w-24"></div>
                                <div className="h-6 w-6 bg-slate-100 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : members && members.length > 0 ? (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200/80 bg-slate-50/60 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                                    <th className="py-3.5 px-5 text-left">Member</th>
                                    <th className="py-3.5 px-5 text-left">Email</th>
                                    <th className="py-3.5 px-5 text-left">Role</th>
                                    <th className="py-3.5 px-5 text-left">Status</th>
                                    <th className="py-3.5 px-5 text-left">Joined Date</th>
                                    <th className="py-3.5 px-5 text-left w-24">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {members.map((member) => {
                                    const statusMeta = getStatusBadge(member.status);
                                    return (
                                        <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                                            {/* Name with Avatar */}
                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
                                                        {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 tracking-tight">
                                                            {member.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="py-3.5 px-5 text-slate-600 text-xs sm:text-sm">
                                                {member.email}
                                            </td>

                                            {/* Role */}
                                            <td className="py-3.5 px-5">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadge(member.role)}`}>
                                                    {member.role}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="py-3.5 px-5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusMeta.classes}`}>
                                                    {statusMeta.icon}
                                                    <span>{member.status}</span>
                                                </span>
                                            </td>

                                            {/* Joined Date */}
                                            <td className="py-3.5 px-5 text-slate-500 text-xs">
                                                {formatDate(member.joinedAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-5 text-left relative w-24">
                                                <div className="flex justify-start items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenMenuMemberId(openMenuMemberId === member.id ? null : member.id)}
                                                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                                        aria-label="Member options"
                                                    >
                                                        <EllipsisVertical size={16} />
                                                    </button>
                                                </div>
                                                {openMenuMemberId === member.id && (
                                                    <MemberActionsMenu
                                                        onClose={() => setOpenMenuMemberId(null)}
                                                        member={member}
                                                        onSuccess={fetchMembers}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Centered Empty State */
                    <div className="min-h-[380px] bg-slate-50/60 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Team Members Found</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                            {search || role || status
                                ? "No team members matched your active search or filter criteria."
                                : "Invite team members to start collaborating on projects and tasks."}
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsInviteModalOpen(true)}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Invite Member</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeamMembers;