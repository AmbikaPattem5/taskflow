import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/auth/Register"
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword"
import MainLayout from "../components/layouts/MainLayout";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import TeamMembers from "../pages/TeamMembers";
import Calendar from "../pages/Calendar";
import Messages from "../pages/Messages";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayout />} >
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="team-members" element={<TeamMembers />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </HashRouter>
    );
}

export default AppRoutes;