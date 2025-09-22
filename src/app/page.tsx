"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import db from "~/data/mock-db.json";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const society = db.elysium123;

  const features = [
    {
      icon: "💬",
      title: "Community Forum",
      description:
        "Stay connected with neighbors, share updates, and participate in community discussions.",
      color:
        "bg-gradient-to-br from-linen to-tea-rose-red border-2 border-white/30",
    },
    {
      icon: "🛒",
      title: "Marketplace",
      description:
        "Buy and sell items within your community. Safe, convenient, and trustworthy.",
      color:
        "bg-gradient-to-br from-tea-rose-red to-hunyadi-yellow border-2 border-white/30",
    },
    {
      icon: "🏠",
      title: "Gate Management",
      description:
        "Seamless visitor and delivery management with digital gate passes.",
      color:
        "bg-gradient-to-br from-hunyadi-yellow to-light-coral border-2 border-white/30",
    },
    {
      icon: "🔧",
      title: "Services Directory",
      description:
        "Access pre-approved service providers for all your home maintenance needs.",
      color:
        "bg-gradient-to-br from-cambridge-blue to-linen border-2 border-white/30",
    },
    {
      icon: "📋",
      title: "Complaints System",
      description:
        "Report issues and track resolution progress for community problems.",
      color:
        "bg-gradient-to-br from-light-coral to-tea-rose-red border-2 border-white/30",
    },
    {
      icon: "👥",
      title: "Staff Contacts",
      description:
        "Direct access to security, maintenance, and management staff.",
      color:
        "bg-gradient-to-br from-linen to-cambridge-blue border-2 border-white/30",
    },
  ];

  const stats = [
    { number: society.forum.length, label: "Forum Posts" },
    { number: society.marketplace.length, label: "Marketplace Items" },
    { number: society.gatePasses.length, label: "Gate Passes Today" },
    { number: society.services.length, label: "Trusted Services" },
  ];

  return (
    <div
      className={`from-linen via-tea-rose-red to-hunyadi-yellow min-h-screen bg-gradient-to-br ${inter.className}`}
    >
      {/* Hero Section */}
      <section className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="from-cambridge-blue via-hunyadi-yellow to-light-coral mb-6 bg-gradient-to-r bg-clip-text text-5xl leading-tight font-bold text-transparent md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Community,
              <br />
              Connected.
            </motion.h1>

            <motion.p
              className="mb-12 text-xl leading-relaxed text-gray-600 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience seamless community living with our comprehensive
              platform.
              <br />
              <span className="font-semibold text-indigo-600">
                Everything you need, all in one place.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/login"
                className="from-hunyadi-yellow to-light-coral transform rounded-full bg-gradient-to-r px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Join Your Community
              </Link>
              <button className="rounded-full border-2 border-gray-300 bg-white/50 px-8 py-4 text-lg font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400 hover:text-indigo-600">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/40 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <div className="text-cambridge-blue mb-2 text-4xl font-bold md:text-5xl">
                  {stat.number}
                </div>
                <div className="text-cambridge-blue/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Discover all the features that make community living effortless
              and enjoyable.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`rounded-3xl p-8 ${feature.color} shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
              >
                <div className="mb-6 text-5xl">{feature.icon}</div>
                <h3 className="text-cambridge-blue mb-4 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-cambridge-blue/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="from-linen/80 to-tea-rose-red/80 bg-gradient-to-r py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Active Community Life
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              See what&apos;s happening in your community right now.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Recent Forum Posts */}
            <motion.div
              className="rounded-3xl border-2 border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                <span className="mr-3">💬</span>
                Recent Discussions
              </h3>
              <div className="space-y-4">
                {society.forum.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <h4 className="mb-1 font-semibold text-gray-800">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600">by {post.author}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Marketplace Items */}
            <motion.div
              className="rounded-3xl border-2 border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
                <span className="mr-3">🛒</span>
                Marketplace
              </h3>
              <div className="space-y-4">
                {society.marketplace.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.item}
                        </h4>
                        <p className="text-sm text-gray-600">
                          by {item.seller}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-cambridge-blue to-hunyadi-yellow bg-gradient-to-r py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Connect?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Join thousands of residents who are already enjoying seamless
              community living.
            </p>
            <Link
              href="/login"
              className="text-cambridge-blue inline-block transform rounded-full bg-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-xs font-bold text-white">NH</span>
              </div>
              <span className="text-xl font-bold">NeighbourhoodHub</span>
            </div>
            <p className="mb-4 text-gray-400">Your Community, Connected.</p>
            <p className="text-sm text-gray-500">
              © 2025 Alt-F4. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
