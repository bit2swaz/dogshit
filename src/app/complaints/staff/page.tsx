"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const StaffContactsPage = () => {
  const society = db.elysium123;
  const staffMembers = society.staff;
  const [toast, setToast] = useState("");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Record<
      number,
      Array<{ id: number; text: string; sender: string; timestamp: string }>
    >
  >({});

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

  // Send message functionality
  const sendMessage = (staffId: number) => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: currentMessage,
      sender: "You",
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => ({
      ...prev,
      [staffId]: [...(prev[staffId] ?? []), newMessage],
    }));

    setCurrentMessage("");

    // Simulate staff response after a delay
    setTimeout(() => {
      const staffName =
        staffMembers.find((s) => s.id === staffId)?.name ?? "Staff";
      const autoResponse = {
        id: Date.now() + 1,
        text: `Thank you for your message! I'll get back to you as soon as possible. - ${staffName}`,
        sender: staffName,
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => ({
        ...prev,
        [staffId]: [...(prev[staffId] ?? []), autoResponse],
      }));
    }, 1000);
  };

  // Handle Enter key press in chat input
  const handleKeyPress = (e: React.KeyboardEvent, staffId: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(staffId);
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
          className="text-tea-rose-red h-6 w-6"
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
          className="text-hunyadi-yellow h-6 w-6"
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
    } else if (lowerRole.includes("manager") || lowerRole.includes("admin")) {
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
    } else {
      return (
        <svg
          className="text-cambridge-blue/70 h-6 w-6"
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
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br ${inter.className}`}
      >
        <div className="page-container">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-cambridge-blue text-4xl font-bold sm:text-5xl">
                  Official Staff Contacts
                </h1>
                <p className="text-cambridge-blue/70 mt-3 text-lg">
                  Get in touch with our management and maintenance team
                </p>
              </motion.div>

              {/* Back Button */}
              <Link
                href="/complaints"
                className="btn-secondary group inline-flex items-center gap-3 px-6 py-3 font-semibold"
              >
                <motion.svg
                  whileHover={{ x: -4 }}
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1"
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
                </motion.svg>
                Back to Complaints
              </Link>
            </div>
          </motion.div>

          {/* Staff Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card shadow-soft rounded-2xl p-8 text-center"
            >
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="text-cambridge-blue text-4xl font-bold"
              >
                {staffMembers.length}
              </motion.h3>
              <p className="text-cambridge-blue/70 mt-2">Staff Members</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card shadow-soft rounded-2xl p-8 text-center"
            >
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="text-cambridge-blue text-4xl font-bold"
              >
                24/7
              </motion.h3>
              <p className="text-cambridge-blue/70 mt-2">Availability</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card shadow-soft rounded-2xl p-8 text-center"
            >
              <motion.h3
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="text-cambridge-blue text-4xl font-bold"
              >
                {
                  new Set(staffMembers.map((staff) => staff.role.split(" ")[0]))
                    .size
                }
              </motion.h3>
              <p className="text-cambridge-blue/70 mt-2">Departments</p>
            </motion.div>
          </motion.div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-tea-rose-red/30 from-tea-rose-red/10 to-light-coral/10 shadow-soft mb-12 rounded-3xl border bg-gradient-to-r p-8"
          >
            <div className="flex items-start gap-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.4, duration: 0.8 }}
                className="from-tea-rose-red/20 to-light-coral/20 rounded-2xl bg-gradient-to-br p-4"
              >
                <svg
                  className="text-tea-rose-red h-8 w-8"
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-tea-rose-red text-xl font-bold">
                  Emergency Contact
                </h3>
                <p className="text-cambridge-blue/80 mt-2">
                  For life-threatening emergencies, please call{" "}
                  <strong className="text-tea-rose-red">112</strong> or your
                  local emergency services first.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Staff Members List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-cambridge-blue text-3xl font-bold"
            >
              Contact Information
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              {staffMembers.map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card shadow-soft rounded-3xl p-8 transition-all duration-300"
                >
                  {/* Staff Header */}
                  <div className="mb-6 flex items-start gap-6">
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="from-cambridge-blue/20 to-linen/20 rounded-2xl bg-gradient-to-br p-4"
                    >
                      {getRoleIcon(staff.role)}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-cambridge-blue text-xl font-bold">
                        {staff.name}
                      </h3>
                      <p className="text-cambridge-blue/70 mt-1">
                        {staff.role}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="from-cambridge-blue/10 to-linen/10 rounded-xl bg-gradient-to-br p-2">
                          <svg
                            className="text-cambridge-blue h-5 w-5"
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
                        </div>
                        <span className="text-cambridge-blue font-medium">
                          {formatPhoneNumber(staff.contact)}
                        </span>
                      </div>

                      {/* Tappable Contact Button */}
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`tel:${staff.contact}`}
                        className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
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
                      </motion.a>
                    </div>

                    {/* Additional Contact Options */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => copyToClipboard(staff.contact)}
                        className="btn-secondary flex-1 px-4 py-3 text-sm font-semibold"
                      >
                        Copy Number
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setActiveChatId(
                            activeChatId === staff.id ? null : staff.id,
                          )
                        }
                        className="from-cambridge-blue/20 to-linen/20 text-cambridge-blue hover:from-cambridge-blue/30 hover:to-linen/30 rounded-2xl bg-gradient-to-r p-3 transition-all duration-300"
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
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Availability Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="from-cambridge-blue/5 to-linen/10 mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r p-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="from-cambridge-blue to-cambridge-blue/80 h-3 w-3 rounded-full bg-gradient-to-r"
                    ></motion.div>
                    <span className="text-cambridge-blue/80 text-sm font-medium">
                      Available for contact
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Empty State */}
          {staffMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card shadow-soft rounded-3xl p-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-cambridge-blue mb-3 text-2xl font-bold">
                No staff contacts available
              </h3>
              <p className="text-cambridge-blue/60">
                Staff contact information will be displayed here when available.
              </p>
            </motion.div>
          )}

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-cambridge-blue/30 from-cambridge-blue/10 to-linen/10 shadow-soft mt-12 rounded-3xl border bg-gradient-to-r p-8"
          >
            <div className="flex items-start gap-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.7, duration: 0.8 }}
                className="from-cambridge-blue/20 to-linen/20 rounded-2xl bg-gradient-to-br p-4"
              >
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-cambridge-blue text-xl font-bold">
                  Office Hours
                </h3>
                <p className="text-cambridge-blue/80 mt-2">
                  Our staff is available for non-emergency matters from 9:00 AM
                  to 6:00 PM, Monday through Saturday. Emergency maintenance
                  issues are addressed 24/7.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform"
          >
            <div className="glass-card border-cambridge-blue/30 shadow-soft rounded-2xl border px-6 py-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="from-cambridge-blue/20 to-linen/20 rounded-xl bg-gradient-to-r p-2"
                >
                  <svg
                    className="text-cambridge-blue h-5 w-5"
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
                </motion.div>
                <span className="text-cambridge-blue font-medium">{toast}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Chatbox */}
        {activeChatId !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-card shadow-soft fixed right-6 bottom-6 z-50 w-96 rounded-3xl"
          >
            <div className="border-cambridge-blue/20 flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="from-cambridge-blue to-cambridge-blue/80 h-3 w-3 rounded-full bg-gradient-to-r"
                ></motion.div>
                <h3 className="text-cambridge-blue font-bold">
                  Chat with{" "}
                  {staffMembers.find((s) => s.id === activeChatId)?.name}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveChatId(null)}
                className="from-tea-rose-red/20 to-light-coral/20 text-tea-rose-red hover:from-tea-rose-red/30 hover:to-light-coral/30 rounded-2xl bg-gradient-to-r p-2 transition-all duration-300"
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
              </motion.button>
            </div>
            <div className="h-72 overflow-y-auto p-6">
              {(chatMessages[activeChatId] ?? []).length > 0 ? (
                <div className="space-y-4">
                  {(chatMessages[activeChatId] ?? []).map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "You"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-4 py-3 ${
                          message.sender === "You"
                            ? "from-cambridge-blue to-cambridge-blue/90 bg-gradient-to-r text-white"
                            : "from-linen/50 to-tea-rose-red/20 text-cambridge-blue bg-gradient-to-r"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`mt-1 text-xs ${
                            message.sender === "You"
                              ? "text-white/70"
                              : "text-cambridge-blue/60"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="from-linen/30 to-tea-rose-red/10 mb-4 rounded-2xl bg-gradient-to-r p-4"
                >
                  <p className="text-cambridge-blue/70 text-sm">
                    Start a conversation with{" "}
                    {staffMembers.find((s) => s.id === activeChatId)?.name}.
                    They&apos;ll receive your messages and can respond
                    accordingly.
                  </p>
                </motion.div>
              )}
            </div>
            <div className="border-cambridge-blue/20 border-t p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) =>
                    activeChatId && handleKeyPress(e, activeChatId)
                  }
                  placeholder="Type your message..."
                  className="input-modern flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => activeChatId && sendMessage(activeChatId)}
                  disabled={!currentMessage.trim()}
                  className="btn-primary px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AuthGuard>
  );
};

export default StaffContactsPage;
