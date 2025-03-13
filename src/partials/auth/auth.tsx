import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { API_ENDPOINTS, getCsrfToken } from "../../configs/configs";

// Zod validation schemas
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData | LoginFormData>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignupFormData | LoginFormData> = async (
    data
  ) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? `${API_ENDPOINTS.LOGIN}/`
        : `${API_ENDPOINTS.REGISTER}/`;

      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "X-CSRFToken": getCsrfToken(),
        },
      });

      if (response.data) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        navigate("/me");
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Type-safe error getter
  const getErrorMessage = (field: string) => {
    if (isLogin) {
      // For login, only allow email and password fields
      if (field === "email" || field === "password") {
        return (errors as FieldErrors<LoginFormData>)[field]?.message;
      }
      return undefined;
    } else {
      // For signup, allow all fields
      return (errors as FieldErrors<SignupFormData>)[
        field as keyof SignupFormData
      ]?.message;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
      {/* Left Section - Image */}
      <div className="hidden md:block md:w-1/2 rounded-l-2xl overflow-hidden">
        <img
          src="https://source.unsplash.com/600x600/?community,helping"
          alt="Join Community"
          className="object-cover w-full h-full border"
        />
      </div>

      {/* Right Section - Form */}
      <div className="md:w-1/2 p-8 space-y-6">
        <h2 className="text-3xl font-bold text-blue-900">
          {isLogin ? "Welcome Back!" : "Join Helping Community"}
        </h2>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div>
              <div className="flex items-center bg-gray-100 p-3 rounded-full">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 bg-transparent outline-none"
                  disabled={loading}
                />
              </div>
              {getErrorMessage("name") && (
                <p className="text-red-500 text-sm ml-4">
                  {getErrorMessage("name")}
                </p>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent outline-none"
                disabled={loading}
              />
            </div>
            {getErrorMessage("email") && (
              <p className="text-red-500 text-sm ml-4">
                {getErrorMessage("email")}
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <div className="flex items-center bg-gray-100 p-3 rounded-full">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone number"
                  className="flex-1 bg-transparent outline-none"
                  disabled={loading}
                />
              </div>
              {getErrorMessage("phone") && (
                <p className="text-red-500 text-sm ml-4">
                  {getErrorMessage("phone")}
                </p>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center bg-gray-100 p-3 rounded-full">
              <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="flex-1 bg-transparent outline-none"
                disabled={loading}
              />
            </div>
            {getErrorMessage("password") && (
              <p className="text-red-500 text-sm ml-4">
                {getErrorMessage("password")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition disabled:bg-orange-400"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="font-bold text-gray-800 hover:underline cursor-pointer"
            onClick={() => {
              reset();
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
