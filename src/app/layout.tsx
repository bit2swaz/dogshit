import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeighborhoodHub",
  description: "Your community, connected.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {" "}
          {/* Wrap everything */}
          <Toaster position="top-center" /> {/* Add Toaster */}
          <Navbar />
          <main key={Math.random()} className="animate-fadeIn pt-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
