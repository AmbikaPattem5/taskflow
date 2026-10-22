import { BarChart3 } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

function Analytics() {
    return (
        <ComingSoon
            icon={BarChart3}
            badge="Advanced Insights • Q2 2026"
            title="Productivity & Velocity Analytics"
            subtitle="Gain deep operational visibility with live burndown charts, cycle time metrics, and team performance breakdowns."
            features={[
                { title: "Velocity & Burndown", description: "Monitor sprint delivery speed and predict delivery completion dates." },
                { title: "Workload Distribution", description: "Identify bottlenecks and rebalance tasks across team members." },
                { title: "Exportable Reports", description: "Generate beautiful PDF and CSV summaries for leadership updates." }
            ]}
            primaryActionLabel="Go to Projects"
            primaryActionTo="/projects"
        />
    );
}

export default Analytics;