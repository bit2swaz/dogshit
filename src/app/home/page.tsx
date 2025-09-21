import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome to NeighborhoodHub
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Your community connection platform
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Community Dashboard
            </h2>
            <p className="text-gray-600">
              Welcome to your neighborhood community platform. Explore the
              navigation above to access different features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
