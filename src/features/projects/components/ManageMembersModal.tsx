import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, UserPlus, Trash2, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Project } from "../../../types/projectTypes";
import { addMemberSchema } from "../../../schemas/projects/projectSchema"
import {
    getProjectMembers,
    addProjectMember,
    updateProjectMemberRole,
    removeProjectMember,
    type ProjectMember
} from "../../../services/projectService";



type AddMemberFormData = z.infer<typeof addMemberSchema>;

interface ManageMembersModalProps {
    onClose: () => void;
    project: Project;
    onSuccess?: () => void;
}

function ManageMembersModal({ onClose, project, onSuccess }: ManageMembersModalProps) {
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isInviting, setIsInviting] = useState<boolean>(false);
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [removingUserId, setRemovingUserId] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<AddMemberFormData>({
        resolver: zodResolver(addMemberSchema),
        defaultValues: {
            email: "",
            role: "MEMBER",
        },
    });

    const fetchMembers = async () => {
        if (!project?.id) return;
        try {
            const response = await getProjectMembers(project.id);
            setMembers(Array.isArray(response?.data) ? response.data : []);
            console.log("members is", response?.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to load project members");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [project?.id]);

    const handleAddMember = async (data: AddMemberFormData) => {
        setIsInviting(true);
        try {
            await addProjectMember(project.id, {
                email: data.email.trim().toLowerCase(),
                role: data.role,
            });
            toast.success("Member added to project successfully");
            reset();
            await fetchMembers();
            onSuccess?.();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to add member to project");
        } finally {
            setIsInviting(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        setUpdatingUserId(userId);
        try {
            await updateProjectMemberRole(project.id, userId, newRole);
            toast.success("Member role updated");
            await fetchMembers();
            onSuccess?.();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update role");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleRemoveMember = async (userId: string, memberName: string) => {
        if (!window.confirm(`Are you sure you want to remove ${memberName} from this project?`)) {
            return;
        }
        setRemovingUserId(userId);
        try {
            await removeProjectMember(project.id, userId);
            toast.success(`${memberName} removed from project`);
            await fetchMembers();
            onSuccess?.();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to remove member");
        } finally {
            setRemovingUserId(null);
        }
    };

    const getInitials = (name?: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-150 max-h-[90vh]">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-slate-900 text-lg">Manage Members</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                {members.length} {members.length === 1 ? "Member" : "Members"}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">
                            Manage collaborators and their access roles for <strong className="text-slate-700">{project.name}</strong>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 transition cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Invite Form using React Hook Form & Zod */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <UserPlus size={14} className="text-blue-600" />
                        Invite New Member
                    </label>
                    <form onSubmit={handleSubmit(handleAddMember)} className="flex flex-col gap-1.5">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter colleague's email..."
                                {...register("email")}
                                disabled={isInviting}
                                className={`flex-1 px-3 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 transition disabled:opacity-60 ${errors.email
                                    ? "border-red-400 focus:ring-red-400"
                                    : "border-slate-300 focus:ring-blue-500 focus:border-transparent"
                                    }`}
                            />
                            <select
                                {...register("role")}
                                disabled={isInviting}
                                className="px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-slate-700 cursor-pointer disabled:opacity-60"
                            >
                                <option value="MEMBER">Member</option>
                                <option value="MANAGER">Manager</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                            <button
                                type="submit"
                                disabled={isInviting}
                                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                                {isInviting ? <Loader2 size={14} className="animate-spin" /> : "+ Add"}
                            </button>
                        </div>
                        {errors.email && (
                            <span className="text-[11px] text-red-500 pl-1">{errors.email.message}</span>
                        )}
                        {errors.role && (
                            <span className="text-[11px] text-red-500 pl-1">{errors.role.message}</span>
                        )}
                    </form>
                </div>

                {/* Members List */}
                <div className="flex flex-col gap-2 min-h-0 flex-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                            <Users size={14} className="text-slate-500" />
                            Project Collaborators
                        </span>
                    </div>

                    <div className="overflow-y-auto max-h-64 border border-slate-200 rounded-xl divide-y divide-slate-100 bg-slate-50/40">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-xs">
                                <Loader2 size={16} className="animate-spin text-blue-600" />
                                Loading project members...
                            </div>
                        ) : members.length === 0 ? (
                            <div className="py-8 text-center text-xs text-slate-400">
                                No members assigned to this project yet.
                            </div>
                        ) : (
                            members.map((member) => {

                                const user = member.user;
                                const userId = member.user?._id;
                                const isProjectOwner =
                                    (project.ownerId?.id || (project.ownerId as any)?._id || project.ownerId) === userId
                                const isUpdating = updatingUserId === userId;
                                const isRemoving = removingUserId === userId;

                                return (
                                    <div
                                        key={member.id || userId}
                                        className="flex items-center justify-between px-3.5 py-2.5 hover:bg-white transition bg-white/70"
                                    >
                                        {/* Avatar & User Details */}
                                        <div className="flex items-center gap-3 min-w-0 pr-2">
                                            {user?.avatar ? (
                                                <img
                                                    src={user?.avatar}
                                                    alt={user?.name || "User"}
                                                    className="w-8 h-8 rounded-full border border-slate-200 object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center shrink-0">
                                                    {getInitials(user?.name)}
                                                </div>
                                            )}
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-semibold text-slate-900 truncate">
                                                    {user?.name || "Unknown Member"}
                                                </span>
                                                <span className="text-[11px] text-slate-500 truncate">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions: Role Selector & Delete */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            {isUpdating ? (
                                                <Loader2 size={14} className="animate-spin text-blue-600 mx-2" />
                                            ) : (
                                                <select
                                                    value={member.role}
                                                    onChange={(e) => userId && handleRoleChange(userId, e.target.value)}
                                                    className="px-2 py-1 text-[11px] font-medium border border-slate-300 rounded-lg bg-white text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                                                >
                                                    <option value="MEMBER">Member</option>
                                                    <option value="MANAGER">Manager</option>
                                                    <option value="ADMIN">Admin</option>
                                                </select>
                                            )}
                                            {!isProjectOwner ? (
                                                <button
                                                    type="button"
                                                    onClick={() => userId && handleRemoveMember(userId, user?.name)}
                                                    disabled={isRemoving}
                                                    title="Remove member from project"
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                                >
                                                    {isRemoving ? <Loader2 size={14} className="animate-spin text-red-600" /> : <Trash2 size={14} />}
                                                </button>
                                            ) : (
                                                <span className="text-[10px] font-medium text-slate-400 px-2 py-0.5 bg-slate-100 rounded-md">
                                                    Owner
                                                </span>
                                            )}


                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageMembersModal;