import { X, Ban, User } from "lucide-react";
import type { Member, UserStatus } from "../../../types/memberTypes"
import { userStatus } from "../../../services/memberService"
import toast from "react-hot-toast"
function MemberStatusActivityModal({ onClose, member, status, onSuccess }: { onClose: () => void, member: Member, status: UserStatus, onSuccess: () => void }) {
    const id = member?.id;
    const isDeactivating = status === "INACTIVE";

    async function onSubmit() {
        try {
            await userStatus(id, status); toast.success(`Member successfully ${isDeactivating ? "deactivated" : "reactivated"}`);
            onSuccess();
            onClose();

        }
        catch (err) {
            toast.error(err?.response?.data?.message)
        }

    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div className="flex flex-row">
                        <Ban size={16} />
                        <h3 className="font-semibold">{isDeactivating ? "Deactivate Account" : "Reactivate Account"}</h3>
                    </div>
                    <div>
                        <X size={20} onClick={onClose} className="hover:bg-gray-400 cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <div >
                        <h3 className="font-semibold">Are you sure you want to {isDeactivating ? "deactivate" : "reactivate"} {member.name}?</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {isDeactivating
                                ? "The member will lose access to all projects and won't be able to create or update tasks until they are activated."
                                : "The member will regain access to projects and be able to collaborate on tasks."}
                        </p>

                    </div>
                    <div className="flex flex-row justify-between bg-gray-100 border border-gray-300 rounded-xl">
                        <div className="flex flex-row gap-2">
                            <User size={18} />
                            <div className="flex flex-col gap=2">
                                <h3 className="font-semibold">{member.name}</h3>
                                <p>{member.email}</p>

                            </div>
                        </div>
                        <div className="p-1 m-1">
                            Member
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-end'>
                    <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition cursor-pointer"
                    >Cancel</button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className={`px-6 py-2.5 text-sm font-semibold text-white rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 ${isDeactivating
                            ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
                            : "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800"
                            }`}
                    >
                        {isDeactivating ? "Deactivate" : "Reactivate"}
                    </button>
                </div>
            </div>

        </div>
    )

}
export default MemberStatusActivityModal;