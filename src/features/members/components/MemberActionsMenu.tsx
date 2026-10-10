import { useEffect, useRef, useState } from "react"
import ChangeRoleModal from "./ChangeRoleModal"
import type { Member } from "../../../types/memberTypes"
function MemberActionsMenu({ onClose, member, onSuccess }: { onClose: () => void, member: Member, onSuccess: () => void }) {
    const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState<Boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If click was outside this menu, close it
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        // Listen for clicks on the whole page
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up listener when menu unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    return (

        <div ref={menuRef} className="absolute right-2 top-10 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-xs">
            <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700">View Profile</button>
            <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700">Edit Member</button>
            <button onClick={() => setIsChangeRoleModalOpen(true)} className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700">Change Role</button>
            <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 rounded-lg text-slate-700">Deactivate</button>
            {isChangeRoleModalOpen && <ChangeRoleModal onClose={() => setIsChangeRoleModalOpen(false)} member={member} onSuccess={onSuccess} />}

        </div>


    )
}
export default MemberActionsMenu;