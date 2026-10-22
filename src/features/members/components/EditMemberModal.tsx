import { X, UserCheck, Loader2, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MembersPayload } from "../../../types/memberTypes";
import { inviteMemberSchema } from "../../../schemas/members/inviteMemberSchema";
import { editUserDetails } from "../../../services/memberService";
import type { Member } from "../../../types/memberTypes";
import toast from "react-hot-toast";
import { useState } from "react";

function EditMemberModal({ onClose, member, onSuccess }: { onClose: () => void; member: Member; onSuccess: () => void }) {
    const id: string = member?.id;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<MembersPayload>({
        resolver: zodResolver(inviteMemberSchema),
        defaultValues: {
            name: member?.name || "",
            email: member?.email || "",
            role: member?.role || "MEMBER",
        }
    });

    const onSubmit = async (data: MembersPayload) => {
        try {
            setIsSubmitting(true);
            await editUserDetails(id, data);
            toast.success("Member updated successfully");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update member");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs shrink-0 mt-0.5">
                            <UserCheck size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Edit Team Member</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Update profile details and workspace role assignment
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer"
                        aria-label="Close dialog"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        />
                        {errors.name && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        />
                        {errors.email && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Role Assignment
                        </label>
                        <select
                            {...register("role")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                        >
                            <option value="ADMIN">Admin (Full permissions)</option>
                            <option value="MANAGER">Manager (Projects & tasks)</option>
                            <option value="MEMBER">Member (Assigned work)</option>
                        </select>
                        {errors.role && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer disabled:opacity-60"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditMemberModal;