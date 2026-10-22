import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import resetPasswordLogo from "../../assets/resetPassword.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/auth/resetPasswordSchema";
import type { ResetPasswordFormData } from "../../schemas/auth/resetPasswordSchema";
import { resetPassword } from "../../services/authService";
import { useState } from "react";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

function ResetPassword() {
    const token = localStorage.getItem("taskflow_token") || "";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            setIsLoading(true);
            await resetPassword({ token, password: data.password });
            toast.success("Password has been reset successfully! Please log in.");
            navigate("/login");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to reset password");
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
                        src={resetPasswordLogo}
                        alt="Security Recovery"
                        className="max-h-[380px] w-auto object-contain drop-shadow-2xl rounded-2xl"
                    />
                    <div className="mt-8 text-center max-w-sm">
                        <h2 className="text-xl font-bold mb-2">Set New Password</h2>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                            Create a strong, unique password to secure your personal and project information.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-blue-200 border-t border-blue-500/30 pt-4">
                    <span>© 2026 TaskFlow Inc.</span>
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" /> Secure Credentials
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
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Reset Your Password</h1>
                        <p className="text-sm text-slate-500 mt-1.5">
                            Enter and confirm a new password for your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Password */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                New Password <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
                            />
                            {errors.password && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                                Confirm New Password <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword")}
                                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <span>Reset Password</span>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center text-xs text-slate-400 pb-2">
                    Secured by TaskFlow Authentication Services
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;