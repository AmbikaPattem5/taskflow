import { useState, useEffect } from "react";
import CreateProjectModal from "../features/projects/components/CreateProjectModal";
import type { Project } from "../types/projectTypes";
import { getAllProjects } from "../services/projectService";
import toast from "react-hot-toast";
import { Calendar, EllipsisVertical, Plus, FolderKanban, Users, CheckSquare } from "lucide-react";
import ProjectActionMenu from "../features/projects/components/ProjectActionMenu";

function Projects() {
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [openMenuProjectId, setOpenMenuProjectId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchProjects() {
        try {
            setIsLoading(true);
            const response = await getAllProjects();
            setProjects(Array.isArray(response?.data) ? response.data : []);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const getStatusBadge = (status: string) => {
        const s = (status || "").toUpperCase();
        if (s === "ACTIVE") {
            return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
        }
        if (s === "ARCHIVED") {
            return "bg-slate-100 text-slate-600 border-slate-200";
        }
        if (s === "COMPLETED") {
            return "bg-blue-50 text-blue-700 border-blue-200/80";
        }
        return "bg-slate-50 text-slate-700 border-slate-200";
    };

    const getPriorityBadge = (priority: string) => {
        const p = (priority || "").toUpperCase();
        if (p === "URGENT" || p === "HIGH") {
            return "bg-rose-50 text-rose-700 border-rose-200/80";
        }
        if (p === "MEDIUM") {
            return "bg-amber-50 text-amber-700 border-amber-200/80";
        }
        return "bg-slate-50 text-slate-600 border-slate-200";
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "No date set";
        try {
            const d = new Date(dateString);
            if (isNaN(d.getTime())) return dateString;
            return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        } catch {
            return dateString;
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects</h1>
                        {!isLoading && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                                {projects.length} {projects.length === 1 ? "Project" : "Projects"}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage, track progress, and assign resources across all workspace projects
                    </p>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsCreateProjectModalOpen(true)}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Project</span>
                    </button>
                    {isCreateProjectModalOpen && (
                        <CreateProjectModal
                            onClose={() => {
                                setIsCreateProjectModalOpen(false);
                                fetchProjects();
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Loading Skeletons */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs animate-pulse space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                            </div>
                            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                            <div className="flex gap-2">
                                <div className="h-5 bg-slate-100 rounded-full w-16"></div>
                                <div className="h-5 bg-slate-100 rounded-full w-16"></div>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex justify-between">
                                <div className="h-4 bg-slate-100 rounded w-20"></div>
                                <div className="h-4 bg-slate-100 rounded w-20"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : projects.length === 0 ? (
                /* Empty State */
                <div className="min-h-[380px] bg-slate-50/60 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-xs">
                        <FolderKanban className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Projects Found</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                        Get started by creating your very first project to organize tasks and collaborate with team members.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsCreateProjectModalOpen(true)}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Project</span>
                    </button>
                </div>
            ) : (
                /* Projects Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
                        >
                            <div>
                                {/* Header: Icon, Name, and Menu */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                            {project.name?.charAt(0)?.toUpperCase() || "P"}
                                        </div>
                                        <div>
                                            <h2 className="text-base font-semibold text-slate-900 tracking-tight line-clamp-1">
                                                {project.name}
                                            </h2>
                                            {project.description && (
                                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                                    {project.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Menu */}
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setOpenMenuProjectId(openMenuProjectId === project.id ? null : project.id)}
                                            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                            aria-label="Project options"
                                        >
                                            <EllipsisVertical size={16} />
                                        </button>
                                        {openMenuProjectId === project.id && (
                                            <ProjectActionMenu
                                                onClose={() => setOpenMenuProjectId(null)}
                                                project={project}
                                                onSuccess={fetchProjects}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Status & Priority Badges */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityBadge(project.priority)}`}>
                                        {project.priority}
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer: Counters & Date */}
                            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 font-medium text-slate-600">
                                        <Users size={13} className="text-slate-400" />
                                        {project.memberCount || 0}
                                    </span>
                                    <span className="flex items-center gap-1 font-medium text-slate-600">
                                        <CheckSquare size={13} className="text-slate-400" />
                                        {project.taskCount || 0}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-400">
                                    <Calendar size={13} />
                                    <span>{formatDate(project.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Projects;