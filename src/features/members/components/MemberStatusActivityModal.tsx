import { X, Ban, UserCheck, AlertTriangle, Loader2 } from "lucide-react";
import type { Member, UserStatus } from "../../../types/memberTypes";
import { userStatus } from "../../../services/memberService";
import toast from "react-hot-toast";
import { useState } from "react";

function MemberStatusActivityModal({
    onClose,
    member,
    status,
    onSuccess
}: {
    onClose: () => void;
    member: Member;
    status: UserStatus;
    onSuccess: () => void;
}) {
    const id = member?.id;
    const isDeactivating = status === "INACTIVE";
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit() {
        try {
            setIsSubmitting(true);
            await userStatus(id, status);
            toast.success(`Member successfully ${isDeactivating ? "deactivated" : "reactivated"}`);
            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update member status");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0 mt-0.5 ${
                                isDeactivating
                                    ? "bg-rose-50 border border-rose-200/80 text-rose-600"
                                    : "bg-emerald-50 border border-emerald-200/80 text-emerald-600"
                            }`}
                        >
                            {isDeactivating ? <Ban size={20} /> : <UserCheck size={20} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                {isDeactivating ? "Deactivate Account" : "Reactivate Account"}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Modify active workspace status for this team member
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

                {/* Member Preview Card */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-slate-900">{member.name}</h4>
                            <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                        {member.role}
                    </span>
                </div>

                {/* Confirmation Description */}
                <div
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed ${
                        isDeactivating
                            ? "bg-rose-50/80 border-rose-200/60 text-rose-800"
                            : "bg-emerald-50/80 border-emerald-200/60 text-emerald-800"
                    }`}
                >
                    <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                    <span>
                        {isDeactivating
                            ? "This member will lose access to active projects and cannot create or update tasks until reactivated."
                            : "This member will regain access to workspace projects and be able to resume collaborative tasks."}
                    </span>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
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
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className={`px-6 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2 ${
                            isDeactivating
                                ? "bg-rose-600 hover:bg-rose-700 active:scale-98 shadow-rose-600/20"
                                : "bg-emerald-600 hover:bg-emerald-700 active:scale-98 shadow-emerald-600/20"
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <span>{isDeactivating ? "Deactivate Member" : "Reactivate Member"}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemberStatusActivityModal;