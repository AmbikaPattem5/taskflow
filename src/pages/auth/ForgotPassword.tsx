import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import passwordLogo from "../../assets/forgotPassword.png";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../schemas/auth/forgotPasswordSchema";
import type { ForgotPasswordFormData } from "../../schemas/auth/forgotPasswordSchema";
import { forgotPassword } from "../../services/authService";
import { useState } from "react";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, Mail } from "lucide-react";
import toast from "react-hot-toast";

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema)
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setIsLoading(true);
            await forgotPassword(data);
            setIsSubmitted(true);
            toast.success("Password reset link sent to your email!");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to send reset link");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-slate-50">
            {/* Left Brand Panel */}
            <div className="hidden md:flex md:w-1/2 flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-3">
                    <img src={Logo} alt="TaskFlow Logo" className="h-9 w-auto brightness-0 invert" />
                    <span className="text-xl font-bold tracking-tight">TaskFlow</span>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center my-auto py-8">
                    <img
                        src={passwordLogo}
                        alt="Security Recovery"
                        className="max-h-[380px] w-auto object-contain drop-shadow-2xl rounded-2xl"
                    />
                    <div className="mt-8 text-center max-w-sm">
                        <h2 className="text-xl font-bold mb-2">Account Recovery</h2>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                            Don't worry, reset instructions will be sent securely to your registered email.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-blue-200 border-t border-blue-500/30 pt-4">
                    <span>© 2026 TaskFlow Inc.</span>
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" /> End-to-End Encryption
                    </span>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative">
                <div className="flex justify-start w-full">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Sign In</span>
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto my-auto py-6">
                    <div className="mb-8">
                        <img src={Logo} alt="Logo" className="h-10 w-auto object-contain mb-4 md:hidden" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Forgot Password?</h1>
                        <p className="text-sm text-slate-500 mt-1.5">
                            Enter your registered email address and we'll send you a password reset link
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-base">Check Your Inbox</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                We've sent password reset instructions to your email address. Please follow the link provided in the message.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block mt-2 px-5 py-2 text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition"
                            >
                                Return to Sign In
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                    Email Address <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    {...register("email")}
                                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
                                />
                                {errors.email && (
                                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                        <AlertCircle size={12} />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Sending Link...</span>
                                    </>
                                ) : (
                                    <span>Send Reset Link</span>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-center text-xs text-slate-400 pb-2">
                    Secured by TaskFlow Authentication Services
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;