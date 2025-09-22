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
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br ${inter.className}`}
      >
        <div className="page-container py-12 sm:py-16">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-cambridge-blue mb-4 text-4xl font-bold sm:text-5xl">
              Welcome to {society.name}
            </h1>
            <p className="text-cambridge-blue/80 text-lg sm:text-xl">
              Your community connection platform
            </p>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1, delay: 0.2 }}
          >
            <motion.div
              className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {society.forum.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Forum Posts
              </p>
            </motion.div>
            <motion.div
              className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {society.marketplace.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Marketplace Items
              </p>
            </motion.div>
            <motion.div
              className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {society.gatePasses.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Gate Passes
              </p>
            </motion.div>
            <motion.div
              className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {society.complaints.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Complaints
              </p>
            </motion.div>
          </motion.div>

          {/* Dashboard Cards - Responsive Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, staggerChildren: 0.15 }}
          >
            {/* Recent Announcements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href="/forum"
                className="glass-card group shadow-soft hover:shadow-soft-hover block cursor-pointer rounded-2xl p-6 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="from-hunyadi-yellow/20 to-light-coral/20 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-all group-hover:scale-110">
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
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-cambridge-blue mb-2 text-lg font-semibold">
                  Recent Announcements
                </h3>
                <p className="text-cambridge-blue/70 mb-4 text-sm">
                  {society.forum.length} forum posts
                </p>
                <div className="space-y-2">
                  {society.forum.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className="border-hunyadi-yellow rounded-xl border-l-4 bg-white/60 p-3 backdrop-blur-sm"
                    >
                      <p className="text-cambridge-blue text-xs font-medium">
                        {post.title}
                      </p>
                      <p className="text-cambridge-blue/60 text-xs">
                        by {post.author}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>

            {/* New Marketplace Items Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href="/marketplace"
                className="glass-card group shadow-soft hover:shadow-soft-hover block cursor-pointer rounded-2xl p-6 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="from-tea-rose-red/20 to-hunyadi-yellow/20 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-all group-hover:scale-110">
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-cambridge-blue mb-2 text-lg font-semibold">
                  New Marketplace Items
                </h3>
                <p className="text-cambridge-blue/70 mb-4 text-sm">
                  {society.marketplace.length} items available
                </p>
                <div className="space-y-2">
                  {society.marketplace.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="border-light-coral rounded-xl border-l-4 bg-white/60 p-3 backdrop-blur-sm"
                    >
                      <p className="text-cambridge-blue text-xs font-medium">
                        {item.item}
                      </p>
                      <p className="text-cambridge-blue/60 text-xs">
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
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link
                href="/gate"
                className="glass-card group shadow-soft hover:shadow-soft-hover block cursor-pointer rounded-2xl p-6 transition-all duration-300 md:col-span-1"
              >
                <div className="mb-4">
                  <div className="from-cambridge-blue/20 to-linen/20 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-all group-hover:scale-110">
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
                  </div>
                </div>
                <h3 className="text-cambridge-blue mb-2 text-lg font-semibold">
                  Recent Gate Activity
                </h3>
                <p className="text-cambridge-blue/70 mb-4 text-sm">
                  {society.gatePasses.length} recent activities
                </p>
                <div className="space-y-2">
                  {society.gatePasses.slice(0, 2).map((activity) => (
                    <div
                      key={activity.id}
                      className="border-tea-rose-red rounded-xl border-l-4 bg-white/60 p-3 backdrop-blur-sm"
                    >
                      <p className="text-cambridge-blue text-xs font-medium">
                        {activity.visitor}
                      </p>
                      <p className="text-cambridge-blue/60 text-xs">
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
