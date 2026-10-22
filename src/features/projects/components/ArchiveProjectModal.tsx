import type { Project } from "../../../types/projectTypes";
import { X, Archive, AlertTriangle, Users, CheckSquare, Loader2 } from "lucide-react";
import { archieveProject } from "../../../services/projectService";
import { toast } from "react-hot-toast";
import { useState } from "react";

function ArchiveProjectModal({
    onClose,
    onSuccess,
    project
}: {
    onClose: () => void;
    onSuccess: () => void;
    project: Project;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const id = project.id;

    async function handleArchive() {
        try {
            setIsSubmitting(true);
            await archieveProject(id);
            toast.success("Project archived successfully");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update project");
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
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs shrink-0 mt-0.5">
                            <Archive size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Archive Project?</h3>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                Are you sure you want to archive <span className="font-semibold text-slate-700">"{project.name}"</span>?
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

                {/* Project Summary Preview */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-slate-800">{project.name}</h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {project.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <Users size={13} className="text-slate-400" />
                            <span>{project.memberCount || 0} team members</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckSquare size={13} className="text-slate-400" />
                            <span>{project.taskCount || 0} tasks</span>
                        </div>
                    </div>
                </div>

                {/* Warning Note */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-800 leading-relaxed">
                    <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>
                        This project will become read-only and hidden from active boards. You can restore it at any time.
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
                        onClick={handleArchive}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-amber-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Archiving...</span>
                            </>
                        ) : (
                            <span>Archive Project</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArchiveProjectModal;