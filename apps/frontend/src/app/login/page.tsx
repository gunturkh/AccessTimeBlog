"use client";
import { useState } from "react";
import { LoginForm } from "@/components/forms/loginForm";
import { RegisterForm } from "@/components/forms/registerForm";
import { useIsNotConnected } from "@/hooks/useIsNotConnected";
import { FiUserPlus, FiLogIn, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  useIsNotConnected(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-2">
              <button
                onClick={() => setActiveTab("login")}
                className={`py-4 cursor-pointer text-center font-medium transition-colors ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <FiLogIn className="mr-2" />
                  Login
                </div>
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`py-4 cursor-pointer text-center font-medium transition-colors ${
                  activeTab === "register"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <FiUserPlus className="mr-2" />
                  Register
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} To Do App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
