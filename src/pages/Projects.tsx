import { useState } from "react";
import CreateProjectModal from "../features/projects/components/CreateProjectModal";
function Projects() {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false)
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
        </div>
    )
}
export default Projects