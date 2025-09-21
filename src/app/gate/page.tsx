import Link from "next/link";
import { Inter } from "next/font/google";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const GatePage = () => {
  const society = db.elysium123;

  // Function to get status badge styles
  const getStatusBadgeStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Function to get visit type icon
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "delivery":
        return (
          <svg
            className="h-5 w-5 text-blue-600"
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
            className="h-5 w-5 text-purple-600"
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
            className="h-5 w-5 text-green-600"
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
            className="h-5 w-5 text-gray-600"
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
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Gate Management
                </h1>
                <p className="text-gray-600">
                  Manage visitor access and gate passes
                </p>
              </div>

              {/* Pre-Approve Guest Button */}
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
                Pre-Approve a Guest
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  society.gatePasses.filter(
                    (pass) => pass.status === "Approved",
                  ).length
                }
              </h3>
              <p className="text-sm text-gray-600">Approved Today</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  society.gatePasses.filter((pass) => pass.status === "Pending")
                    .length
                }
              </h3>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {society.gatePasses.length}
              </h3>
              <p className="text-sm text-gray-600">Total Requests</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  society.gatePasses.filter((pass) => pass.type === "Delivery")
                    .length
                }
              </h3>
              <p className="text-sm text-gray-600">Deliveries</p>
            </div>
          </div>

          {/* Recent Gate Activity */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Gate Activity
              </h2>
              <Link
                href="/gate/history"
                className="text-brand hover:text-brand-dark text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            {/* Gate Passes List */}
            <div className="space-y-4">
              {society.gatePasses.map((pass) => (
                <div
                  key={pass.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Type Icon */}
                      <div className="flex-shrink-0 rounded-full bg-gray-50 p-2">
                        {getTypeIcon(pass.type)}
                      </div>

                      {/* Visitor Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {pass.visitor}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">{pass.type}</span>
                          <span>•</span>
                          <span>{pass.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeStyles(
                        pass.status,
                      )}`}
                    >
                      {pass.status}
                    </span>
                  </div>

                  {/* Action Buttons for Pending */}
                  {pass.status === "Pending" && (
                    <div className="mt-4 flex gap-2">
                      <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none">
                        Approve
                      </button>
                      <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {society.gatePasses.length === 0 && (
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No gate activity
                </h3>
                <p className="mt-2 text-gray-600">
                  No recent gate passes or visitor requests found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default GatePage;
