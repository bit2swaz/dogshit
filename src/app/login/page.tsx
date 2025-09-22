"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
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
      className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-4 ${inter.className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h1 className="text-cambridge-blue mb-4 text-5xl font-bold">
            NeighborhoodHub
          </h1>
          <p className="text-cambridge-blue/70 text-xl">
            Welcome to your community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card shadow-soft rounded-2xl p-10"
        >
          <form onSubmit={handleLogin} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label
                htmlFor="name"
                className="text-cambridge-blue mb-3 block text-base font-semibold"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-modern w-full text-lg"
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <label
                htmlFor="age"
                className="text-cambridge-blue mb-3 block text-base font-semibold"
              >
                Your Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="input-modern w-full text-lg"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            >
              <label
                htmlFor="societyCode"
                className="text-cambridge-blue mb-3 block text-base font-semibold"
              >
                Society Code
              </label>
              <input
                type="text"
                id="societyCode"
                name="societyCode"
                value={formData.societyCode}
                onChange={handleInputChange}
                className="input-modern w-full text-lg"
                placeholder="Enter your society code"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full py-4 text-xl font-bold"
            >
              Login
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-cambridge-blue/70 text-base">
            Don&apos;t have a society code? Contact your administrator.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default LoginPage;
