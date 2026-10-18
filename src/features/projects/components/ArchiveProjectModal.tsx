import type { Project } from "../../../types/projectTypes"
import { X } from "lucide-react"
import { archieveProject } from "../../../services/projectService"
import { toast } from "react-hot-toast"
function ArchiveProjectModal({ onClose, onSuccess, project }: { onClose: () => void, onSuccess: () => void, project: Project }) {
    const id = project.id;
    async function handleArchive() {
        try {
            await archieveProject(id);
            onSuccess();
            onClose();
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update project")

        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold">Archive Project?</h3>
                        <p className="text-gray-600 text-sm">Are you sure you want to archive "{project.name}"? The Project will be hidden from your active projects list and become read-only. You can restore it at any time.</p>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-2 border border-gray-300 rounded-2xl p-2">
                        <h3 className="font-bold">{project.name}</h3>
                        <div className="flex flex-row gap-1">
                            <div className="flex flex-col border-r border-gray-400 p-1">
                                {project.memberCount} team members
                            </div>
                            <div className="flex flex-col p-1">
                                {project.taskCount} tasks
                            </div>
                        </div>

                    </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-4">

                    <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                    >Cancel</button>
                    <button type="button" onClick={handleArchive}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >Archive Project</button>
                </div>
            </div>
        </div>
    )

}
export default ArchiveProjectModal;