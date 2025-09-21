"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { useAuth } from "~/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="border-brand mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Access Restricted
                </h2>

                <p className="mb-6 text-gray-600">
                  This page is currently disabled. Please log in to view this
                  page and access your community features.
                </p>

                <Link
                  href="/login"
                  className="bg-brand hover:bg-brand-dark focus:ring-brand inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Go to Login
                </Link>

                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Don&apos;t have an account? Contact your society
                    administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;
