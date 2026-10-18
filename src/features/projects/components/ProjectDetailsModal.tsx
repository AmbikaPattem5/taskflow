import type { Project } from "../../../types/projectTypes"
import { X, Calendar } from "lucide-react"
function ProjectDetailsModal({ onClose, project, editProject }: { onClose: () => void, project: Project, editProject: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <div>
                            <h1 className="font-bold">{project.name}</h1>
                        </div>
                        <div className="flex flex-row gap-1">
                            <p className="text-emerald-700 bg-emerald-50 border-emerald-200 ">{project.status}</p>
                            <p className="text-purple-700 bg-purple-50 border-purple-200" >{project.priority}</p>
                        </div>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex flex-row gap-1">
                            <div className="flex flex-col p-2 m-2">
                                <p className="font-semibold">Project Description</p>
                                <p>{project.description}</p>
                            </div>
                            <div className="flex flex-col border border-gray-200 rounded-2xl p-2 m-2">
                                <p className="font-semibold">Project Owner</p>
                                <p>{project.name}</p>
                            </div>

                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="font-semibold">Timeline</h4>
                            <div className="flex flex-row">
                                <div className="flex flex-row border border-gray-200 rounded-2xl p-2 m-2">
                                    <Calendar size={14} />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">Start Date</p>
                                        <p>{project.startDate}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row border border-gray-200 rounded-2xl p-2 m-2">
                                    <Calendar size={14} />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">Due Date</p>
                                        <p>{project.dueDate}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div>Task Progress</div>
                    <div className="flex flex-row justify-between gap-1">
                        <h3>Team Members</h3>
                        <p>{project.memberCount}</p>
                    </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-4">

                    <button type="button" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                    >View Tasks</button>
                    <button type="button" onClick={editProject}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >Edit Project</button>
                </div>
            </div>
        </div>
    )

}
export default ProjectDetailsModal