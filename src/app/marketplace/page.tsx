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
      <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
        {/* Toast */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {toastMessage}
          </div>
        )}

        {/* Sell Item Modal */}
        {isSellModalOpen && (
          <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Sell an Item
              </h2>
              <form onSubmit={handleSellSubmit}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    List Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSellModalOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Item Details
                </h2>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
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

              <div className="mb-4">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.item}
                  width={400}
                  height={300}
                  className="w-full rounded-lg object-cover"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedItem.item}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(selectedItem.price)}
                  </p>
                </div>

                <div>
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                    {selectedItem.category}
                  </span>
                </div>

                <div>
                  <p className="text-gray-700">{selectedItem.description}</p>
                </div>

                <div className="border-t pt-3">
                  <h4 className="font-medium text-gray-900">
                    Seller Information
                  </h4>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="bg-brand flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                      {selectedItem.seller.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedItem.seller}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedItem.sellerContact}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(selectedItem.sellerContact)
                      }
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      Copy Seller Number
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Community Marketplace
                </h1>
                <p className="text-gray-600">
                  Buy and sell items within your community
                </p>
              </div>

              {/* Sell Item Button */}
              <button
                onClick={() => setIsSellModalOpen(true)}
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
                Sell an Item
              </button>
            </div>
          </div>

          {/* Marketplace Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {items.length}
              </h3>
              <p className="text-sm text-gray-600">Items Listed</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(items.map((item) => item.seller)).size}
              </h3>
              <p className="text-sm text-gray-600">Active Sellers</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(items.map((item) => item.category)).size}
              </h3>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {Math.round(
                  items.reduce((sum, item) => sum + item.price, 0) /
                    items.length /
                    1000,
                )}
                K
              </h3>
              <p className="text-sm text-gray-600">Avg. Price</p>
            </div>
          </div>

          {/* Filter and Sort Section */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  categoryFilter === "all"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All Items
              </button>
              {getUniqueCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    categoryFilter === category
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="focus:border-brand focus:ring-brand rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-1 focus:outline-none"
              >
                <option value="latest">Latest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Marketplace Items Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Image Container with 1:1 Aspect Ratio */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.item}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="line-clamp-2 font-bold text-gray-900">
                      {item.item}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white">
                        {item.seller.charAt(0)}
                      </div>
                      <span className="truncate text-xs text-gray-600">
                        {item.seller}
                      </span>
                    </div>

                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                      {item.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
                      }}
                      className="bg-brand hover:bg-brand-dark flex-1 rounded-md px-3 py-2 text-xs font-medium text-white transition-colors"
                    >
                      View Details
                    </button>
                    <button className="rounded-md border border-gray-300 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No items found
              </h3>
              <p className="mt-2 text-gray-600">
                {categoryFilter === "all"
                  ? "Be the first to list an item in the community marketplace!"
                  : `No items found in the ${categoryFilter} category.`}
              </p>
              <button
                onClick={() => setIsSellModalOpen(true)}
                className="bg-brand hover:bg-brand-dark mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-200"
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
