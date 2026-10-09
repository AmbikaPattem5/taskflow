import { useNavigate, Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CheckSquare, MessageSquare, Briefcase, CalendarDays, BarChart3, Settings } from 'lucide-react';
import logo from "../../assets/logo.png"
function Sidebar() {
    const navItems = [
        { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, },
        { label: "Projects", to: "/projects", icon: Briefcase, },
        { label: "Tasks", to: "/tasks", icon: CheckSquare, },
        { label: "Team Members", to: "/team-members", icon: Users, },
        { label: "Calendar", to: "/calendar", icon: CalendarDays, },
        { label: "Messages", to: "/messages", icon: MessageSquare, },
        { label: "Analytics", to: "/analytics", icon: BarChart3, },
        { label: "Settings", to: "/settings", icon: Settings, },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-full">
            <div className="flex px-4 h-16 border-b border-gray-100 gap-3">
                <img src={logo} alt="logo" height={70} width={100} className="bg-gradient-to-br from-blue-500 to-cyan-400 text-transparent bg-clip-text" />

            </div>
            <div className="h-full">
                <div className="flex flex-col justify-between space-y-2 p-4 h-full">
                    <div>
                        {navItems.map((item) => {
                            return (
                                <NavLink key={item.to} to={item.to} className={({ isActive }) =>
                                    `w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-600 text-white font-medium"
                                        : "text-gray-600 hover:bg-gray-100 "
                                    }`}>
                                    <item.icon className="h-5 w-5 mr-2" />
                                    {item.label}

                                </NavLink>
                            )
                        })}
                    </div>
                    <div className="px-4">
                        <button className="w-full flex items-center px-4 py-2.5 rounded-lg transition-colors bg-slate-600 text-white font-medium cursor-pointer">Logout</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;