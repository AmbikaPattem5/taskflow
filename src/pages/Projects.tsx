import { useState, useEffect, useRef } from "react";
import CreateProjectModal from "../features/projects/components/CreateProjectModal";
import type { Project } from "../types/projectTypes"
import { getAllProjects, editProject } from "../services/projectService"
import toast from "react-hot-toast"
import { Calendar, EllipsisVertical } from "lucide-react"
import ProjectActionMenu from "../features/projects/components/ProjectActionMenu";

function Projects() {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false)
    const [projects, setProjects] = useState<Project[]>([]);
    const [openMenuProjectId, setOpenMenuProjectId] = useState<string | null>(null)
    async function fetchProjects() {
        try {
            const response = await getAllProjects();
            setProjects(response.data)
            console.log(response)
        }
        catch (error) {
            toast.error(error?.response?.message)
        }
    }
    useEffect(() => {
        fetchProjects()

    }, [])
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="font-bold">Projects</h1>
                    <p className="text-sm text-gray-400 ">Manage and track all your workspace projects</p>
                </div>
                <div>
                    <button onClick={() => setIsCreateProjectModalOpen(true)}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                    >+ Create Project</button>
                    {isCreateProjectModalOpen && <CreateProjectModal onClose={() => setIsCreateProjectModalOpen(false)} />}
                </div>
            </div>
            {/* <div>
                 <div className="flex flex-row gap-2">
                    <div>
                        <input type="text" name="search" className="border border-gray-400 h-7 w-full max-w-xs rounded" value={search} onChange={handleChange} />
                    </div>
                    <div>
                        <select className="border border-gray-400 h-7 w-full w-max-xs rounded" name="role" value={role} onChange={handleChange}>
                            <option value="">All Roles</option>
                            {Object.entries(Role).map(([key, value]) => {
                                return (
                                    <option key={key} value={value}>{value}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <select name="status" className="border border-gray-400 h-7 w-full w-max-xs rounded" value={status} onChange={handleChange}>
                            <option value="">Select Status</option>
                            {Object.entries(Status).map(([key, value]) => {
                                return (
                                    <option key={key}>{value}</option>

                                )
                            })}
                            <option></option>
                        </select>
                    </div>
                </div>
            </div> */}
            <div className="w-full grid grid-cols-3 gap-6 m-3">
                {projects.map(project => {
                    return (
                        <div className="flex flex-col gap-1 border border-gray-300 rounded-xl p-2 ">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-sm font-semibold">{project.name}</h2>
                                <div className="relative">
                                    <button onClick={() => { setOpenMenuProjectId(openMenuProjectId === project.id ? null : project.id) }}>
                                        <EllipsisVertical size={16} />
                                    </button>
                                    {openMenuProjectId === project.id && <ProjectActionMenu onClose={() => setOpenMenuProjectId(null)} />}

                                </div>

                            </div>

                            <div className="flex flex-row gap-2">
                                <p className="text-xs">Status:<span className="text-xs p-0.5 border border-slate-200 bg-teal-200 rounded-xl">{project.status}</span></p>
                                <p className="text-xs">Priority:<span className="text-xs p-0.5 border border-slate-200 bg-orange-200 rounded-xl">{project.priority}</span></p>

                            </div>
                            <div className="flex flex-row gap-1">
                                <Calendar size={14} />
                                <span className="text-sm">{project.createdAt}</span>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Projects