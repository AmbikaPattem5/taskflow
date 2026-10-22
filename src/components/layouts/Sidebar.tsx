import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    MessageSquare,
    Briefcase,
    CalendarDays,
    BarChart3,
    Settings,
    LogOut,
    X
} from "lucide-react";
import logo from "../../assets/logo.png";

interface SidebarProps {
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
}

function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
    const navigate = useNavigate();

    const navItems = [
        { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
        { label: "Projects", to: "/projects", icon: Briefcase },
        { label: "Tasks", to: "/tasks", icon: CheckSquare },
        { label: "Team Members", to: "/team-members", icon: Users },
        { label: "Calendar", to: "/calendar", icon: CalendarDays },
        { label: "Messages", to: "/messages", icon: MessageSquare },
        { label: "Analytics", to: "/analytics", icon: BarChart3 },
        { label: "Settings", to: "/settings", icon: Settings },
    ];

    function handleLogout() {
        localStorage.removeItem("taskflow_token");
        navigate("/login");
    }

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white border-r border-slate-200/80 select-none">
            {/* Logo / Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2.5">
                    <img src={logo} alt="TaskFlow Logo" className="h-8 w-auto object-contain" />
                    <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        TaskFlow
                    </span>
                </div>
                {onCloseMobile && (
                    <button
                        type="button"
                        onClick={onCloseMobile}
                        className="md:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
                <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    Workspace
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onCloseMobile}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                                    isActive
                                        ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`w-4 h-4 transition-colors ${
                                            isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                                        }`}
                                    />
                                    <span className="flex-1">{item.label}</span>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* User Account / Logout Footer */}
            <div className="p-3.5 border-t border-slate-100 shrink-0 bg-slate-50/50">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 shadow-xs mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                            TF
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-800 truncate">Workspace Admin</p>
                            <p className="text-[11px] text-slate-400 truncate">Pro Workspace</p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                    <LogOut size={14} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Fixed Sidebar */}
            <aside className="hidden md:block w-64 shrink-0 min-h-screen">
                <div className="fixed top-0 left-0 w-64 h-screen">
                    {sidebarContent}
                </div>
            </aside>

            {/* Mobile Off-canvas Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                        onClick={onCloseMobile}
                    />
                    <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl animate-in slide-in-from-left duration-200">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;