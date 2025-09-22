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
    <div className={`min-h-screen ${inter.className}`}>
      {/* Hero Section - Warm gradient with decorative elements */}
      <section className="from-linen via-tea-rose-red/20 to-hunyadi-yellow/30 relative overflow-hidden bg-gradient-to-br pt-16 pb-24 sm:pt-20 sm:pb-32">
        {/* Background decorative elements */}
        <div className="to-cambridge-blue/10 absolute inset-0 bg-gradient-to-br from-white/40 via-transparent"></div>
        <div className="bg-hunyadi-yellow/20 absolute top-0 right-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-light-coral/20 absolute bottom-0 left-0 h-64 w-64 rounded-full blur-2xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-cambridge-blue mb-6 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Community,
              <br />
              <span className="from-cambridge-blue to-light-coral bg-gradient-to-r bg-clip-text">
                Connected.
              </span>
            </motion.h1>

            <motion.p
              className="text-cambridge-blue/80 mb-8 text-lg leading-relaxed sm:mb-12 sm:text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience seamless community living with our comprehensive
              platform.
              <br />
              <span className="text-cambridge-blue font-semibold">
                Everything you need, all in one place.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/login"
                className="group from-hunyadi-yellow to-light-coral text-cambridge-blue w-full transform rounded-2xl bg-gradient-to-r px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto"
              >
                <span className="inline-block transition-transform group-hover:scale-110">
                  Join Your Community
                </span>
              </Link>
              <button className="border-cambridge-blue/30 text-cambridge-blue hover:border-cambridge-blue w-full transform rounded-2xl border-2 bg-white/80 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg sm:w-auto">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Glass morphism design */}
      <section className="relative bg-white/60 py-16 backdrop-blur-xl sm:py-20">
        {/* Subtle pattern overlay */}
        <div className="via-cambridge-blue/5 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group shadow-soft hover:shadow-soft-hover rounded-2xl bg-white/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-cambridge-blue mb-2 text-3xl font-bold transition-transform group-hover:scale-110 sm:text-4xl md:text-5xl">
                  {stat.number}
                </div>
                <div className="text-cambridge-blue/80 text-sm font-medium sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Neutral background for contrast */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-cambridge-blue mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="text-cambridge-blue/80 mx-auto max-w-2xl text-lg sm:text-xl">
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

      {/* Community Showcase - Warm background with better contrast */}
      <section className="from-linen/60 via-tea-rose-red/30 to-hunyadi-yellow/20 bg-gradient-to-br py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <h2 className="text-cambridge-blue mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Active Community Life
            </h2>
            <p className="text-cambridge-blue/80 mx-auto max-w-2xl text-lg sm:text-xl">
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

      {/* CTA Section - Bold gradient with proper contrast */}
      <section className="from-cambridge-blue via-cambridge-blue/90 to-hunyadi-yellow relative overflow-hidden bg-gradient-to-r py-16 sm:py-24">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10"></div>

        <div className="relative container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-cambridge-blue sm:text-4xl md:text-5xl">
              Ready to Connect?
            </h2>
            <p className="mb-8 text-lg text-cambridge-blue/80 sm:text-xl">
              Join thousands of residents who are already enjoying seamless
              community living.
            </p>
            <Link
              href="/login"
              className="text-cambridge-blue inline-block transform rounded-2xl bg-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Dark theme with gradient accent */}
      <footer className="via-cambridge-blue/90 bg-gradient-to-br from-gray-900 to-gray-800 py-12 text-white sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-hunyadi-yellow to-light-coral border-2 border-white/20 shadow-xl ring-2 ring-white/10">
                <span className="text-sm font-bold text-white drop-shadow-sm">NH</span>
              </div>
              <span className="text-2xl font-bold text-white">
                NeighbourhoodHub
              </span>
            </div>
            <p className="mb-6 text-lg text-white/80">
              Your Community, Connected.
            </p>
            <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <p className="text-sm text-white/60">
              © 2025 NeighbourhoodHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
