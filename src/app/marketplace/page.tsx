"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";
import { useAuth } from "~/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

interface MarketplaceItem {
  id: number;
  seller: string;
  sellerContact: string;
  item: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

const MarketplacePage = () => {
  const society = db.elysium123;
  const { user } = useAuth();

  // Enhanced marketplace items for better demonstration
  const initialItems: MarketplaceItem[] = [
    ...society.marketplace,
    // Adding some mock items for better grid demonstration
    {
      id: 6,
      seller: "Rajesh M.",
      sellerContact: "9111222333",
      item: "Dining Table Set",
      price: 15000,
      category: "Furniture",
      description:
        "Solid wood dining table with 6 chairs. Excellent condition.",
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Dining+Table",
    },
    {
      id: 7,
      seller: "Anita P.",
      sellerContact: "9222333444",
      item: "Washing Machine",
      price: 8000,
      category: "Appliances",
      description: "Semi-automatic washing machine. Works perfectly.",
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Washing+Machine",
    },
    {
      id: 8,
      seller: "Kiran S.",
      sellerContact: "9333444555",
      item: "Study Chair",
      price: 3500,
      category: "Furniture",
      description: "Ergonomic study chair with adjustable height.",
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Study+Chair",
    },
  ];

  // State management
  const [items, setItems] = useState<MarketplaceItem[]>(initialItems);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null,
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("latest");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sellFormData, setSellFormData] = useState({
    item: "",
    price: "",
    category: "",
    description: "",
  });

