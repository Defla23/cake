import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Navbar from "../nav/Navbar";
import { Footer } from "../footer/Footer";
import { userAPI } from "../../features/auth/userAPI";
import {toast} from 'sonner'

type SignInInputs = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;

};

const schema = yup.object({
  name: yup.string().max(50, "Max 50 characters").required("Name is required"),
  email: yup.string().email("Invalid email").max(100, "Max 100 characters").required("Email is required"),
  phone: yup.string().max(10, "Max 10 characters").required("Phone number is required"),
  address: yup.string().max(100, "Max 100 characters").required("Address is required"),
  password: yup.string().min(6, "Min 6 characters").max(255, "Max 10 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Sign_in = () => {
  const [createUser, {isLoading}] = userAPI.useCreateUsersMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    try {
      const newUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
        
      };

      const response = await createUser(newUser).unwrap();
      console.log("Response", response);

      // Optional success flow
       toast.success(response.message);
      // setTimeout(() => {
      //   navigate("/verify", { state: { email: data.email } });
      // }, 2000);
    } catch (error: any) {
      console.log("Error", error);
       toast.error(error.data?.error || "Something went wrong");
    }

    console.log("Form submitted:", data);
  };

  return (
    <>
      <Navbar />

      <div
        className="flex justify-center items-center min-h-screen relative"
        style={{ backgroundColor: "rgb(166,197,197)" }}
      >
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white relative">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Welcome, Create Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              {...register("name")}
              placeholder="Full Name"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.name && <span className="text-red-700 text-sm">{errors.name.message}</span>}

            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}

            <input
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.phone && <span className="text-red-700 text-sm">{errors.phone.message}</span>}

            <input
              type="text"
              {...register("address")}
              placeholder="Address"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.address && <span className="text-red-700 text-sm">{errors.address.message}</span>}

            

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.confirmPassword && (
              <span className="text-red-700 text-sm">{errors.confirmPassword.message}</span>
            )}

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
    "Register"
  )}
</button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Sign_in;
