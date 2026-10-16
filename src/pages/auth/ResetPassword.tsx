import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import resetPasswordLogo from "../../assets/resetPassword.png"
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/auth/resetPasswordSchema"
import type { ResetPasswordFormData } from "../../schemas/auth/resetPasswordSchema"
import type { ResetPasswordPayload } from "../../features/auth/authTypes"
import { resetPassword } from "../../services/authService"
function ResetPassword() {
    const token = localStorage.getItem("taskflow_token");


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordFormData>(
        { resolver: zodResolver(resetPasswordSchema) }
    );

    const onSubmit = (data: ResetPasswordFormData) => {
        console.log(data);
        resetPassword({ token: token, password: data.password });

    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-50 p-8">
                <img src={resetPasswordLogo} alt="Login" className="max-h-[500px] w-auto object-contain" />
            </div>
            <div className="w-full max-w-md flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md ">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col justify-right mb-6">
                            <img src={Logo} alt="Logo" className="h-12 w-auto object-contain mb-2" />
                            <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
                            <p className="text-sm text-gray-500">Enter a new password for your account</p>
                        </div>

                        <form className="space-y-4">

                            <div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-1 m-3">
                                        <label className="text-sm font-medium text-gray-700 p-1">Password</label>
                                        <input type="password" {...register("password")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                        {errors.password && <p className="text-sm text-red-300">{errors.password.message}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1 m-3">
                                        <label className="text-sm font-medium text-gray-700 p-1">Confirm Password</label>
                                        <input type="password" {...register("confirmPassword")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                        {errors.confirmPassword && <p className="text-sm text-red-300">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>

                                <button type="button" onClick={handleSubmit(onSubmit)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow hover:shadow-md transition duration-200 cursor-pointer m-3">Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-row m-3 p-3">
                    <hr className="border-gray-700" />
                    <p className="text-sm text-gray-500">Back to {" "}
                        <Link to="/login" className="text-blue-500 hover:underline text-sm font-semibold p-3">Sign In</Link>
                    </p>
                    <hr className="border-gray-300" />

                </div>
            </div>
        </div>
    )
}
export default ResetPassword;