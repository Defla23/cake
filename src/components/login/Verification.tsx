import Navbar from "../nav/Navbar";
import { Footer } from "../footer/Footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userAPI } from "../../features/auth/userAPI";
import {toast} from 'sonner'

type VerifyInputs = {
  email: string;
  code: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .max(100, "Max 100 characters")
    .required("Email is required"),
  code: yup
    .string()
    .required("Code is required"),
});

const Verification = () => {
  const [verifyUser,{ isLoading }] = userAPI.useVerifyUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    try {
      const response = await verifyUser(data).unwrap();
      console.log("Response", response);
      toast.success(response.message)
    } catch (error: any) {
      console.log("Error", error);
      toast.error(error.data.message)
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-[rgb(166,197,197)]">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome back, verify your account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}

            <input
              type="text"
              {...register("code")}
              placeholder="Verification Code"
              className="border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.code && (
              <span className="text-sm text-red-700">{errors.code.message}</span>
            )}

             
             <button type="submit" className="bg-pink-600 hover:bg-gray-900 text-white font-semibold w-full py-2 rounded-md transition-transform transform hover:scale-105" disabled={isLoading}>
                            {
                                isLoading ? (
                                    <>
                                        <span className="loading loading-spinner text-primary" /> Verifying....
                                    </>
                                ) : "Verify your Account"
                            }
                        </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Verification;
