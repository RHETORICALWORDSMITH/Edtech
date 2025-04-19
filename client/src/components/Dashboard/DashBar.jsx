import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/asset";
import {
  HiAcademicCap,
  HiChartBar,
  HiPlusCircle,
  HiChatAlt2,
  HiDocumentText,
  HiUserGroup,
  HiMenu,
  HiX,
} from "react-icons/hi";
import { HiBars3, HiXMark } from "react-icons/hi2"; // Add this import

const DashBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "My Courses",
      icon: <HiAcademicCap className="w-6 h-6" />,
      path: "/dashboard/courses",
    },
    {
      title: "Statistics",
      icon: <HiChartBar className="w-6 h-6" />,
      path: "/dashboard/stats",
    },
    {
      title: "Create Course",
      icon: <HiPlusCircle className="w-6 h-6" />,
      path: "/dashboard/create",
    },
    {
      title: "Manage Content",
      icon: <HiDocumentText className="w-6 h-6" />,
      path: "/dashboard/manage",
    },
    {
      title: "Chat Room",
      icon: <HiChatAlt2 className="w-6 h-6" />,
      path: "/dashboard/chat",
    },
    {
      title: "Enrollments",
      icon: <HiUserGroup className="w-6 h-6" />,
      path: "/dashboard/enrollments",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <HiXMark className="w-8 h-8" />
          ) : (
            <HiBars3 className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        lg:sticky lg:translate-x-0
      `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 h-[calc(100vh-200px)] overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <span className="mr-4">{item.icon}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBar;
