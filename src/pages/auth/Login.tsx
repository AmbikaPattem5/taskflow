import loginImg from "../../assets/login.png";
import { useForm } from "react-hook-form";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth/loginSchema";
import type { LoginFormData } from "../../schemas/auth/loginSchema";
import { login } from "../../services/authService";
import type { LoginResponse } from "../../features/auth/authTypes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { loginSuccess } from "../../features/auth/authSlice";
import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            const result: LoginResponse = await login(data);
            dispatch(
                loginSuccess({
                    id: result.data.user.id,
                    name: result.data.user.name,
                    email: result.data.user.email,
                    role: result.data.user.role
                })
            );
            localStorage.setItem("taskflow_token", result.data.token);
            toast.success("Welcome back!");
            navigate('/dashboard');
        } catch (error: any) {
            console.error("Login failed:", error);
            const errorMsg = error?.response?.data?.message || "Invalid email or password";
            toast.error(errorMsg);
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
                        src={loginImg}
                        alt="TaskFlow Workspace Preview"
                        className="max-h-[380px] w-auto object-contain drop-shadow-2xl rounded-2xl"
                    />
                    <div className="mt-8 text-center max-w-sm">
                        <h2 className="text-xl font-bold mb-2">Smart Project Collaboration</h2>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                            Organize workspace sprints, track deliverables, and accelerate team execution in one place.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-blue-200 border-t border-blue-500/30 pt-4">
                    <span>© 2026 TaskFlow Inc.</span>
                    <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400" /> Secure Cloud Platform
                    </span>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative">
                <div className="flex justify-end w-full text-xs sm:text-sm text-slate-600">
                    <span>Don't have an account?</span>
                    <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline ml-1.5">
                        Sign Up
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto my-auto py-6">
                    <div className="mb-8">
                        <img src={Logo} alt="Logo" className="h-10 w-auto object-contain mb-4 md:hidden" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                        <p className="text-sm text-slate-500 mt-1.5">
                            Please enter your credentials to access your workspace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address</label>
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

                        {/* Password */}
                        <div>
                            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-2xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                    <AlertCircle size={12} />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                                <input
                                    type="checkbox"
                                    {...register("rememberMe")}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgotPassword" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                                Forgot password?
                            </Link>
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
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
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

export default Login;