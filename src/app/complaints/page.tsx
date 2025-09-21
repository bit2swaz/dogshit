"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

// For demo purposes, we'll use a simple state management
// In a real app, this would integrate with your backend API
const ComplaintsPage = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    urgency: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mock complaints data - in a real app, this would come from the server
  const complaints = [
    {
      id: 1,
      category: "Roads",
      description: "There's a massive pothole on the main street.",
      status: "Submitted",
      timestamp: "2025-09-21T08:00:00Z",
    },
    {
      id: 2,
      category: "Water Supply",
      description: "No water supply since yesterday morning in Block A.",
      status: "In Progress",
      timestamp: "2025-09-20T15:30:00Z",
    },
    {
      id: 3,
      category: "Electricity",
      description: "Street lights are not working in the main pathway.",
      status: "Resolved",
      timestamp: "2025-09-19T10:15:00Z",
    },
    {
      id: 4,
      category: "Noise",
      description: "Construction noise starting very early in the morning.",
      status: "Submitted",
      timestamp: "2025-09-18T07:45:00Z",
    },
  ];

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
        return "bg-yellow-100 text-yellow-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complaints</h1>
            <p className="text-gray-600">
              Submit and track your community complaints
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 rounded-lg border border-green-300 bg-green-100 p-4 text-green-800">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
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
            </div>
          )}

          {/* Submit Complaint Form */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              Submit a New Complaint
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="focus:border-brand focus:ring-brand focus:ring-opacity-20 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:outline-none"
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
                  className="mb-2 block text-sm font-medium text-gray-700"
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
                  className="focus:border-brand focus:ring-brand focus:ring-opacity-20 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Urgency Level */}
              <div>
                <label
                  htmlFor="urgency"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="focus:border-brand focus:ring-brand focus:ring-opacity-20 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:bg-white focus:ring-2 focus:outline-none"
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
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.category.trim() ||
                  !formData.description.trim()
                }
                className="bg-brand hover:bg-brand-dark focus:ring-brand w-full rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
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
              </button>
            </form>
          </div>

          {/* Official Staff Contacts Card */}
          <Link
            href="/complaints/staff"
            className="hover:border-brand mb-8 block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-brand rounded-full p-3">
                  <svg
                    className="h-6 w-6 text-white"
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    View Official Staff Contacts
                  </h3>
                  <p className="text-gray-600">
                    Get in touch with management and maintenance staff
                  </p>
                </div>
              </div>
              <svg
                className="h-5 w-5 text-gray-400"
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

          {/* Recent Complaints */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Complaints
              </h2>
              <span className="text-sm text-gray-500">
                {complaints.length} total complaints
              </span>
            </div>

            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">
                          #{complaint.id}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {complaint.category}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </span>
                      </div>
                      <p className="mb-2 text-gray-600">
                        {complaint.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatTimestamp(complaint.timestamp)}
                      </p>
                    </div>
                    <button className="self-start rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {complaints.length === 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No complaints yet
              </h3>
              <p className="mt-2 text-gray-600">
                Your community complaints will appear here once submitted.
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ComplaintsPage;
