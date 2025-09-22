"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

interface GatePass {
  id: number;
  visitor: string;
  type: string;
  status: string;
  time: string;
}

const GatePage = () => {
  const society = db.elysium123;

  // State management
  const [gatePasses, setGatePasses] = useState<GatePass[]>(society.gatePasses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitor: "",
    type: "",
  });

  // Helper functions
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.visitor.trim() || !formData.type) return;

    const newGatePass: GatePass = {
      id: Math.max(...gatePasses.map((pass) => pass.id)) + 1,
      visitor: formData.visitor.trim(),
      type: formData.type,
      status: "Pending",
      time: getCurrentTime(),
    };

    setGatePasses([newGatePass, ...gatePasses]);
    setFormData({ visitor: "", type: "" });
    setIsModalOpen(false);
  };

  // Handle approve/reject actions
  const handleStatusUpdate = (id: number, newStatus: string) => {
    setGatePasses(
      gatePasses.map((pass) =>
        pass.id === id ? { ...pass, status: newStatus } : pass,
      ),
    );
  };

  // Function to get status badge styles
  const getStatusBadgeStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-gradient-to-r from-cambridge-blue/20 to-linen/20 text-cambridge-blue border border-cambridge-blue/30";
      case "pending":
        return "bg-gradient-to-r from-hunyadi-yellow/20 to-tea-rose-red/20 text-hunyadi-yellow border border-hunyadi-yellow/30";
      case "rejected":
        return "bg-gradient-to-r from-light-coral/20 to-tea-rose-red/20 text-light-coral border border-light-coral/30";
      default:
        return "bg-gradient-to-r from-cambridge-blue/10 to-linen/10 text-cambridge-blue/70 border border-cambridge-blue/20";
    }
  };

  // Function to get visit type icon
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "delivery":
        return (
          <svg
            className="text-cambridge-blue h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        );
      case "guest":
        return (
          <svg
            className="text-cambridge-blue h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "service":
        return (
          <svg
            className="text-cambridge-blue h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="text-cambridge-blue h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
    }
  };

  return (
    <AuthGuard>
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br pb-12 ${inter.className}`}
      >
        {/* Pre-Approve Guest Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card shadow-soft w-full max-w-md rounded-2xl p-8"
              >
                <h2 className="text-cambridge-blue mb-6 text-2xl font-bold">
                  Pre-Approve a Guest
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="text-cambridge-blue mb-3 block text-sm font-semibold">
                      Visitor Name
                    </label>
                    <input
                      type="text"
                      className="input-modern w-full"
                      value={formData.visitor}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          visitor: e.target.value,
                        }))
                      }
                      required
                      placeholder="Enter visitor name"
                    />
                  </div>
                  <div className="mb-8">
                    <label className="text-cambridge-blue mb-3 block text-sm font-semibold">
                      Visit Type
                    </label>
                    <select
                      className="input-modern w-full"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select visit type</option>
                      <option value="Guest">Guest</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Service">Service</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary flex-1">
                      Pre-Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="page-container py-12 sm:py-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-cambridge-blue mb-3 text-4xl font-bold">
                  Gate Management
                </h1>
                <p className="text-cambridge-blue/70 text-lg">
                  Manage visitor access and gate passes
                </p>
              </div>

              {/* Pre-Approve Guest Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Pre-Approve a Guest
              </motion.button>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {gatePasses.filter((pass) => pass.status === "Approved").length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Approved Today
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {gatePasses.filter((pass) => pass.status === "Pending").length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Pending
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {gatePasses.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Total Requests
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {gatePasses.filter((pass) => pass.type === "Delivery").length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Deliveries
              </p>
            </motion.div>
          </motion.div>

          {/* Recent Gate Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-cambridge-blue text-2xl font-bold">
                Recent Gate Activity
              </h2>
              <Link
                href="/gate/history"
                className="text-cambridge-blue hover:text-cambridge-blue/80 text-lg font-semibold transition-colors"
              >
                View All →
              </Link>
            </div>

            {/* Gate Passes List */}
            <div className="space-y-6">
              {gatePasses.map((pass, index) => (
                <motion.div
                  key={pass.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card shadow-soft hover:shadow-soft-hover rounded-2xl p-8 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-6">
                      {/* Type Icon */}
                      <div className="from-cambridge-blue/20 to-linen/20 flex-shrink-0 rounded-2xl bg-gradient-to-br p-4">
                        {getTypeIcon(pass.type)}
                      </div>

                      {/* Visitor Info */}
                      <div className="flex-1">
                        <h3 className="text-cambridge-blue mb-2 text-xl font-bold">
                          {pass.visitor}
                        </h3>
                        <div className="text-cambridge-blue/70 flex items-center gap-3 text-base">
                          <span className="font-semibold">{pass.type}</span>
                          <span>•</span>
                          <span>{pass.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-bold ${getStatusBadgeStyles(
                        pass.status,
                      )}`}
                    >
                      {pass.status}
                    </span>
                  </div>

                  {/* Action Buttons for Pending */}
                  {pass.status === "Pending" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 flex gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusUpdate(pass.id, "Approved")}
                        className="btn-primary flex-1 py-3 text-base font-semibold"
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusUpdate(pass.id, "Rejected")}
                        className="btn-secondary flex-1 py-3 text-base font-semibold"
                      >
                        Reject
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {gatePasses.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card shadow-soft rounded-2xl p-16 text-center"
              >
                <div className="from-cambridge-blue/20 to-linen/20 mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br">
                  <svg
                    className="text-cambridge-blue h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-cambridge-blue mt-4 text-lg font-medium">
                  No gate activity
                </h3>
                <p className="text-cambridge-blue/70 mt-2">
                  No recent gate passes or visitor requests found.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default GatePage;
