import type { Project } from "../../../types/projectTypes";
import { X, Calendar, Users, CheckSquare, Pencil, FolderKanban } from "lucide-react";

function ProjectDetailsModal({
    onClose,
    project,
    editProject
}: {
    onClose: () => void;
    project: Project;
    editProject: () => void;
}) {
    const formatDate = (dateString?: string | null) => {
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
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 flex flex-col gap-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-xs shrink-0 mt-0.5">
                            <FolderKanban size={22} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">{project.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                                    {project.status}
                                </span>
                                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80">
                                    {project.priority}
                                </span>
                            </div>
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

                {/* Body Content */}
                <div className="space-y-4">
                    {/* Description */}
                    <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/60">
                        <span className="text-[11px] font-medium text-slate-400 block mb-1">Project Description</span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            {project.description || "No project description provided."}
                        </p>
                    </div>

                    {/* Timeline */}
                    <div>
                        <span className="text-xs font-semibold text-slate-700 block mb-2">Project Timeline</span>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200/60">
                                <Calendar size={16} className="text-blue-500 shrink-0" />
                                <div>
                                    <span className="text-[11px] text-slate-400 block">Start Date</span>
                                    <span className="text-xs font-semibold text-slate-800">{formatDate(project.startDate)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200/60">
                                <Calendar size={16} className="text-blue-500 shrink-0" />
                                <div>
                                    <span className="text-[11px] text-slate-400 block">Due Date</span>
                                    <span className="text-xs font-semibold text-slate-800">{formatDate(project.dueDate)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/40 border border-blue-100">
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-blue-600" />
                                <span className="text-xs font-medium text-slate-700">Team Members</span>
                            </div>
                            <span className="text-sm font-bold text-blue-700">{project.memberCount || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/40 border border-indigo-100">
                            <div className="flex items-center gap-2">
                                <CheckSquare size={16} className="text-indigo-600" />
                                <span className="text-xs font-medium text-slate-700">Total Tasks</span>
                            </div>
                            <span className="text-sm font-bold text-indigo-700">{project.taskCount || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            editProject();
                        }}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                        <Pencil size={14} />
                        <span>Edit Project</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetailsModal;