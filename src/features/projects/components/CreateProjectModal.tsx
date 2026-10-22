import { X, Loader2, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CreateProjectPayload } from "../../../types/projectTypes";
import { createProjectSchema } from "../../../schemas/projects/projectSchema";
import AssignMembersSelect from "./AssignMembersSelect";
import type { ProjectPriority } from "../../../types/projectTypes";
import { createProject } from "../../../services/projectService";
import toast from "react-hot-toast";

function CreateProjectModal({ onClose }: { onClose: () => void }) {
    const [assignedMemberIds, setAssignedMemberIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<CreateProjectPayload>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            priority: "MEDIUM",
            status: "ACTIVE"
        }
    });

    const onSubmit = async (data: CreateProjectPayload) => {
        try {
            setIsSubmitting(true);
            await createProject(data);
            toast.success("Project created successfully");
            onClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPriority = watch("priority") || "MEDIUM";
    const priorities: ProjectPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-7 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Create New Project</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Set up project details, timeline, and team assignments
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Left Column: Name & Description */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Project Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Mobile App Redesign"
                                    {...register("name")}
                                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                />
                                {errors.name && (
                                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                        <AlertCircle size={12} />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Brief overview of project scope and objectives..."
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
                        </div>

                        {/* Right Column: Status, Priority & Dates */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Status
                                </label>
                                <select
                                    {...register("status")}
                                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="ARCHIVED">Archived</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Priority Level
                                </label>
                                <div className="grid grid-cols-4 bg-slate-100 p-1 rounded-xl gap-1">
                                    {priorities.map((item) => {
                                        const isSelected = selectedPriority === item;
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => setValue("priority", item)}
                                                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                                                    isSelected
                                                        ? "bg-blue-600 text-white shadow-xs"
                                                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/60"
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Project Timeline
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div>
                                        <span className="text-[11px] text-slate-400 block mb-1">Start Date</span>
                                        <input
                                            type="date"
                                            {...register("startDate")}
                                            className="w-full px-2.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[11px] text-slate-400 block mb-1">Due Date</span>
                                        <input
                                            type="date"
                                            {...register("dueDate")}
                                            className="w-full px-2.5 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Members Assignment */}
                    <div className="pt-2 border-t border-slate-100">
                        <AssignMembersSelect
                            selectedIds={assignedMemberIds}
                            onChange={setAssignedMemberIds}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer disabled:opacity-60"
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
                                <span>Create Project</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectModal;