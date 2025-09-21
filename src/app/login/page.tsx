"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { useAuth } from "~/context/AuthContext";
import toast from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    societyCode: "",
  });
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that none of the fields are empty
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.age.trim()) {
      toast.error("Please enter your age");
      return;
    }

    if (!formData.societyCode.trim()) {
      toast.error("Please enter your society code");
      return;
    }

    // Call the login function from useAuth
    login({
      name: formData.name.trim(),
      age: formData.age.trim(),
      societyCode: formData.societyCode.trim(),
    });
  };

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-slate-50 px-4 ${inter.className}`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            NeighborhoodHub
          </h1>
          <p className="text-gray-600">Welcome to your community</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="focus:ring-brand w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Your Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="focus:ring-brand w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label
                htmlFor="societyCode"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Society Code
              </label>
              <input
                type="text"
                id="societyCode"
                name="societyCode"
                value={formData.societyCode}
                onChange={handleInputChange}
                className="focus:ring-brand w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
                placeholder="Enter your society code"
              />
            </div>

            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark focus:ring-brand w-full rounded-md px-4 py-3 font-semibold text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have a society code? Contact your administrator.
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
