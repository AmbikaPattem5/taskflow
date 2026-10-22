import { Settings as SettingsIcon } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

function Settings() {
    return (
        <ComingSoon
            icon={SettingsIcon}
            badge="Preferences & Security • Q2 2026"
            title="Workspace Preferences & Settings"
            subtitle="Configure organization branding, team notification preferences, single sign-on (SSO), and developer API keys."
            features={[
                { title: "Organization Controls", description: "Manage company domains, default project templates, and role permissions." },
                { title: "Notification Center", description: "Fine-tune in-app and email alert preferences for assignments and updates." },
                { title: "Integrations & APIs", description: "Connect GitHub, Slack, Jira, and custom webhooks effortlessly." }
            ]}
            primaryActionLabel="Go to Team Members"
            primaryActionTo="/team-members"
        />
    );
}

export default Settings;