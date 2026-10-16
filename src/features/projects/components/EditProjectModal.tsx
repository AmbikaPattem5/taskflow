import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { createProjectSchema } from "../../../schemas/projects/createProjectSchema"
import type { Project, CreateProjectPayload, ProjectPriority } from "../../../types/projectTypes"
import { editProject } from "../../../services/projectService";
import { toast } from "react-hot-toast"

function EditProjectModal({ onClose, project, onSuccess }: { onClose: () => void, project: Project, onSuccess: () => void }) {
    const id: string = project?.id;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<CreateProjectPayload>(
        {
            resolver: zodResolver(createProjectSchema),
            defaultValues: {
                name: project?.name || "",
                description: project?.description || "",
                status: project?.status || "ACTIVE",
                priority: project?.priority || "MEDIUM",
                startDate: project?.startDate || "",
                dueDate: project?.dueDate || "",
                color: project?.color || "",
                icon: project?.icon || "",

            }
        }
    );
    const onSubmit = async (data: CreateProjectPayload) => {
        try {
            console.log(data);
            await editProject(id, data);
            toast.success("Project updated successfully")
            onSuccess();
            onClose();
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update project")
        }
    };
    const selectedPriority = watch("priority") || "MEDIUM";
    const priorities: ProjectPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">Edit Project</h3>
                        <p className="text-gray-600 text-sm">Update Project details,timeline, and team assignments</p>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <form>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label>Project Name</label>
                                <input type="text" {...register("name")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.name && <p className="text-sm text-red-300">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea {...register("description")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.description && <p className="text-sm text-red-300">{errors.description.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label>Status</label>
                                <select {...register("status")}
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                >
                                    <option value="">Select a status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="ARCHIVED">Archieved</option>
                                    <option value="COMPLETED">Completed</option>

                                </select>

                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Priority</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">

                                    {priorities.map((item) => {
                                        const isSelected = selectedPriority === item;
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => setValue("priority", item)}
                                                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${isSelected
                                                    ? "bg-blue-600 text-white shadow-xs"
                                                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/60"
                                                    }`}
                                            >{item}</button>
                                        )
                                    })}

                                </div>
                            </div>
                            <div>
                                Timeline(Start & Due Date)
                                <div className="flex flex-row">
                                    <div>
                                        <label>Start Date</label>
                                        <input type="date" {...register("startDate")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>
                                    <div>
                                        <label>Dua Date</label>
                                        <input type="date" {...register("dueDate")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="md:col-span-2">
                            <AssignMembersSelect selectedIds={assignedMemberIds}
                                onChange={setAssignedMemberIds} />
                        </div> */}
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">

                            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                            >Cancel</button>
                            <button type="button" onClick={handleSubmit(onSubmit)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"

                            >Update Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditProjectModal;