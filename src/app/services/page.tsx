"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

interface Service {
  id: number;
  category: string;
  name: string;
  contact: string;
  description: string;
  favorited: boolean;
}

const ServicesPage = () => {
  const society = db.elysium123;

  // Enhanced services data for better demonstration
  const initialServicesData: Service[] = [
    ...society.services,
    // Adding more services to demonstrate category grouping
    {
      id: 5,
      category: "Pre-Approved Plumbers",
      name: "Sharma Water Works",
      contact: "9123456789",
      description: "Expert in pipe fitting and water tank cleaning.",
      favorited: false,
    },
    {
      id: 6,
      category: "Pre-Approved Electricians",
      name: "Modern Electric Solutions",
      contact: "9234567890",
      description: "Residential and commercial electrical work.",
      favorited: false,
    },
    {
      id: 7,
      category: "Pre-Approved Electricians",
      name: "PowerFix Services",
      contact: "9345678901",
      description: "Emergency electrical repairs and installations.",
      favorited: false,
    },
    {
      id: 8,
      category: "Cleaning Services",
      name: "SparkleClean",
      contact: "9456789012",
      description: "Deep cleaning for homes and offices.",
      favorited: false,
    },
    {
      id: 9,
      category: "Cleaning Services",
      name: "Fresh Home Cleaners",
      contact: "9567890123",
      description: "Eco-friendly cleaning solutions.",
      favorited: false,
    },
    {
      id: 10,
      category: "Home Maintenance",
      name: "FixIt All",
      contact: "9678901234",
      description: "General repairs and maintenance services.",
      favorited: false,
    },
    {
      id: 11,
      category: "Home Maintenance",
      name: "Reliable Repairs",
      contact: "9789012345",
      description: "Carpentry, painting, and minor repairs.",
      favorited: false,
    },
    {
      id: 12,
      category: "Security Services",
      name: "Guardian Security",
      contact: "9890123456",
      description: "24/7 security and surveillance solutions.",
      favorited: false,
    },
    {
      id: 13,
      category: "Delivery Services",
      name: "QuickDelivery",
      contact: "9901234567",
      description: "Fast and reliable delivery within the society.",
      favorited: false,
    },
  ];

  // State management
  const [services, setServices] = useState<Service[]>(initialServicesData);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormData, setAddFormData] = useState({
    category: "",
    name: "",
    contact: "",
    description: "",
  });

  // Helper functions
  const toggleFavorite = (serviceId: number) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, favorited: !service.favorited }
          : service,
      ),
    );
  };

  // Copy to clipboard function that works in iframes
  // Add service provider functionality
  const handleAddFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: services.length + 1,
      category: addFormData.category,
      name: addFormData.name,
      contact: addFormData.contact,
      description: addFormData.description,
      favorited: false,
    };

    setServices([...services, newService]);
    setShowAddModal(false);
    setAddFormData({ category: "", name: "", contact: "", description: "" });
    setToastMessage(`Added ${newService.name} to services`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToastMessage("Number copied to clipboard!");
        return;
      }

      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        showToastMessage("Number copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        showToastMessage("Failed to copy number");
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      showToastMessage("Failed to copy number");
    }
  };

  // Show toast message
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Group services by category
  const servicesByCategory = services.reduce(
    (groups, service) => {
      const category = service.category;
      groups[category] ??= [];
      groups[category].push(service);
      return groups;
    },
    {} as Record<string, Service[]>,
  );

  // Function to format phone number for calling
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  // Function to get category icon
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("plumber")) {
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      );
    } else if (lowerCategory.includes("electric")) {
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    } else if (lowerCategory.includes("clean")) {
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else if (lowerCategory.includes("maintenance")) {
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
    } else if (lowerCategory.includes("security")) {
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    } else {
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
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
        {/* Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="glass-card text-cambridge-blue shadow-soft fixed top-6 right-6 z-50 rounded-2xl px-8 py-4"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 py-12 sm:py-16">
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
                  Services Directory
                </h1>
                <p className="text-cambridge-blue/70 text-lg">
                  Pre-approved service providers for your community
                </p>
              </div>

              {/* Add Service Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
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
                Add Service Provider
              </motion.button>
            </div>
          </motion.div>

          {/* Services Stats */}
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
                {services.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Total Services
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {Object.keys(servicesByCategory).length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Categories
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {
                  services.filter(
                    (service) =>
                      service.description.includes("24/7") ||
                      service.description.includes("Emergency"),
                  ).length
                }
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                24/7 Services
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card shadow-soft rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue mb-2 text-3xl font-bold">
                {Math.round(
                  (services.length / Object.keys(servicesByCategory).length) *
                    10,
                ) / 10}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Avg. per Category
              </p>
            </motion.div>
          </motion.div>

          {/* Services by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-12"
          >
            {Object.entries(servicesByCategory).map(
              ([category, services], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + categoryIndex * 0.1,
                  }}
                  className="space-y-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <div className="from-cambridge-blue/20 to-linen/20 rounded-2xl bg-gradient-to-br p-3">
                      {getCategoryIcon(category)}
                    </div>
                    <h2 className="text-cambridge-blue text-2xl font-bold tracking-wide uppercase">
                      {category}
                    </h2>
                    <div className="border-cambridge-blue/20 flex-1 border-t-2"></div>
                    <span className="text-cambridge-blue/70 text-base font-semibold">
                      {services.length}{" "}
                      {services.length === 1 ? "service" : "services"}
                    </span>
                  </div>

                  {/* Services Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, serviceIndex) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay:
                            0.6 + categoryIndex * 0.1 + serviceIndex * 0.05,
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-card shadow-soft hover:shadow-soft-hover rounded-2xl p-8 transition-all duration-300"
                      >
                        {/* Service Header */}
                        <div className="mb-4">
                          <h3 className="text-cambridge-blue text-xl font-bold">
                            {service.name}
                          </h3>
                        </div>

                        {/* Service Description */}
                        <p className="text-cambridge-blue/70 mb-6 line-clamp-2 text-base">
                          {service.description}
                        </p>

                        {/* Contact Section */}
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center gap-3">
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
                            <span className="text-cambridge-blue/80 text-base">
                              {formatPhoneNumber(service.contact)}
                            </span>
                          </div>

                          {/* Tappable Contact Button */}
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={`tel:${service.contact}`}
                            className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
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
                            Call
                          </motion.a>
                        </div>

                        {/* Additional Actions */}
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => copyToClipboard(service.contact)}
                            className="btn-secondary flex-1 py-2 text-sm font-semibold"
                          >
                            Copy Number
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(service.id)}
                            className="border-cambridge-blue/30 text-cambridge-blue hover:bg-cambridge-blue/10 rounded-2xl border bg-white/60 p-2 transition-colors"
                          >
                            {service.favorited ? (
                              <svg
                                className="text-light-coral h-5 w-5"
                                fill="currentColor"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            ) : (
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
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>

          {/* Empty State */}
          {services.length === 0 && (
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No services available
              </h3>
              <p className="mt-2 text-gray-600">
                Be the first to add a service provider to your community
                directory!
              </p>
              <button className="bg-brand hover:bg-brand-dark mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-200">
                Add First Service Provider
              </button>
            </div>
          )}
        </div>

        {/* Add Service Provider Modal */}
        {showAddModal && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Service Provider
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={addFormData.category}
                    onChange={handleAddFormChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    <option value="Pre-Approved Plumbers">
                      Pre-Approved Plumbers
                    </option>
                    <option value="Pre-Approved Electricians">
                      Pre-Approved Electricians
                    </option>
                    <option value="Cleaning Services">Cleaning Services</option>
                    <option value="Delivery Services">Delivery Services</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Service Provider Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={addFormData.name}
                    onChange={handleAddFormChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter provider name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={addFormData.contact}
                    onChange={handleAddFormChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter contact number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={addFormData.description}
                    onChange={handleAddFormChange}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Describe the services offered"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    Add Provider
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default ServicesPage;
