import loginImg from "../../assets/login.png"
import { useForm } from "react-hook-form";
import Logo from "../../assets/logo.png"
import { registerSchema } from "../../schemas/auth/registerSchema"
import type { RegisterFormData } from "../../schemas/auth/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod";


import { NavLink } from "react-router-dom";
function Register() {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-50 p-8">
                <img src={loginImg} alt="Login" className="max-h-[500px] w-auto object-contain" />
            </div>
            <div className="w-full max-w-md flex-1 flex justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="flex flex-col justify-right mb-6">
                        <img src={Logo} alt="Logo" className="h-12 w-auto object-contain mb-2" />
                        <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
                        <p className="text-sm text-gray-500">Join TaskFlow and start managing your work effeciently</p>
                    </div>

                    <form className="space-y-4">

                        <div>
                            <div className="flex flex-col gap-1 m-3">
                                <label className="text-sm font-medium text-gray-700 p-1">Full Name</label>
                                <input type="text" {...register("fullName")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.fullName && <p className="text-sm text-red-300">{errors.fullName.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1 m-3">
                                <label className="text-sm font-medium text-gray-700 p-1">Email</label>
                                <input type="email" {...register("email")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}

                            </div>
                            <div className="flex flex-col gap-1 m-3">
                                <label className="text-sm font-medium text-gray-700 p-1">Phone Number(Optional)</label>
                                <input type="tel" {...register("phone")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.phone && <p className="text-sm text-red-300">{errors.phone.message}</p>}
                            </div>
                            <div className="flex flex-row justify-between">
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
                            <div className="flex flex-row gap-1 m-3">
                                <input type="checkbox" {...register("termsAccepted")} />
                                <label className="text-sm font-medium text-gray-700 p-1">I agree to Terms of Services and Private Policy</label>
                                {errors.termsAccepted && <p className="text-sm text-red-300">{errors.termsAccepted.message}</p>}
                            </div>

                            <button type="button" onClick={handleSubmit(onSubmit)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow hover:shadow-md transition duration-200 cursor-pointer m-3">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;