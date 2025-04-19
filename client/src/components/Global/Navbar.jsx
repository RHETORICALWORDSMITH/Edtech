import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/asset";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 w-10 inline-block"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
              >
                Courses
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
              >
                Contact
              </Link>
              <Link to="/signup">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300 ease-in-out cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md font-medium"
            >
              Contact
            </Link>
            <Link to="/signup">
              <button className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md font-medium hover:bg-indigo-700 transition duration-300 ease-in-out">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
