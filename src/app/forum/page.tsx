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
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br ${inter.className}`}
      >
        {/* Success Toast */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="glass-card text-cambridge-blue shadow-soft fixed top-4 right-4 z-50 rounded-2xl px-6 py-3"
          >
            ✨ Post created successfully!
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass-card shadow-soft-hover mx-4 w-full max-w-md rounded-2xl p-6"
              >
                <h2 className="text-cambridge-blue mb-6 text-2xl font-bold">
                  Create New Post
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                      Title
                    </label>
                    <input
                      type="text"
                      className="input-modern w-full"
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
                    <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                      Content
                    </label>
                    <textarea
                      rows={4}
                      className="input-modern w-full resize-none"
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
                    <button type="submit" className="btn-primary flex-1">
                      Create Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="page-container py-12 sm:py-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="mb-8">
              <h1 className="text-cambridge-blue mb-4 text-4xl font-bold sm:text-5xl">
                Community Forum
              </h1>
              <p className="text-cambridge-blue/80 text-lg sm:text-xl">
                Connect with your neighbors and stay informed
              </p>
            </div>

            {/* Create New Post Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="btn-primary inline-flex items-center gap-2"
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
            </motion.button>
          </motion.div>

          {/* Forum Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card shadow-soft cursor-pointer rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {posts.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Total Posts
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card shadow-soft cursor-pointer rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {new Set(posts.map((post) => post.author)).size}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Active Members
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card shadow-soft cursor-pointer rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.timestamp);
                    const today = new Date();
                    return postDate.toDateString() === today.toDateString();
                  }).length
                }
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Today&apos;s Posts
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card shadow-soft cursor-pointer rounded-2xl p-6 text-center"
            >
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {
                  posts.filter((post) => {
                    const postDate = new Date(post.timestamp);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return postDate >= weekAgo;
                  }).length
                }
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                This Week
              </p>
            </motion.div>
          </motion.div>

          {/* Forum Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-cambridge-blue text-2xl font-semibold">
                Recent Discussions
              </h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter("all")}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === "all"
                      ? "from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft bg-gradient-to-r"
                      : "glass-card text-cambridge-blue/70 hover:text-cambridge-blue"
                  }`}
                >
                  All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter("recent")}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filter === "recent"
                      ? "from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft bg-gradient-to-r"
                      : "glass-card text-cambridge-blue/70 hover:text-cambridge-blue"
                  }`}
                >
                  Recent
                </motion.button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: index < 2 ? index * 0.1 : 0,
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    layout
                    className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 transition-all duration-200"
                  >
                    {/* Post Header */}
                    <div className="mb-4">
                      <h3 className="text-cambridge-blue mb-2 text-xl font-bold">
                        {post.title}
                      </h3>
                      <div className="text-cambridge-blue/60 flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          {/* Author Avatar */}
                          <div className="from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-cambridge-blue/80 font-medium">
                            {post.author}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{getTimeAgo(post.timestamp)}</span>
                        <span>•</span>
                        <span>{formatTimestamp(post.timestamp)}</span>
                      </div>
                    </div>

                    {/* Post Content Preview */}
                    <div className="mb-4">
                      <p className="text-cambridge-blue/80 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-cambridge-blue/60 hover:text-cambridge-blue flex items-center gap-1.5 text-sm transition-colors"
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          Like
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-cambridge-blue/60 hover:text-cambridge-blue flex items-center gap-1.5 text-sm transition-colors"
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
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          Reply
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-cambridge-blue/60 hover:text-cambridge-blue flex items-center gap-1.5 text-sm transition-colors"
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
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                          Share
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-cambridge-blue hover:text-light-coral text-sm font-medium transition-colors"
                      >
                        Read More →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card shadow-soft rounded-2xl p-12 text-center"
              >
                <svg
                  className="text-cambridge-blue/40 mx-auto h-12 w-12"
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
                <h3 className="text-cambridge-blue mt-4 text-lg font-medium">
                  No posts yet
                </h3>
                <p className="text-cambridge-blue/70 mt-2">
                  Be the first to start a conversation in your community!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary mt-4"
                >
                  Create First Post
                </motion.button>
              </motion.div>
            )}

            {/* Load More */}
            {filteredPosts.length > visiblePosts && (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMorePosts}
                  className="btn-secondary"
                >
                  Load More Posts
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ForumPage;
