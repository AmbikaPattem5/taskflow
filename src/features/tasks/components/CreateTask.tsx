import { X, Loader2, Calendar, User, FolderKanban, AlertCircle } from "lucide-react";
import type { Project } from "../../../types/projectTypes";
import type { Status, Priority } from "../../../types/taskTypes";
import { useState, useEffect } from "react";
import type { TaskPayload } from "../../../types/taskTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../../../schemas/tasks/taskSchema";
import { getAllProjects } from "../../../services/projectService";
import { getMembers } from "../../../services/memberService";
import type { Member } from "../../../types/memberTypes";
import { createNewtask } from "../../../services/taskService";
import toast from "react-hot-toast";

function CreateTask({ onClose }: { onClose: () => void }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function fetchProjectsAndMembersData() {
        try {
            const response = await getAllProjects();
            setProjects(Array.isArray(response?.data) ? response.data : []);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to fetch projects");
        }
        try {
            const response = await getMembers("", "", "");
            setMembers(Array.isArray(response?.data) ? response.data : []);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to fetch members");
        }
    }

    useEffect(() => {
        fetchProjectsAndMembersData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskPayload>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            project: "",
            description: "",
            status: "TODO",
            priority: "MEDIUM",
            assignee: "",
            dueDate: "",
        }
    });

    const STATUS_OPTIONS: { label: string; value: Status }[] = [
        { label: "To Do", value: "TODO" },
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "In Review", value: "IN_REVIEW" },
        { label: "Done", value: "DONE" },
    ];

    const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
        { label: "Low", value: "LOW" },
        { label: "Medium", value: "MEDIUM" },
        { label: "High", value: "HIGH" },
        { label: "Urgent", value: "URGENT" },
    ];

    async function onSubmit(data: TaskPayload) {
        try {
            setIsSubmitting(true);
            const response = await createNewtask(data);
            toast.success(response?.message || "Task created successfully");
            onClose();
        } catch (error: any) {
            console.error("Failed to create task:", error);
            const errorMsg = error?.response?.data?.errors?.[0]?.message
                || error?.response?.data?.message
                || error?.message
                || "Failed to create task";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-7 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Create New Task</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Fill in the details to assign and schedule a new task
                        </p>
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

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Task Title */}
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Task Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Design authentication workflow"
                            {...register("title")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        />
                        {errors.title && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Project */}
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                            <FolderKanban size={13} className="text-slate-400" />
                            <span>Project <span className="text-rose-500">*</span></span>
                        </label>
                        <select
                            {...register("project")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                        >
                            <option value="">Select a Project</option>
                            {projects.map((proj) => (
                                <option key={proj.id} value={proj.id}>
                                    {proj.name}
                                </option>
                            ))}
                        </select>
                        {errors.project && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.project.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Add task description, acceptance criteria, or notes..."
                            {...register("description")}
                            className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                        />
                        {errors.description && (
                            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Status & Priority Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                Status
                            </label>
                            <select
                                {...register("status")}
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                            >
                                {STATUS_OPTIONS.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.status && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                Priority
                            </label>
                            <select
                                {...register("priority")}
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                            >
                                {PRIORITY_OPTIONS.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            {errors.priority && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Assignee & Due Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                                <User size={13} className="text-slate-400" />
                                <span>Assignee <span className="text-rose-500">*</span></span>
                            </label>
                            <select
                                {...register("assignee")}
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                            >
                                <option value="">Select Assignee</option>
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            {errors.assignee && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.assignee.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                                <Calendar size={13} className="text-slate-400" />
                                <span>Due Date</span>
                            </label>
                            <input
                                type="date"
                                {...register("dueDate")}
                                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                            />
                            {errors.dueDate && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.dueDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer disabled:opacity-60"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <span>Create Task</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;