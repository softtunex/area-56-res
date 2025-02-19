import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spin } from "antd";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, LoginFormInputs } from "../utils/validation";
import Logo from "../asset/images/Area-56-logo.png";
import SideImage from "../asset/images/side-image.png";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const { mutate: login, isPending } = useLogin();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = (data: LoginFormInputs) => {
    setApiError(null); // Reset API error on new submission
    login(data, {
      onError: (err) => setApiError(err.message), // Capture API error
    });
  };

  return (
    <div className="h-screen flex">
      {/* ✅ Side Image - Hidden on Small Screens */}
      <img
        src={SideImage}
        alt="Side pics"
        className="w-1/2  bg-center hidden sm:block"
      />

      {/* ✅ Login Form */}
      <div className="w-full md:bg-white sm:w-1/2 flex justify-center items-center p-6 bg-gray-200">
        <div className="w-full max-w-md">
          {/* ✅ Logo (Visible only on small screens) */}
          <img
            src={Logo}
            alt="Logo"
            className="block sm:hidden mx-auto w-20 mb-4"
          />

          <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>

          {/* ✅ API Error Message */}
          {apiError && (
            <p className="text-red-500 text-center bg-red-100 p-2 rounded mb-3">
              {apiError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ✅ Email Input */}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Work Email"
                className={`w-full p-3 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ✅ Password Input */}
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className={`w-full p-3 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ✅ Remember Me + Forgot Password */}
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link to="#" className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 rounded hover:bg-secondaryHover flex justify-center items-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spin size="small" className="mr-2" /> Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
