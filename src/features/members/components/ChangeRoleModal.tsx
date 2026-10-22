import { X, ShieldCheck, Loader2 } from "lucide-react";
import type { UserRole, Member } from "../../../types/memberTypes";
import { updateUserRole } from "../../../services/memberService";
import { useState } from "react";
import toast from "react-hot-toast";

function ChangeRoleModal({ onClose, member, onSuccess }: { onClose: () => void; member: Member; onSuccess: () => void }) {
    const [role, setRole] = useState<UserRole | string>(member?.role || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const id = member?.id;

    async function onSubmit(id: string, role: string) {
        if (!id || !role) {
            toast.error("Please select a role");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateUserRole(id, role);
            toast.success("Role updated successfully");
            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update role");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200 text-left">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs shrink-0 mt-0.5">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Change Member Role</h3>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                Update the role for <span className="font-semibold text-slate-700">{member?.name}</span> to change their workspace permissions.
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

                {/* Body */}
                <div className="space-y-4 text-left">
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5 text-left">
                            Select New Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                        >
                            <option value="">Select a role</option>
                            <option value="ADMIN">Admin (Full workspace access)</option>
                            <option value="MANAGER">Manager (Manage projects and tasks)</option>
                            <option value="MEMBER">Member (Assigned tasks only)</option>
                        </select>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500 leading-normal">
                        Role changes take effect immediately for the user during their active workspace session.
                    </div>
                </div>

                {/* Footer inside modal dialog */}
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
                        type="button"
                        onClick={() => onSubmit(id, role)}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Updating...</span>
                            </>
                        ) : (
                            <span>Update Role</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangeRoleModal;