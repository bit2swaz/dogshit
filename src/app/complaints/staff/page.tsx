"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const StaffContactsPage = () => {
  const society = db.elysium123;
  const staffMembers = society.staff;
  const [toast, setToast] = useState("");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  // Copy to clipboard function with fallback for iframe environments
  const copyToClipboard = async (text: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for iframe or insecure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setToast(`Contact number copied: ${text}`);
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setToast("Failed to copy contact number");
      setTimeout(() => setToast(""), 3000);
    }
  };

  // Function to format phone number for display
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
  };

  // Function to get role icon
  const getRoleIcon = (role: string) => {
    const lowerRole = role.toLowerCase();

    if (lowerRole.includes("security")) {
      return (
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    } else if (lowerRole.includes("electric")) {
      return (
        <svg
          className="h-6 w-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    } else if (
      lowerRole.includes("maintenance") ||
      lowerRole.includes("plumber")
    ) {
      return (
        <svg
          className="h-6 w-6 text-blue-600"
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
    } else if (lowerRole.includes("manager") || lowerRole.includes("admin")) {
      return (
        <svg
          className="h-6 w-6 text-purple-600"
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
    } else {
      return (
        <svg
          className="h-6 w-6 text-gray-600"
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
      );
    }
  };

  return (
    <AuthGuard>
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Official Staff Contacts
                </h1>
                <p className="text-gray-600">
                  Get in touch with our management and maintenance team
                </p>
              </div>

              {/* Back Button */}
              <Link
                href="/complaints"
                className="focus:ring-brand inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Complaints
              </Link>
            </div>
          </div>

          {/* Staff Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {staffMembers.length}
              </h3>
              <p className="text-sm text-gray-600">Staff Members</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
              <p className="text-sm text-gray-600">Availability</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  new Set(staffMembers.map((staff) => staff.role.split(" ")[0]))
                    .size
                }
              </h3>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800">
                  Emergency Contact
                </h3>
                <p className="text-sm text-red-700">
                  For life-threatening emergencies, please call{" "}
                  <strong>112</strong> or your local emergency services first.
                </p>
              </div>
            </div>
          </div>

          {/* Staff Members List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {staffMembers.map((staff) => (
                <div
                  key={staff.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  {/* Staff Header */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-full bg-gray-100 p-3">
                      {getRoleIcon(staff.role)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {staff.name}
                      </h3>
                      <p className="text-gray-600">{staff.role}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {formatPhoneNumber(staff.contact)}
                        </span>
                      </div>

                      {/* Tappable Contact Button */}
                      <a
                        href={`tel:${staff.contact}`}
                        className="bg-brand hover:bg-brand-dark focus:ring-brand inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Call Now
                      </a>
                    </div>

                    {/* Additional Contact Options */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(staff.contact)}
                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Copy Number
                      </button>
                      <button
                        onClick={() =>
                          setActiveChatId(
                            activeChatId === staff.id ? null : staff.id,
                          )
                        }
                        className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Availability Indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-500">
                      Available for contact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {staffMembers.length === 0 && (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No staff contacts available
              </h3>
              <p className="mt-2 text-gray-600">
                Staff contact information will be displayed here when available.
              </p>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-800">Office Hours</h3>
                <p className="text-sm text-blue-700">
                  Our staff is available for non-emergency matters from 9:00 AM
                  to 6:00 PM, Monday through Saturday. Emergency maintenance
                  issues are addressed 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform">
            <div className="rounded-lg border border-green-300 bg-green-100 px-4 py-2 text-green-800 shadow-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
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
                {toast}
              </div>
            </div>
          </div>
        )}

        {/* Chatbox */}
        {activeChatId !== null && (
          <div className="fixed right-4 bottom-4 z-50 w-80 rounded-lg border border-gray-300 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <h3 className="font-semibold text-gray-900">
                  Chat with{" "}
                  {staffMembers.find((s) => s.id === activeChatId)?.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveChatId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-60 overflow-y-auto p-4">
              <div className="mb-4 rounded-lg bg-gray-100 p-3">
                <p className="text-sm text-gray-600">
                  Hello! This is a demo chatbox. In a real application, this
                  would connect to a messaging system.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default StaffContactsPage;
