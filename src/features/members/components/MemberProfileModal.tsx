function MemberProfileModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            {/* <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">View Profile</h3>
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

                            >Send Invite</button>
                        </div>
                    </form>
                </div>
            </div> */}
        </div>
    )

}
export default MemberProfileModal