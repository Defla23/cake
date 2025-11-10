import { useState } from "react";
import Navbar from "../nav/Navbar";
import { Footer } from "../footer/Footer";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const user = JSON.parse(savedUser);

    if (data.email === user.email && data.password === user.password) {
      setSuccess(true); 
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert(" Invalid email or password");
    }
  } else {
    alert(" No user found. Please sign up first.");
  }
};


  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-[rgb(166,197,197)]">
        <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white relative">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome back</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.email && (
              <span className="text-sm text-red-700">{errors.email.message}</span>
            )}

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 text-lg"
            />
            {errors.password && (
              <span className="text-sm text-red-700">{errors.password.message}</span>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </form>

          {success && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90 rounded-xl">
              <p className="text-gray-900 font-bold text-xl animate-bounce text-center">
                 Congrats! Login successful.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
