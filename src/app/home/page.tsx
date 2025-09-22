"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const society = db.elysium123;

  return (
    <AuthGuard>
      <div className={`min-h-screen bg-stone-50 ${inter.className}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-stone-900">
              Welcome to {society.name}
            </h1>
            <p className="mb-8 text-lg text-stone-600">
              Your community connection platform
            </p>
          </div>

          {/* Summary Stats */}
          <motion.div
            className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            <motion.div
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {society.forum.length}
              </h3>
              <p className="text-sm text-gray-600">Forum Posts</p>
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {society.marketplace.length}
              </h3>
              <p className="text-sm text-gray-600">Marketplace Items</p>
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {society.gatePasses.length}
              </h3>
              <p className="text-sm text-gray-600">Gate Passes</p>
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {society.complaints.length}
              </h3>
              <p className="text-sm text-gray-600">Complaints</p>
            </motion.div>
          </motion.div>

          {/* Dashboard Cards - Responsive Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, staggerChildren: 0.15 }}
          >
            {/* Recent Announcements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href="/forum"
                className="group hover:border-brand block cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Recent Announcements
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {society.forum.length} forum posts
                </p>
                <div className="space-y-2">
                  {society.forum.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className="rounded border-l-4 border-amber-500 bg-gray-50 p-2"
                    >
                      <p className="text-xs font-medium text-gray-900">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-600">by {post.author}</p>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>

            {/* New Marketplace Items Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href="/marketplace"
                className="group hover:border-brand block cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 group-hover:bg-green-100">
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  New Marketplace Items
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {society.marketplace.length} items available
                </p>
                <div className="space-y-2">
                  {society.marketplace.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="rounded border-l-4 border-orange-500 bg-gray-50 p-2"
                    >
                      <p className="text-xs font-medium text-gray-900">
                        {item.item}
                      </p>
                      <p className="text-xs text-gray-600">
                        ₹{item.price} by {item.seller}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>

            {/* Recent Gate Activity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href="/gate"
                className="group hover:border-brand col-span-2 block cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl md:col-span-1"
              >
                <div className="mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 group-hover:bg-purple-100">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Recent Gate Activity
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {society.gatePasses.length} recent activities
                </p>
                <div className="space-y-2">
                  {society.gatePasses.slice(0, 2).map((activity) => (
                    <div
                      key={activity.id}
                      className="rounded border-l-4 border-yellow-500 bg-gray-50 p-2"
                    >
                      <p className="text-xs font-medium text-gray-900">
                        {activity.visitor}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.type} • {activity.status} • {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default HomePage;
