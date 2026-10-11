import { X } from "lucide-react";
import type { UserRole } from "../../../types/memberTypes"
import type { Member } from "../../../types/memberTypes"
import { updateUserRole } from "../../../services/memberService"
import { useState } from "react"
import toast from "react-hot-toast"
function ChangeRoleModal({ onClose, member, onSuccess }: { onClose: () => void, member: Member, onSuccess: () => void }) {
    const [role, setRole] = useState<UserRole | string>("")
    const id = member?.id;
    async function onSubmit(id, role) {
        // if (!id || !role) {
        //     toast.error("Please select a role");
        //     return;
        // }

        try {
            await updateUserRole(id, role);
            onSuccess();
            onClose()
        }
        catch (err) {
            toast.error(err?.response.data.message);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">Change Role</h3>
                        <p className="text-gray-600 text-sm">Update the role for {member.name}. This will change access permissions in TaskFlow</p>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div>

                    <div>
                        <label>New Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >

                            <option value="">Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MANAGER">Manager</option>
                            <option value="MEMBER">Member</option>

                        </select>

                    </div>-
                </div>

            </div>
            <div className='flex flex-row'>
                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                >Cancel</button>
                <button type="button" onClick={() => onSubmit(id, role)}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 active:scale-98 rounded-xl shadow-xs hover:shadow-md hover:shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"

                >Update Role</button>
            </div>
        </div>
    )

}

export default ChangeRoleModal