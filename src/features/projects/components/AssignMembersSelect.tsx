import { useState, useEffect, useRef } from "react";
import { X, Plus, User } from "lucide-react";
import { getMembers } from "../../../services/memberService";
import type { Member } from "../../../types/memberTypes";

// 1. Props: What the parent component passes to this component
interface AssignMembersSelectProps {
    selectedIds: string[];                  // The array of selected IDs (e.g. ['id-1', 'id-2'])
    onChange: (ids: string[]) => void;      // Function to tell the parent when selection changes
}

function AssignMembersSelect({ selectedIds, onChange }: AssignMembersSelectProps) {
    // All members fetched from the server
    const [allMembers, setAllMembers] = useState<Member[]>([]);
    // Controls if the dropdown is open or closed
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch all workspace members when component loads
    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await getMembers("", "", "");
                setAllMembers(response.data);
            } catch (error) {
                console.error("Failed to fetch members", error);
            }
        }
        fetchTeam();
    }, []);

    // Close dropdown if user clicks anywhere outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Add an ID to the selected list
    function handleAdd(id: string) {
        onChange([...selectedIds, id]); // Notify parent with the new array
        setIsOpen(false);               // Close the dropdown
    }

    // Remove an ID from the selected list
    function handleRemove(idToRemove: string) {
        const updated = selectedIds.filter((id) => id !== idToRemove);
        onChange(updated); // Notify parent with the filtered array
    }

    // Filter members who are NOT already selected (so we don't pick them twice)
    const availableToPick = allMembers.filter(
        (member) => !selectedIds.includes(member.id)
    );

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700">
                Assign Team Members
            </label>

            {/* Box containing the chips + the Add button */}
            <div className="w-full min-h-[46px] p-2 border border-slate-200 rounded-xl flex flex-wrap items-center gap-2 bg-white">

                {/* Render a pill chip for each selected member */}
                {selectedIds.map((id) => {
                    const member = allMembers.find((m) => m.id === id);
                    if (!member) return null;

                    return (
                        <div
                            key={member.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 rounded-full text-xs font-medium text-slate-800 transition"
                        >
                            {/* Member Avatar */}
                            {member.avatar ? (
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-4 h-4 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[9px] text-slate-700">
                                    <User size={10} />
                                </div>
                            )}

                            {/* Name */}
                            <span>{member.name}</span>

                            {/* Click X to remove */}
                            <button
                                type="button"
                                onClick={() => handleRemove(member.id)}
                                className="text-slate-400 hover:text-slate-800 cursor-pointer ml-0.5"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    );
                })}

                {/* The "+ Add Member" button container */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-medium cursor-pointer transition"
                    >
                        <Plus size={13} />
                        <span>Add Member</span>
                    </button>

                    {/* Floating Dropdown showing available members */}
                    {isOpen && (
                        <div className="absolute left-0 top-full mt-1.5 z-50 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1 max-h-48 overflow-y-auto">
                            {availableToPick.length > 0 ? (
                                availableToPick.map((member) => (
                                    <button
                                        key={member.id}
                                        type="button"
                                        onClick={() => handleAdd(member.id)}
                                        className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 transition cursor-pointer"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                                            <User size={12} />
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <span className="font-medium truncate">{member.name}</span>
                                            <span className="text-[10px] text-slate-400 truncate">{member.email}</span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p className="px-3 py-2 text-xs text-slate-400 text-center">
                                    All members assigned
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AssignMembersSelect;
