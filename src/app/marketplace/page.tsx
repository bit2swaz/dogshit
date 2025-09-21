import { Inter } from "next/font/google";
import Image from "next/image";
import db from "~/data/mock-db.json";
import AuthGuard from "~/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

const MarketplacePage = () => {
  const society = db.elysium123;

  // Enhanced marketplace items for better demonstration
  // In a real app, this would come from the database
  const marketplaceItems = [
    ...society.marketplace,
    // Adding some mock items for better grid demonstration
    {
      id: 2,
      seller: "Rajesh M.",
      item: "Dining Table Set",
      price: 15000,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Dining+Table",
    },
    {
      id: 3,
      seller: "Anita P.",
      item: "Washing Machine",
      price: 8000,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Washing+Machine",
    },
    {
      id: 4,
      seller: "Kiran S.",
      item: "Study Chair",
      price: 3500,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Study+Chair",
    },
    {
      id: 5,
      seller: "Meera K.",
      item: "Bookshelf",
      price: 4500,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Bookshelf",
    },
    {
      id: 6,
      seller: "Vikram T.",
      item: "Air Conditioner",
      price: 22000,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Air+Conditioner",
    },
    {
      id: 7,
      seller: "Sunita R.",
      item: "Coffee Table",
      price: 2800,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Coffee+Table",
    },
    {
      id: 8,
      seller: "Amit D.",
      item: "Gaming Chair",
      price: 12000,
      imageUrl: "https://placehold.co/600x600/EEE/31343C?text=Gaming+Chair",
    },
  ];

  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Function to get category from item name
  const getItemCategory = (itemName: string) => {
    const categories: Record<string, string> = {
      bicycle: "Sports & Fitness",
      table: "Furniture",
      chair: "Furniture",
      shelf: "Furniture",
      machine: "Appliances",
      conditioner: "Appliances",
    };

    const lowercaseItem = itemName.toLowerCase();
    for (const [key, category] of Object.entries(categories)) {
      if (lowercaseItem.includes(key)) {
        return category;
      }
    }
    return "General";
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
                  Community Marketplace
                </h1>
                <p className="text-gray-600">
                  Buy and sell items within your community
                </p>
              </div>

              {/* Sell Item Button */}
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
                Sell an Item
              </button>
            </div>
          </div>

          {/* Marketplace Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {marketplaceItems.length}
              </h3>
              <p className="text-sm text-gray-600">Items Listed</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {new Set(marketplaceItems.map((item) => item.seller)).size}
              </h3>
              <p className="text-sm text-gray-600">Active Sellers</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {
                  new Set(
                    marketplaceItems.map((item) => getItemCategory(item.item)),
                  ).size
                }
              </h3>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                {Math.round(
                  marketplaceItems.reduce((sum, item) => sum + item.price, 0) /
                    marketplaceItems.length /
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
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                All Items
              </button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Furniture
              </button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Appliances
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="focus:border-brand focus:ring-brand rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:ring-1 focus:outline-none">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Marketplace Items Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {marketplaceItems.map((item) => (
              <div
                key={item.id}
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
                      {getItemCategory(item.item)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 flex gap-2">
                    <button className="bg-brand hover:bg-brand-dark flex-1 rounded-md px-3 py-2 text-xs font-medium text-white transition-colors">
                      Contact Seller
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
          {marketplaceItems.length === 0 && (
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
                No items for sale
              </h3>
              <p className="mt-2 text-gray-600">
                Be the first to list an item in the community marketplace!
              </p>
              <button className="bg-brand hover:bg-brand-dark mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-200">
                List Your First Item
              </button>
            </div>
          )}

          {/* Load More */}
          {marketplaceItems.length > 8 && (
            <div className="mt-8 text-center">
              <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Load More Items
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default MarketplacePage;
