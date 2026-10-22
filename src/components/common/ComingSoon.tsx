import type { LucideIcon } from "lucide-react";
import { Sparkles, ArrowRight, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

interface FeatureHighlight {
    title: string;
    description: string;
}

interface ComingSoonProps {
    title: string;
    subtitle: string;
    badge?: string;
    icon: LucideIcon;
    features?: FeatureHighlight[];
    primaryActionLabel?: string;
    primaryActionTo?: string;
}

export default function ComingSoon({
    title,
    subtitle,
    badge = "Coming Soon",
    icon: Icon,
    features = [],
    primaryActionLabel = "View Projects",
    primaryActionTo = "/projects"
}: ComingSoonProps) {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNotify = () => {
        setIsSubscribed(true);
        toast.success("You'll be notified as soon as this feature launches!");
    };

    return (
        <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Subtle background ambient gradients */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                
                {/* Feature Icon with Glow */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 ring-8 ring-blue-50">
                        <Icon className="w-10 h-10" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
                    </span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{badge}</span>
                </div>

                {/* Title & Subtitle */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    {title}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
                    {subtitle}
                </p>

                {/* Feature Highlights Grid */}
                {features.length > 0 && (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-3.5 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-150"
                            >
                                <p className="text-xs font-semibold text-slate-800 mb-1">{feature.title}</p>
                                <p className="text-[11px] text-slate-500 leading-normal">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action CTA & Notification Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={handleNotify}
                        disabled={isSubscribed}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                            isSubscribed
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                        }`}
                    >
                        <BellRing className="w-4 h-4" />
                        {isSubscribed ? "Notification Enabled" : "Notify Me When Ready"}
                    </button>

                    <Link
                        to={primaryActionTo}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <span>{primaryActionLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
