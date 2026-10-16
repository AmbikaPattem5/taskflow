import { Outlet } from "react-router-dom";
import Header from "./Header"
import Sidebar from "./Sidebar"

function MainLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="min-w-0 flex-1">
                <Header />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )

}
export default MainLayout;