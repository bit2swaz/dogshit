"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";
import { useAuth } from "~/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: string;
}

const ForumPage = () => {
  const society = db.elysium123;
  const { user } = useAuth();

  // State management
  const [posts, setPosts] = useState<Post[]>(society.forum);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "recent">("all");
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [showToast, setShowToast] = useState(false);

  // Helper functions
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  // Filter posts based on the selected filter
  const filteredPosts = posts.filter((post) => {
    if (filter === "recent") {
      const now = new Date();
      const postDate = new Date(post.timestamp);
      const diffInHours =
        (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);
      return diffInHours <= 24;
    }
    return true;
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || !user) return;

    const newPost: Post = {
      id: Math.max(...posts.map((p) => p.id)) + 1,
      author: user.name,
      title: formData.title.trim(),
      content: formData.content.trim(),
      timestamp: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setFormData({ title: "", content: "" });
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Load more posts
  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 2);
  };

  return (
    <AuthGuard>
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        {/* Success Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            Post created successfully!
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Create New Post
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Create Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Community Forum
                </h1>
                <p className="text-gray-600">
                  Connect with your neighbors and stay informed
                </p>
              </div>

              {/* Create New Post Button */}
              <button
                onClick={() => setIsModalOpen(true)}
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Post
              </button>
            </div>
          </div>

          {/* Forum Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {posts.length}
              </h3>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(posts.map((post) => post.author)).size}
              </h3>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.timestamp);
                    const today = new Date();
                    return postDate.toDateString() === today.toDateString();
                  }).length
                }
              </h3>
              <p className="text-sm text-gray-600">Today&apos;s Posts</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.timestamp);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return postDate >= weekAgo;
                  }).length
                }
              </h3>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>

          {/* Forum Posts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Discussions
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("recent")}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === "recent"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index < 2 ? index * 0.1 : 0, // Stagger effect for first 2 posts
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    layout
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    {/* Post Header */}
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-bold text-gray-900">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          {/* Author Avatar */}
                          <div className="bg-brand flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white">
                            {post.author.charAt(0)}
                          </div>
                          <span className="font-medium">{post.author}</span>
                        </div>
                        <span>•</span>
                        <span>{getTimeAgo(post.timestamp)}</span>
                        <span>•</span>
                        <span>{formatTimestamp(post.timestamp)}</span>
                      </div>
                    </div>

                    {/* Post Content Preview */}
                    <div className="mb-4">
                      <p className="line-clamp-3 text-gray-700">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="hover:text-brand flex items-center gap-1.5 text-sm text-gray-600 transition-colors">
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
                          Like
                        </button>
                        <button className="hover:text-brand flex items-center gap-1.5 text-sm text-gray-600 transition-colors">
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
                          Reply
                        </button>
                        <button className="hover:text-brand flex items-center gap-1.5 text-sm text-gray-600 transition-colors">
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
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                          Share
                        </button>
                      </div>

                      <button className="text-brand hover:text-brand-dark text-sm font-medium transition-colors">
                        Read More →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No posts yet
                </h3>
                <p className="mt-2 text-gray-600">
                  Be the first to start a conversation in your community!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand hover:bg-brand-dark mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-200"
                >
                  Create First Post
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > visiblePosts && (
              <div className="text-center">
                <button
                  onClick={loadMorePosts}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ForumPage;
