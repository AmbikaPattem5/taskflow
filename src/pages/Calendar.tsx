import { CalendarDays } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

function Calendar() {
    return (
        <ComingSoon
            icon={CalendarDays}
            badge="Workspace Calendar • Q2 2026"
            title="Team & Project Calendar"
            subtitle="Coordinate release milestones, sprint deadlines, and member availability in one unified interactive timeline."
            features={[
                { title: "Sprint Deadlines", description: "Visualize task due dates across active projects in monthly and weekly views." },
                { title: "Member Availability", description: "Track team workloads, out-of-office schedules, and team bandwidth." },
                { title: "Google/Outlook Sync", description: "Seamless two-way sync with your external calendar tools." }
            ]}
            primaryActionLabel="Go to Projects"
            primaryActionTo="/projects"
        />
    );
}

export default Calendar;