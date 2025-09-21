"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LoginPage = () => {
  const [societyCode, setSocietyCode] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple navigation to home page without authentication logic
    router.push("/home");
  };

  return (
    <div
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
                htmlFor="societyCode"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Society Code
              </label>
              <input
                type="text"
                id="societyCode"
                value={societyCode}
                onChange={(e) => setSocietyCode(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your society code"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
    </div>
  );
};

export default LoginPage;
