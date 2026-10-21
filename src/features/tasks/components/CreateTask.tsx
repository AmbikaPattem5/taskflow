import { X } from "lucide-react";
import type { Project } from "../../../types/projectTypes"
import type { Status, Priority } from "../../../types/taskTypes";
import { useState, useEffect } from "react";
import type { TaskPayload } from "../../../types/taskTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../../../schemas/tasks/taskSchema"
import { getAllProjects } from "../../../services/projectService"
import { getMembers } from "../../../services/memberService"
import type { Member } from "../../../types/memberTypes"


import toast from "react-hot-toast"

function CreateTask({ onClose }: { onClose: () => void }) {
    const [projects, setProjects] = useState<Project[]>([])
    const [members, setMembers] = useState<Member[]>([])

    async function fetchProjectsAndMembersData() {
        try {
            const response = await getAllProjects();
            setProjects(Array.isArray(response?.data) ? response.data : []);
            console.log(response)
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to fetch projects")
        }
        try {
            const response = await getMembers("", "", "");
            setMembers(Array.isArray(response?.data) ? response.data : []);
            console.log(response)
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to fetch projects")
        }
    }
    useEffect(() => {
        fetchProjectsAndMembersData();


    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskPayload>(
        { resolver: zodResolver(createTaskSchema) }
    );
    const STATUS_OPTIONS: { label: string; value: Status }[] = [
        { label: "To Do", value: "TODO" },
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "In Review", value: "IN_REVIEW" },
        { label: "Done", value: "DONE" },

    ]
    const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
        { label: "LOW", value: "LOW" },
        { label: "MEDIUM", value: "MEDIUM" },
        { label: "HIGH", value: "HIGH" },
        { label: "URGENT", value: "URGENT" },

    ]
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">Create New Task</h3>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <form>
                        <div>
                            <label>Task Title</label>
                            <input type="text" {...register("title")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                            {errors.title && <p className="text-sm text-red-300">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label>Project</label>
                            <select {...register("project")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                                <option value="">Select a Project</option>
                                {projects.map((proj) => (
                                    <option key={proj.id} value={proj.id}>
                                        {proj.name}
                                    </option>
                                ))}
                            </select>
                            {errors.project && <p className="text-sm text-red-500 mt-1">{errors.project.message}</p>}
                        </div>
                        <div>
                            <label>Description</label>
                            <input {...register("description")}
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            {errors.description && <p className="text-sm text-red-300">{errors.description.message}</p>}

                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                <label>Status</label>
                                <select {...register("status")} defaultValue="TODO" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                                    {STATUS_OPTIONS.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
                            </div>
                            <div>
                                <label>Priority</label>
                                <select {...register("priority")} defaultValue="MEDIUM" className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                                    {PRIORITY_OPTIONS.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.value}
                                        </option>
                                    ))}
                                </select>
                                {errors.priority && <p className="text-sm text-red-500 mt-1">{errors.priority.message}</p>}

                            </div>

                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                <label>Status</label>
                                <select {...register("assignee")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>}
                            </div>
                            <div>
                                <label>Due Date</label>
                                <input type="date" {...register("dueDate")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />

                                {errors.dueDate && <p className="text-sm text-red-500 mt-1">{errors.dueDate.message}</p>}

                            </div>

                        </div>
                        <div className="flex justify-end gap-2 m-2">
                            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                            >Cancel</button>
                            {/* <button type="button" onClick={handleSubmit(onSubmit)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"

                            >Send Invite</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default CreateTask;