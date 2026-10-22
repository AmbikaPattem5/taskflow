import { Search, Bell, Plus, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    onOpenMobileMenu?: () => void;
}

function Header({ onOpenMobileMenu }: HeaderProps) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
            {/* Left: Mobile Menu Toggle & Global Search */}
            <div className="flex items-center gap-3 flex-1 max-w-lg">
                {onOpenMobileMenu && (
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        className="md:hidden text-slate-500 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-label="Open sidebar menu"
                    >
                        <Menu size={20} />
                    </button>
                )}

                <div className="relative w-full max-w-md">
                    <Search
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search projects, tasks, or team members..."
                        className="w-full pl-9 pr-14 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    />
                    <kbd className="hidden sm:inline-flex items-center absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs pointer-events-none">
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Right: Quick Actions & Profile */}
            <div className="flex items-center gap-3">
                <Link
                    to="/projects"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                    <Plus size={14} />
                    <span>Quick Add</span>
                </Link>

                {/* Notifications Button */}
                <button
                    type="button"
                    className="relative text-slate-500 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="View notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Profile Pill */}
                <div className="flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs ring-2 ring-slate-100">
                        A
                    </div>
                    <span className="hidden lg:inline-block text-xs font-semibold text-slate-700">
                        Admin
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;