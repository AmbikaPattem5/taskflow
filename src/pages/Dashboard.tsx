import { LayoutDashboard } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

function Dashboard() {
    return (
        <ComingSoon
            icon={LayoutDashboard}
            badge="Workspace Overview • In Development"
            title="Executive Dashboard & Live Metrics"
            subtitle="Get an aggregated bird's-eye view of active projects, pending task deadlines, and team workload velocity in real-time."
            features={[
                { title: "Smart Widget Cards", description: "Quick metrics on pending tasks, active projects, and completion rates." },
                { title: "Activity Feeds", description: "Chronological updates on assignments, project edits, and member invites." },
                { title: "Priority Focus", description: "Direct shortcuts to urgent tasks and impending deadlines." }
            ]}
            primaryActionLabel="View Projects"
            primaryActionTo="/projects"
        />
    );
}

export default Dashboard;