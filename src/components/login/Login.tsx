import Navbar from "../nav/Navbar";
import { Footer } from "../footer/Footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginAPI } from "../../features/auth/LoginAPI";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/userSlice"
import { useNavigate } from "react-router";

type LoginInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .max(20, "Max 20 characters")
    .required("Password is required"),
});

const Login = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

  const [loginUser, { isLoading }] = loginAPI.useLoginUserMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

 const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
  try {
    const response = await loginUser(data).unwrap();
    toast.success(response.message);

    dispatch(
      loginSuccess({
        token: response.token,
        user: response.user,
      })
    );

   
    if (response.user.role === 'admin') {
      navigate('/admin/dashboard/analytics');
    } else if (response.user.role === 'customer') {
      navigate('/user/dashboard/dashboard');
    }

  } catch (error: any) {
    toast.error(error?.data?.error || "Login failed");
  }
};



  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-[rgb(166,197,197)]">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome back</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && <span className="text-sm text-red-700">{errors.password.message}</span>}

            <button
              type="submit"
              className="bg-pink-600 hover:bg-gray-900 text-white font-semibold w-full py-2 rounded-md transition-transform transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-white mr-2" /> Please Wait...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
