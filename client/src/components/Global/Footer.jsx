import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900">EduTech</h3>
            <p className="text-xs">Empowering education through technology.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-gray-900 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">
              Support
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  to="/help"
                  className="hover:text-gray-900 transition-colors"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-gray-900 transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-gray-900 transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-2">
              Contact
            </h4>
            <ul className="space-y-1 text-xs">
              <li>info@edutech.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">&copy; 2024 EduTech</p>
            {/* Social Links */}
            <div className="flex space-x-3 mt-2 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaFacebook className="h-3 w-3" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTwitter className="h-3 w-3" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaInstagram className="h-3 w-3" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaLinkedin className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