  // Helper functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getUniqueCategories = () => {
    const categories = new Set(items.map((item) => item.category));
    return Array.from(categories);
  };

  // Filter and sort items
  const filteredAndSortedItems = items
    .filter((item) => {
      if (categoryFilter === "all") return true;
      return item.category === categoryFilter;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "latest":
        default:
          return b.id - a.id;
      }
    });

  // Handle sell form submission
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !sellFormData.item.trim() ||
      !sellFormData.price ||
      !sellFormData.category ||
      !sellFormData.description.trim() ||
      !user
    )
      return;

    const newItem: MarketplaceItem = {
      id: Math.max(...items.map((item) => item.id)) + 1,
      seller: user.name,
      sellerContact: "9999999999", // In real app, this would come from user profile
      item: sellFormData.item.trim(),
      price: parseInt(sellFormData.price),
      category: sellFormData.category,
      description: sellFormData.description.trim(),
      imageUrl: `https://placehold.co/600x600/EEE/31343C?text=${encodeURIComponent(sellFormData.item)}`,
    };

    setItems([newItem, ...items]);
    setSellFormData({ item: "", price: "", category: "", description: "" });
    setIsSellModalOpen(false);
    showToastMessage("Item listed successfully!");
  };

  // Handle item click
  const handleItemClick = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  // Copy to clipboard function that works in iframes
  const copyToClipboard = async (text: string) => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToastMessage("Number copied!");
        return;
      }

      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        showToastMessage("Number copied!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        showToastMessage("Failed to copy number");
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      showToastMessage("Failed to copy number");
    }
  };

  // Show toast message
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <AuthGuard>
      <div
        className={`from-linen via-tea-rose-red/10 to-hunyadi-yellow/20 min-h-screen bg-gradient-to-br pb-12 ${inter.className}`}
      >
        {/* Toast */}
        {showToast && (
          <div className="glass-card text-cambridge-blue shadow-soft fixed top-4 right-4 z-50 rounded-2xl px-6 py-3">
            {toastMessage}
          </div>
        )}

        {/* Sell Item Modal */}
        {isSellModalOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="glass-card shadow-soft-hover mx-4 w-full max-w-md rounded-2xl p-6">
              <h2 className="text-cambridge-blue mb-6 text-2xl font-bold">
                Sell an Item
              </h2>
              <form onSubmit={handleSellSubmit}>
                <div className="mb-4">
                  <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="input-modern w-full"
                    value={sellFormData.item}
                    onChange={(e) =>
                      setSellFormData((prev) => ({
                        ...prev,
                        item: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input-modern w-full"
                    value={sellFormData.price}
                    onChange={(e) =>
                      setSellFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                    Category
                  </label>
                  <select
                    className="input-modern w-full"
                    value={sellFormData.category}
                    onChange={(e) =>
                      setSellFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="text-cambridge-blue/80 mb-2 block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="input-modern w-full resize-none"
                    value={sellFormData.description}
                    onChange={(e) =>
                      setSellFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    List Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSellModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Item Details Modal */}
        {isDetailsModalOpen && selectedItem && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="glass-card shadow-soft-hover mx-4 w-full max-w-lg rounded-2xl p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-cambridge-blue text-2xl font-bold">
                  Item Details
                </h2>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-cambridge-blue/60 hover:text-cambridge-blue transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.item}
                  width={400}
                  height={300}
                  className="shadow-soft w-full rounded-2xl object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-cambridge-blue text-xl font-bold">
                    {selectedItem.item}
                  </h3>
                  <p className="text-light-coral text-2xl font-bold">
                    {formatPrice(selectedItem.price)}
                  </p>
                </div>

                <div>
                  <span className="from-hunyadi-yellow/20 to-light-coral/20 text-cambridge-blue inline-block rounded-full bg-gradient-to-r px-3 py-1 text-sm font-medium">
                    {selectedItem.category}
                  </span>
                </div>

                <div>
                  <p className="text-cambridge-blue/80 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="border-cambridge-blue/20 border-t pt-4">
                  <h4 className="text-cambridge-blue font-semibold">
                    Seller Information
                  </h4>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold">
                      {selectedItem.seller.charAt(0)}
                    </div>
                    <div>
                      <p className="text-cambridge-blue font-medium">
                        {selectedItem.seller}
                      </p>
                      <p className="text-cambridge-blue/70 text-sm">
                        {selectedItem.sellerContact}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() =>
                        copyToClipboard(selectedItem.sellerContact)
                      }
                      className="btn-primary w-full"
                    >
                      Copy Seller Number
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="page-container py-12 sm:py-16">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="mb-8">
              <h1 className="text-cambridge-blue mb-4 text-4xl font-bold sm:text-5xl">
                Community Marketplace
              </h1>
              <p className="text-cambridge-blue/80 text-lg sm:text-xl">
                Buy and sell items within your community
              </p>
            </div>

            {/* Sell Item Button */}
            <button
              onClick={() => setIsSellModalOpen(true)}
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
              Sell an Item
            </button>
          </div>

          {/* Marketplace Stats */}
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-105">
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {items.length}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Items Listed
              </p>
            </div>
            <div className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-105">
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {new Set(items.map((item) => item.seller)).size}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Active Sellers
              </p>
            </div>
            <div className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-105">
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {new Set(items.map((item) => item.category)).size}
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Categories
              </p>
            </div>
            <div className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-105">
              <h3 className="text-cambridge-blue text-3xl font-bold">
                {Math.round(
                  items.reduce((sum, item) => sum + item.price, 0) /
                    items.length /
                    1000,
                )}
                K
              </h3>
              <p className="text-cambridge-blue/70 text-sm font-medium">
                Avg. Price
              </p>
            </div>
          </div>

          {/* Filter and Sort Section */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  categoryFilter === "all"
                    ? "from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft bg-gradient-to-r"
                    : "glass-card text-cambridge-blue/70 hover:text-cambridge-blue"
                }`}
              >
                All Items
              </button>
              {getUniqueCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    categoryFilter === category
                      ? "from-hunyadi-yellow to-light-coral text-cambridge-blue shadow-soft bg-gradient-to-r"
                      : "glass-card text-cambridge-blue/70 hover:text-cambridge-blue"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-cambridge-blue/80 text-sm font-medium">
                Sort by:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="input-modern"
              >
                <option value="latest">Latest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Marketplace Items Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="glass-card shadow-soft hover:shadow-soft-hover cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                {/* Image Container with 1:1 Aspect Ratio */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.item}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-cambridge-blue line-clamp-2 font-bold">
                      {item.item}
                    </h3>
                    <p className="text-light-coral mt-1 text-lg font-semibold">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="from-hunyadi-yellow/20 to-light-coral/20 text-cambridge-blue inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Seller Info */}
                  <div className="mb-3 flex items-center gap-2">
                    <div className="from-hunyadi-yellow to-light-coral text-cambridge-blue flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold">
                      {item.seller.charAt(0)}
                    </div>
                    <span className="text-cambridge-blue/80 truncate text-sm">
                      {item.seller}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
                      }}
                      className="btn-primary flex-1 text-xs"
                    >
                      View Details
                    </button>
                    <button className="glass-card text-cambridge-blue/60 hover:text-cambridge-blue rounded-xl p-2 transition-colors">
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
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedItems.length === 0 && (
            <div className="glass-card shadow-soft rounded-2xl p-12 text-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-cambridge-blue mt-4 text-lg font-medium">
                No items found
              </h3>
              <p className="text-cambridge-blue/70 mt-2">
                {categoryFilter === "all"
                  ? "Be the first to list an item in the community marketplace!"
                  : `No items found in the ${categoryFilter} category.`}
              </p>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="btn-primary mt-4"
              >
                List Your First Item
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default MarketplacePage;
