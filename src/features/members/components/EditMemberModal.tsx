import { X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MembersPayload } from "../../../types/memberTypes"
import { inviteMemberSchema } from "../../../schemas/members/inviteMemberSchema"
import { editUserDetails } from "../../../services/memberService"
import type { Member } from "../../../types/memberTypes"
import toast from "react-hot-toast"

function EditMemberModal({ onClose, member, onSuccess }: { onClose: () => void, member: Member, onSuccess: () => void }) {
    const id: string = member?.id;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<MembersPayload>(
        {
            resolver: zodResolver(inviteMemberSchema),
            defaultValues: {
                name: member?.name || "",
                email: member?.email || "",
                role: member?.role || "MEMBER",
            }
        }
    );
    const onSubmit = async (data: MembersPayload) => {
        try {
            console.log(data);
            await editUserDetails(id, data);
            toast.success("Member updated successfully")
            onSuccess();
            onClose();
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || "Failed to update member")
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">Edit Team Member</h3>
                        <p className="text-gray-600 text-sm">Edit the details of team member</p>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <form>
                        <div>
                            <label>Name</label>
                            <input type="text" {...register("name")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                            {errors.name && <p className="text-sm text-red-300">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" {...register("email")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                            {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label>Role</label>
                            <select {...register("role")}
                                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select a role</option>
                                <option value="ADMIN">Admin</option>
                                <option value="MANAGER">Manager</option>
                                <option value="MEMBER">Member</option>

                            </select>
                            {errors.role && <p className="text-sm text-red-300">{errors.role.message}</p>}

                        </div>
                        <div className="flex justify-end gap-2 m-2">
                            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                            >Cancel</button>
                            <button type="button" onClick={handleSubmit(onSubmit)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"

                            >Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default EditMemberModal