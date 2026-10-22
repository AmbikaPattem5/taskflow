import { useEffect, useRef, useState } from "react";
import ChangeRoleModal from "./ChangeRoleModal";
import type { Member, UserStatus } from "../../../types/memberTypes";
import MemberProfileModal from "./MemberProfileModal";
import MemberStatusActivityModal from "./MemberStatusActivityModal";
import EditMemberModal from "./EditMemberModal";
import { User, Pencil, Shield, UserX, UserCheck } from "lucide-react";

function MemberActionsMenu({ onClose, member, onSuccess }: { onClose: () => void; member: Member; onSuccess: () => void }) {
    const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState<boolean>(false);
    const [isMemberProfileOpen, setIsMemberProfileOpen] = useState<boolean>(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const isCurrentlyActive = member.status === "ACTIVE";
    const targetStatus: UserStatus = isCurrentlyActive ? "INACTIVE" : "ACTIVE";

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

    return (
        <>
            <div
                ref={menuRef}
                className="absolute left-2 top-full mt-1.5 z-30 w-44 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 text-xs text-left animate-in fade-in zoom-in-95 duration-150"
            >
                <button
                    type="button"
                    onClick={() => setIsMemberProfileOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <User size={14} className="text-slate-400" />
                    <span>View Profile</span>
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <Pencil size={14} className="text-slate-400" />
                    <span>Edit Member</span>
                </button>

                <button
                    type="button"
                    onClick={() => setIsChangeRoleModalOpen(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                    <Shield size={14} className="text-slate-400" />
                    <span>Change Role</span>
                </button>

                <div className="h-px bg-slate-100 my-0.5" />

                <button
                    type="button"
                    onClick={() => setIsStatusModalOpen(true)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-colors cursor-pointer text-left font-medium ${
                        isCurrentlyActive
                            ? "text-rose-600 hover:bg-rose-50"
                            : "text-emerald-600 hover:bg-emerald-50"
                    }`}
                >
                    {isCurrentlyActive ? (
                        <>
                            <UserX size={14} />
                            <span>Deactivate Member</span>
                        </>
                    ) : (
                        <>
                            <UserCheck size={14} />
                            <span>Reactivate Member</span>
                        </>
                    )}
                </button>
            </div>

            {isChangeRoleModalOpen && (
                <ChangeRoleModal
                    onClose={() => setIsChangeRoleModalOpen(false)}
                    member={member}
                    onSuccess={onSuccess}
                />
            )}
            {isMemberProfileOpen && (
                <MemberProfileModal
                    onClose={() => setIsMemberProfileOpen(false)}
                    member={member}
                    onSuccess={onSuccess}
                />
            )}
            {isStatusModalOpen && (
                <MemberStatusActivityModal
                    onClose={() => setIsStatusModalOpen(false)}
                    member={member}
                    status={targetStatus}
                    onSuccess={onSuccess}
                />
            )}
            {isEditModalOpen && (
                <EditMemberModal
                    onClose={() => setIsEditModalOpen(false)}
                    member={member}
                    onSuccess={onSuccess}
                />
            )}
        </>
    );
}

export default MemberActionsMenu;