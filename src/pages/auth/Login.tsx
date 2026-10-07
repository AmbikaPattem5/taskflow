import loginImg from "../../assets/login.png";
import { useForm } from "react-hook-form";
import Logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth/loginSchema"
import type { LoginFormData } from "../../schemas/auth/loginSchema"
function Login() {


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>(
        { resolver: zodResolver(loginSchema) }
    );

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
                    <div className="flex items-right justify-right">Don't have an account</div>
                    <div className="flex flex-col justify-right mb-6">
                        <img src={Logo} alt="Logo" className="h-12 w-auto object-contain mb-2" />
                        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-sm text-gray-500">Please enter your details to sign in</p>
                    </div>

                    <form className="space-y-4">

                        <div>
                            <div className="flex flex-col gap-1 m-3">
                                <label className="text-sm font-medium text-gray-700 p-1">Email</label>
                                <input type="email" {...register("email")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1 m-3">
                                <label className="text-sm font-medium text-gray-700 p-1">Password</label>
                                <input type="password" {...register("password")} className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                {errors.password && <p className="text-sm text-red-300">{errors.password.message}</p>}
                            </div>
                            <div className="flex justify-between m-2">
                                <div>
                                    <input type="checkbox" {...register("rememberMe")} />
                                    <label className="text-sm font-medium text-gray-700 p-1">Remember Me</label>
                                </div>
                                <div>
                                    <NavLink to="/forgotPassword" className="text-sm font-medium text-gray-700 text-blue-300 p-1">Forgot Password?</NavLink>
                                </div>
                            </div>
                            <button type="button" onClick={handleSubmit(onSubmit)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow hover:shadow-md transition duration-200 cursor-pointer">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;