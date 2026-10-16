import type { Member } from "../../../types/memberTypes"
import { X, User, Pencil } from "lucide-react"
import EditMemberModal from "./EditMemberModal";
import { useState } from "react";
type TabType = "profile" | "access" | "activity";
function MemberProfileModal({ onClose, member, onSuccess }: { onClose: () => void, member: Member, onSuccess: () => void }) {
    const [activeTab, setActiveTab] = useState<TabType>("profile")
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">View Profile</h3>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <User size={30} className="flex flex-gray-200 rounded-full" />
                            <div className="flex flex-col">
                                <h2 className="font-semibold">{member.name}</h2>
                                <p className="text-gray-500">{member.email}</p>
                            </div>
                            <div></div>
                        </div>
                        <div className="relative flex flex-row space-y-2">
                            <Pencil size={18} className="absolute top-3 left-1 text-white" />
                            <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                                onClick={() => setIsEditModalOpen(true)}
                            >Edit Member</button>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 gap-8 text-sm">
                        <button type="button" onClick={() => setActiveTab("profile")} className={`pb-2.5 font-medium transition-colors relative cursor-pointer ${activeTab === "profile"
                            ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}>Profile</button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("access")}
                            className={`pb-2.5 font-medium transition-colors relative cursor-pointer ${activeTab === "access"
                                ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Access & Roles
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("activity")}
                            className={`pb-2.5 font-medium transition-colors relative cursor-pointer ${activeTab === "activity"
                                ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Activity
                        </button>

                    </div>
                    <div>
                        {activeTab === "profile" && (
                            <div className="flex flex-col border border-slate-200/80 rounded-2xl p-5 bg-white space-y-4">
                                <h4 className="font-semibold text-sm text-slate-900">Personal Information</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Full Name</span>
                                        <p className="text-sm font-medium text-slate-800">{member.name}</p>
                                    </div>
                                    {/* Email */}
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Email</span>
                                        <p className="text-sm font-medium text-slate-800 truncate" title={member.email}>
                                            {member.email}
                                        </p>
                                    </div>
                                    {/* Role */}
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Role</span>
                                        <div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 capitalize">
                                                {member.role?.toLowerCase()}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Status */}
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Status</span>
                                        <div>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 capitalize">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                                {member.status?.toLowerCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-gray-400 font-medium">Joined At</span>
                                        <p className="text-sm font-medium text-slate-800 truncate" title={member.email}>
                                            {member.joinedAt}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )}
                        {activeTab === "access" && (
                            <div className="text-sm text-gray-500 p-4">
                                Access and role management settings will appear here.
                            </div>
                        )}
                        {activeTab === "activity" && (
                            <div className="text-sm text-gray-500 p-4">
                                Recent activity logs will appear here.
                            </div>
                        )}
                    </div>
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
    )

}
export default MemberProfileModal