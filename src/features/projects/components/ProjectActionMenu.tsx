import { useEffect, useRef, useState } from "react"
import ArchiveProjectModal from "./ArchiveProjectModal";
import ManageMembersModal from "./ManageMembersModal";
import EditProjectModal from "./EditProjectModal";
import ProjectDetailsModal from "./ProjectDetailsModal"
import type { Project } from "../../../types/projectTypes";
import { editProject } from "../../../services/projectService";
import toast from "react-hot-toast";


function ProjectActionMenu({ onClose, project, onSuccess }: { onClose: () => void, project: Project, onSuccess: () => void }) {
    const [projectDetailsOpen, setProjectDetailsOpen] = useState<boolean>(false)
    const [editProjectOpen, setEditProjectOpen] = useState<boolean>(false)
    const [manageMembersOpen, setManageMembersOpen] = useState<boolean>(false)
    const [archiveProjectOpen, setArchiveProjectOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If click was outside this menu, close it
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        // Listen for clicks on the whole page
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up listener when menu unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    async function handleUnarchive() {
        try {
            await editProject(project.id, { status: "ACTIVE" });
            toast.success("Project restored successfully");
            onSuccess();
            onClose();
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to restore project");
        }

    }
    return (

        <div ref={menuRef} className="absolute right-0 top-full mt-1 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-xs">
            <button type="button" onClick={() => setProjectDetailsOpen(true)} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer">View Details</button>
            <button type="button" onClick={() => setEditProjectOpen(true)}

                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer">Edit Project</button>
            <button type="button" onClick={() => setManageMembersOpen(true)} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer">Manage Members</button>
            {project.status === "ARCHIVED" ? <button onClick={handleUnarchive}>
                Restore Project
            </button>
                : <button type="button" onClick={() => setArchiveProjectOpen(true)} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer">Archive Project</button>
            }
            {projectDetailsOpen && <ProjectDetailsModal onClose={() => setProjectDetailsOpen(false)} project={project} editProject={() => setEditProjectOpen(true)} />}
            {editProjectOpen && <EditProjectModal onClose={() => setEditProjectOpen(false)} project={project} onSuccess={onSuccess} />}
            {manageMembersOpen && <ManageMembersModal onClose={() => setManageMembersOpen(false)} project={project} onSuccess={onSuccess} />}
            {archiveProjectOpen && <ArchiveProjectModal onClose={() => setArchiveProjectOpen(false)} project={project} onSuccess={onSuccess} />}
        </div>


    )
}
export default ProjectActionMenu;