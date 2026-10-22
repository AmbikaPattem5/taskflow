import type { Member } from "../../../types/memberTypes";
import { X, Pencil, Mail, Shield, CheckCircle2, Calendar } from "lucide-react";
import EditMemberModal from "./EditMemberModal";
import { useState } from "react";

type TabType = "profile" | "access" | "activity";

function MemberProfileModal({ onClose, member, onSuccess }: { onClose: () => void; member: Member; onSuccess: () => void }) {
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Member Profile</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            View details, assigned permissions, and activity status
                        </p>
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

                {/* Profile Card Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                            {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-900 tracking-tight">{member.name}</h2>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <Mail size={12} className="text-slate-400" />
                                {member.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(true)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-center"
                    >
                        <Pencil size={13} />
                        <span>Edit Member</span>
                    </button>
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab("profile")}
                            className={`pb-2.5 transition-colors relative cursor-pointer ${
                                activeTab === "profile"
                                    ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("access")}
                            className={`pb-2.5 transition-colors relative cursor-pointer ${
                                activeTab === "access"
                                    ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Access & Roles
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("activity")}
                            className={`pb-2.5 transition-colors relative cursor-pointer ${
                                activeTab === "activity"
                                    ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Activity
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="pt-4">
                        {activeTab === "profile" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/60">
                                        <span className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</span>
                                        <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/60">
                                        <span className="text-[11px] font-medium text-slate-400 block mb-1">Email Address</span>
                                        <p className="text-sm font-semibold text-slate-800 truncate" title={member.email}>
                                            {member.email}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/60">
                                        <span className="text-[11px] font-medium text-slate-400 block mb-1">Role Assignment</span>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
                                            <Shield size={11} />
                                            {member.role}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/60">
                                        <span className="text-[11px] font-medium text-slate-400 block mb-1">Account Status</span>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                            <CheckCircle2 size={11} className="text-emerald-500" />
                                            {member.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <Calendar size={13} className="text-slate-400" />
                                        Member Since
                                    </span>
                                    <span className="text-xs font-semibold text-slate-700">
                                        {formatDate(member.joinedAt)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {activeTab === "access" && (
                            <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-200/60 text-center text-xs text-slate-500">
                                <Shield className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="font-semibold text-slate-700">Role Permissions: {member.role}</p>
                                <p className="mt-1">
                                    Permissions are inherited from workspace defaults. Use "Change Role" to modify access levels.
                                </p>
                            </div>
                        )}

                        {activeTab === "activity" && (
                            <div className="p-6 bg-slate-50/50 rounded-xl border border-slate-200/60 text-center text-xs text-slate-500">
                                <p className="font-medium text-slate-700">No recent activity logs recorded</p>
                                <p className="mt-1">Member actions on tasks and projects will be displayed here.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>

            {isEditModalOpen && (
                <EditMemberModal
                    onClose={() => setIsEditModalOpen(false)}
                    member={member}
                    onSuccess={onSuccess}
                />
            )}
        </div>
    );
}

export default MemberProfileModal;