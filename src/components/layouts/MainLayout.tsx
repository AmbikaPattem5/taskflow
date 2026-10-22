import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
            />
            <div className="min-w-0 flex-1 flex flex-col">
                <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;