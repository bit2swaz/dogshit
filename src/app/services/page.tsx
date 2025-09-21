import { Inter } from "next/font/google";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const ServicesPage = () => {
  const society = db.elysium123;

  // Enhanced services data for better demonstration
  // In a real app, this would come from the database
  const servicesData = [
    ...society.services,
    // Adding more services to demonstrate category grouping
    {
      id: 2,
      category: "Pre-Approved Plumbers",
      name: "Sharma Water Works",
      contact: "9123456789",
      description: "Expert in pipe fitting and water tank cleaning.",
    },
    {
      id: 3,
      category: "Pre-Approved Electricians",
      name: "Modern Electric Solutions",
      contact: "9234567890",
      description: "Residential and commercial electrical work.",
    },
    {
      id: 4,
      category: "Pre-Approved Electricians",
      name: "PowerFix Services",
      contact: "9345678901",
      description: "Emergency electrical repairs and installations.",
    },
    {
      id: 5,
      category: "Cleaning Services",
      name: "SparkleClean",
      contact: "9456789012",
      description: "Deep cleaning for homes and offices.",
    },
    {
      id: 6,
      category: "Cleaning Services",
      name: "Fresh Home Cleaners",
      contact: "9567890123",
      description: "Eco-friendly cleaning solutions.",
    },
    {
      id: 7,
      category: "Home Maintenance",
      name: "FixIt All",
      contact: "9678901234",
      description: "General repairs and maintenance services.",
    },
    {
      id: 8,
      category: "Home Maintenance",
      name: "Reliable Repairs",
      contact: "9789012345",
      description: "Carpentry, painting, and minor repairs.",
    },
    {
      id: 9,
      category: "Security Services",
      name: "Guardian Security",
      contact: "9890123456",
      description: "24/7 security and surveillance solutions.",
    },
    {
      id: 10,
      category: "Delivery Services",
      name: "QuickDelivery",
      contact: "9901234567",
      description: "Fast and reliable delivery within the society.",
    },
  ];

  // Group services by category
  const servicesByCategory = servicesData.reduce(
    (groups, service) => {
      const category = service.category;
      groups[category] ??= [];
      groups[category].push(service);
      return groups;
    },
    {} as Record<string, typeof servicesData>,
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
          className="h-6 w-6 text-blue-600"
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
    } else if (lowerCategory.includes("clean")) {
      return (
        <svg
          className="h-6 w-6 text-green-600"
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
          className="h-6 w-6 text-purple-600"
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
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
                  Services Directory
                </h1>
                <p className="text-gray-600">
                  Pre-approved service providers for your community
                </p>
              </div>

              {/* Add Service Button */}
              <button className="bg-brand hover:bg-brand-dark focus:ring-brand inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Service Provider
              </button>
            </div>
          </div>

          {/* Services Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {servicesData.length}
              </h3>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {Object.keys(servicesByCategory).length}
              </h3>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  servicesData.filter(
                    (service) =>
                      service.description.includes("24/7") ||
                      service.description.includes("Emergency"),
                  ).length
                }
              </h3>
              <p className="text-sm text-gray-600">24/7 Services</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (servicesData.length /
                    Object.keys(servicesByCategory).length) *
                    10,
                ) / 10}
              </h3>
              <p className="text-sm text-gray-600">Avg. per Category</p>
            </div>
          </div>

          {/* Services by Category */}
          <div className="space-y-8">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category)}
                  <h2 className="text-xl font-bold tracking-wide text-gray-900 uppercase">
                    {category}
                  </h2>
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-sm text-gray-500">
                    {services.length}{" "}
                    {services.length === 1 ? "service" : "services"}
                  </span>
                </div>

                {/* Services Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      {/* Service Header */}
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {service.name}
                        </h3>
                      </div>

                      {/* Service Description */}
                      <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                        {service.description}
                      </p>

                      {/* Contact Section */}
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
                            {formatPhoneNumber(service.contact)}
                          </span>
                        </div>

                        {/* Tappable Contact Button */}
                        <a
                          href={`tel:${service.contact}`}
                          className="bg-brand hover:bg-brand-dark focus:ring-brand inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none"
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
                        </a>
                      </div>

                      {/* Additional Actions */}
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                          View Details
                        </button>
                        <button className="rounded-md border border-gray-300 bg-white p-1.5 text-gray-600 transition-colors hover:bg-gray-50">
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {servicesData.length === 0 && (
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
      </div>
    </AuthGuard>
  );
};

export default ServicesPage;
