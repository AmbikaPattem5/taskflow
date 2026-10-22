import { MessageSquare } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

function Messages() {
    return (
        <ComingSoon
            icon={MessageSquare}
            badge="Team Chat • Q2 2026"
            title="Real-Time Workspace Chat"
            subtitle="Collaborate seamlessly with direct messaging, project channel threads, and contextual task discussions."
            features={[
                { title: "Project Channels", description: "Dedicated communication streams for every workspace project." },
                { title: "Task Context Threads", description: "Discuss blocker details right alongside task cards without tab switching." },
                { title: "Instant Mentions", description: "Real-time @mentions and notification alerts to keep everyone aligned." }
            ]}
            primaryActionLabel="Go to Team Members"
            primaryActionTo="/team-members"
        />
    );
}

export default Messages;