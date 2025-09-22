"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthGuard from "~/components/AuthGuard";
import { useAuth } from "~/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// TypeScript interface for complaints
interface Complaint {
  id: number;
  category: string;
  description: string;
  status: string;
  timestamp: string;
  author: string;
}

// For demo purposes, we'll use a simple state management
// In a real app, this would integrate with your backend API
const ComplaintsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    urgency: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );

  // Mock complaints data - in a real app, this would come from the server
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 1,
      category: "Roads",
      description: "There's a massive pothole on the main street.",
      status: "Submitted",
      timestamp: "2025-09-21T08:00:00Z",
      author: "John Doe",
    },
    {
      id: 2,
      category: "Water Supply",
      description: "No water supply since yesterday morning in Block A.",
      status: "In Progress",
      timestamp: "2025-09-20T15:30:00Z",
      author: "Jane Smith",
    },
    {
      id: 3,
      category: "Electricity",
      description: "Street lights are not working in the main pathway.",
      status: "Resolved",
      timestamp: "2025-09-19T10:15:00Z",
      author: "Mike Johnson",
    },
    {
      id: 4,
      category: "Noise",
      description: "Construction noise starting very early in the morning.",
      status: "Submitted",
      timestamp: "2025-09-18T07:45:00Z",
      author: "Sarah Wilson",
    },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newComplaint: Complaint = {
        id: complaints.length + 1,
        category: formData.category,
        description: formData.description,
        status: "Submitted",
        timestamp: new Date().toISOString(),
        author: user?.name ?? "Anonymous User",
      };

      // Add new complaint to the beginning of the list
      setComplaints([newComplaint, ...complaints]);

      setSuccessMessage("Your complaint has been submitted successfully!");
      setFormData({ category: "", description: "", urgency: "medium" });
      setIsSubmitting(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-gradient-to-r from-hunyadi-yellow/20 to-tea-rose-red/20 text-hunyadi-yellow border border-hunyadi-yellow/30";
      case "in progress":
        return "bg-gradient-to-r from-cambridge-blue/20 to-linen/20 text-cambridge-blue border border-cambridge-blue/30";
      case "resolved":
        return "bg-gradient-to-r from-cambridge-blue/20 to-linen/20 text-cambridge-blue border border-cambridge-blue/30";
      default:
        return "bg-gradient-to-r from-cambridge-blue/10 to-linen/10 text-cambridge-blue/70 border border-cambridge-blue/20";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <AuthGuard>
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br pb-12 ${inter.className}`}
      >
        <div className="page-container py-12 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-cambridge-blue mb-3 text-4xl font-bold">
              Complaints
            </h1>
            <p className="text-cambridge-blue/70 text-lg">
              Submit and track your community complaints
            </p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card text-cambridge-blue shadow-soft mb-8 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {successMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Complaint Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card shadow-soft mb-12 rounded-2xl p-8"
          >
            <h2 className="text-cambridge-blue mb-8 text-2xl font-bold">
              Submit a New Complaint
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Selection */}
              <div>
                <label
                  htmlFor="category"
                  className="text-cambridge-blue mb-3 block text-base font-semibold"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="input-modern w-full text-lg"
                >
                  <option value="">Select a category</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Roads">Roads & Infrastructure</option>
                  <option value="Noise">Noise Complaints</option>
                  <option value="Security">Security Issues</option>
                  <option value="Cleanliness">Cleanliness & Hygiene</option>
                  <option value="Parking">Parking Issues</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="text-cambridge-blue mb-3 block text-base font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Please provide detailed information about your complaint..."
                  className="input-modern w-full resize-none text-lg"
                />
              </div>

              {/* Urgency Level */}
              <div>
                <label
                  htmlFor="urgency"
                  className="text-cambridge-blue mb-3 block text-base font-semibold"
                >
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="input-modern w-full text-lg"
                >
                  <option value="low">Low - Can wait a few days</option>
                  <option value="medium">
                    Medium - Should be addressed soon
                  </option>
                  <option value="high">High - Needs immediate attention</option>
                  <option value="emergency">
                    Emergency - Urgent safety concern
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.category.trim() ||
                  !formData.description.trim()
                }
                className="btn-primary w-full py-4 text-xl font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="h-6 w-6 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Complaint"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Official Staff Contacts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <Link
              href="/complaints/staff"
              className="glass-card shadow-soft hover:shadow-soft-hover mb-12 block rounded-2xl p-8 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="from-cambridge-blue/20 to-linen/20 rounded-2xl bg-gradient-to-br p-4">
                    <svg
                      className="text-cambridge-blue h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cambridge-blue text-xl font-bold">
                      View Official Staff Contacts
                    </h3>
                    <p className="text-cambridge-blue/70 text-base">
                      Get in touch with management and maintenance staff
                    </p>
                  </div>
                </div>
                <svg
                  className="text-cambridge-blue/50 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Recent Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-cambridge-blue text-2xl font-bold">
                Recent Complaints
              </h2>
              <span className="text-cambridge-blue/70 text-base font-semibold">
                {complaints.length} total complaints
              </span>
            </div>

            <div className="space-y-6">
              {complaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card shadow-soft hover:shadow-soft-hover rounded-2xl p-8 transition-all duration-300"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="text-cambridge-blue text-base font-bold">
                          #{complaint.id}
                        </span>
                        <span className="from-cambridge-blue/20 to-linen/20 text-cambridge-blue rounded-2xl bg-gradient-to-br px-4 py-2 text-sm font-bold">
                          {complaint.category}
                        </span>
                        <span
                          className={`rounded-2xl px-4 py-2 text-sm font-bold ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-cambridge-blue/80 mb-4 text-base">
                        {complaint.description}
                      </p>
                      <div className="text-cambridge-blue/60 flex items-center gap-4 text-sm">
                        <span>By {complaint.author}</span>
                        <span>•</span>
                        <span>{formatTimestamp(complaint.timestamp)}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedComplaint(complaint)}
                      className="btn-secondary self-start px-6 py-3 text-sm font-semibold"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Empty State */}
          {complaints.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card shadow-soft rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                className="from-cambridge-blue/20 to-linen/20 mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br p-5"
              >
                <svg
                  className="text-cambridge-blue h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-cambridge-blue mb-3 text-2xl font-bold">
                No complaints yet
              </h3>
              <p className="text-cambridge-blue/60">
                When complaints are submitted, they&apos;ll appear here for
                review and tracking.
              </p>
            </motion.div>
          )}
        </div>

        {/* Complaint Details Modal */}
        <AnimatePresence>
          {selectedComplaint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-cambridge-blue/20 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
              onClick={() => setSelectedComplaint(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="glass-card shadow-soft relative mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedComplaint(null)}
                  className="from-tea-rose-red/20 to-light-coral/20 text-tea-rose-red hover:from-tea-rose-red/30 hover:to-light-coral/30 absolute top-6 right-6 rounded-2xl bg-gradient-to-r p-3 transition-all duration-300"
                >
                  ✕
                </motion.button>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-cambridge-blue mb-6 text-3xl font-bold">
                    Complaint Details
                  </h3>
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-cambridge-blue text-lg font-bold">
                        #{selectedComplaint.id}
                      </span>
                      <span className="from-cambridge-blue/20 to-linen/20 text-cambridge-blue rounded-2xl bg-gradient-to-br px-4 py-2 font-bold">
                        {selectedComplaint.category}
                      </span>
                      <span
                        className={`rounded-2xl px-4 py-2 font-bold ${getStatusColor(selectedComplaint.status)}`}
                      >
                        {selectedComplaint.status}
                      </span>
                    </div>
                    <div className="from-linen/30 to-tea-rose-red/10 rounded-2xl bg-gradient-to-br p-6">
                      <h4 className="text-cambridge-blue mb-3 text-lg font-bold">
                        Description
                      </h4>
                      <p className="text-cambridge-blue/80">
                        {selectedComplaint.description}
                      </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="text-cambridge-blue mb-2 text-lg font-bold">
                          Submitted by
                        </h4>
                        <p className="text-cambridge-blue/80">
                          {selectedComplaint.author}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-cambridge-blue mb-2 text-lg font-bold">
                          Date
                        </h4>
                        <p className="text-cambridge-blue/80">
                          {formatTimestamp(selectedComplaint.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
};

export default ComplaintsPage;
