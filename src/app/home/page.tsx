import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NeighborhoodHub
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your community connection platform
          </p>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Community Dashboard
            </h2>
            <p className="text-gray-600">
              Welcome to your neighborhood community platform. Explore the navigation above to access different features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;