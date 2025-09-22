"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useAuth } from "~/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Forum", href: "/forum" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Gate", href: "/gate" },
    { name: "Services", href: "/services" },
    { name: "Complaints", href: "/complaints" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeProfileDropdown();
  };

  // Show loading state
  if (isLoading) {
    return (
      <nav
        className={`border-b border-amber-200 bg-stone-50 ${inter.className}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                  <span className="text-xs font-bold text-white">NH</span>
                </div>
                <span className="text-xl font-bold text-stone-800">
                  NeighbourhoodHub
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`border-b border-amber-200 bg-stone-50 ${inter.className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-xs font-bold text-white">NH</span>
              </div>
              <span className="text-xl font-bold text-stone-800">
                NeighbourhoodHub
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation - Only show if user is logged in */}
            {user && (
              <div className="hidden md:block">
                <div className="flex items-baseline space-x-8">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Dropdown - Only show if user is logged in */}
            {user && (
              <div className="relative hidden md:block">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex transform items-center space-x-2 rounded-md bg-amber-50 px-3 py-2 text-sm font-medium text-stone-700 transition-all duration-200 hover:scale-105 hover:bg-amber-100 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">Welcome, {user.name}</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={closeProfileDropdown}
                    />

                    {/* Dropdown Content */}
                    <div className="ring-opacity-5 absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                      <div className="py-1">
                        <div className="border-b border-gray-200 px-4 py-2 text-sm text-gray-700">
                          <div className="font-medium">
                            Welcome, {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Society: {user.societyCode}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            closeProfileDropdown();
                            // Add settings functionality later
                          }}
                          className="flex w-full transform items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-100 active:scale-95"
                        >
                          <svg
                            className="mr-3 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex w-full transform items-center px-4 py-2 text-sm text-red-600 transition-all duration-200 hover:scale-105 hover:bg-red-50 active:scale-95"
                        >
                          <svg
                            className="mr-3 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu button - Only show if user is logged in */}
            {user && (
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex transform items-center justify-center rounded-md p-2 text-gray-600 transition-all duration-200 hover:scale-105 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-inset active:scale-95"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Hamburger icon */}
                  <svg
                    className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* X icon */}
                  <svg
                    className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay - Only show if user is logged in */}
      {user && (
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {/* Background overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? "bg-opacity-50" : "bg-opacity-0"
            }`}
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div
            className={`absolute top-0 right-0 h-full w-full transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Menu header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900"
                onClick={closeMenu}
              >
                NeighborhoodHub
              </Link>
              <button
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-inset"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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

            {/* User Info Section */}
            <div className="border-b border-gray-200 px-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-medium text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Welcome, {user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Society: {user.societyCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu links */}
            <div className="flex flex-col space-y-2 px-4 py-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-4 py-3 text-lg font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-600"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {/* Settings and Logout buttons in mobile */}
              <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    closeMenu();
                    // Add settings functionality later
                  }}
                  className="flex w-full items-center rounded-md px-4 py-3 text-lg font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex w-full items-center rounded-md px-4 py-3 text-lg font-medium text-red-600 transition-colors duration-200 hover:bg-red-50"
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
