import { useEffect, useRef, useState } from "react";
import ArchiveProjectModal from "./ArchiveProjectModal";
import ManageMembersModal from "./ManageMembersModal";
import EditProjectModal from "./EditProjectModal";
import ProjectDetailsModal from "./ProjectDetailsModal";
import type { Project } from "../../../types/projectTypes";
import { editProject } from "../../../services/projectService";
import toast from "react-hot-toast";
import { Eye, Pencil, Users, Archive, RotateCcw } from "lucide-react";

function ProjectActionMenu({ onClose, project, onSuccess }: { onClose: () => void; project: Project; onSuccess: () => void }) {
    const [projectDetailsOpen, setProjectDetailsOpen] = useState<boolean>(false);
    const [editProjectOpen, setEditProjectOpen] = useState<boolean>(false);
    const [manageMembersOpen, setManageMembersOpen] = useState<boolean>(false);
    const [archiveProjectOpen, setArchiveProjectOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    async function handleUnarchive() {
        try {
            await editProject(project.id, { status: "ACTIVE" });
            toast.success("Project restored successfully");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to restore project");
        }
    }

    return (
        <>
            <div
                ref={menuRef}
                className="absolute right-0 top-full mt-1.5 z-30 w-44 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 text-xs animate-in fade-in zoom-in-95 duration-150"
            >
                <button
                    type="button"
                    onClick={() => setProjectDetailsOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <Eye size={14} className="text-slate-400" />
                    <span>View Details</span>
                </button>

                <button
                    type="button"
                    onClick={() => setEditProjectOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <Pencil size={14} className="text-slate-400" />
                    <span>Edit Project</span>
                </button>

                <button
                    type="button"
                    onClick={() => setManageMembersOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <Users size={14} className="text-slate-400" />
                    <span>Manage Members</span>
                </button>

                <div className="h-px bg-slate-100 my-0.5" />

                {project.status === "ARCHIVED" ? (
                    <button
                        type="button"
                        onClick={handleUnarchive}
                        className="w-full flex items-center gap-2 px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer text-left font-medium"
                    >
                        <RotateCcw size={14} />
                        <span>Restore Project</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setArchiveProjectOpen(true)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer text-left font-medium"
                    >
                        <Archive size={14} />
                        <span>Archive Project</span>
                    </button>
                )}
            </div>

            {projectDetailsOpen && (
                <ProjectDetailsModal
                    onClose={() => setProjectDetailsOpen(false)}
                    project={project}
                    editProject={() => setEditProjectOpen(true)}
                />
            )}
            {editProjectOpen && (
                <EditProjectModal
                    onClose={() => setEditProjectOpen(false)}
                    project={project}
                    onSuccess={onSuccess}
                />
            )}
            {manageMembersOpen && (
                <ManageMembersModal
                    onClose={() => setManageMembersOpen(false)}
                    project={project}
                    onSuccess={onSuccess}
                />
            )}
            {archiveProjectOpen && (
                <ArchiveProjectModal
                    onClose={() => setArchiveProjectOpen(false)}
                    project={project}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}

export default ProjectActionMenu;