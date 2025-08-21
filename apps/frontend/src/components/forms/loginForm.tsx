"use client";
import { useLogin } from "@/hooks/useLogin";
import { useSetToken } from "@/hooks/useSetToken";
import { UserAccessResponse, UserLogin } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserLogin>({
    mode: "onChange",
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const loginMutation = useLogin();
  const setToken = useSetToken();
  const router = useRouter();

  const onLoginSubmit = (userForm: UserLogin) => {
    loginMutation.mutate(userForm, {
      onSuccess: (result: UserAccessResponse) => {
        toast.success("Login successful");
        setToken(result);
        router.push("/");
      },
      onError: (error) => {
        toast.error("Login failed");
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Email or Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your email or username"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.identifier ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              {...register("identifier", {
                required: "Email or username is required",
              })}
            />
          </div>
          {errors.identifier && (
            <p className="mt-1 text-sm text-red-600">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.password ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* TODO: Add remember me */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
        </div> */}

        <button
          type="submit"
          disabled={!isValid || loginMutation.isPending}
          className={`w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium ${
            !isValid || loginMutation.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          } transition-colors`}
        >
          {loginMutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FiLogIn className="mr-2" />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};
