import { Inter } from "next/font/google";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const ForumPage = () => {
  const society = db.elysium123;

  // Function to format timestamp
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

  // Function to get time ago
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

  return (
    <AuthGuard>
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
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
                Create New Post
              </button>
            </div>
          </div>

          {/* Forum Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {society.forum.length}
              </h3>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(society.forum.map((post) => post.author)).size}
              </h3>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  society.forum.filter((post) => {
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
                  society.forum.filter((post) => {
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
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  All
                </button>
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Recent
                </button>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {society.forum.map((post) => (
                <div
                  key={post.id}
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
                    <p className="line-clamp-3 text-gray-700">{post.content}</p>
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
                </div>
              ))}
            </div>

            {/* Empty State */}
            {society.forum.length === 0 && (
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
                <button className="bg-brand hover:bg-brand-dark mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-200">
                  Create First Post
                </button>
              </div>
            )}

            {/* Load More */}
            {society.forum.length > 0 && (
              <div className="text-center">
                <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
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
