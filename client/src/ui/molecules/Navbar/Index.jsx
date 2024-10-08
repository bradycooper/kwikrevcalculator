// src/ui/components/Navbar.tsx
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../../atoms/Button/Index"
import Logo from "../../atoms/Logo/Index"

const Navbar = () => {
  const [programOpen, setProgramOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <nav className="bg-white py-8 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <Logo className="w-[130px] h-[43px]" black={false} />
        </Link>

        <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <li
            className="relative group"
            onMouseEnter={() => setProgramOpen(true)}
            onMouseLeave={() => setProgramOpen(false)}
          >
            <span className="hover:text-black transition cursor-pointer flex items-center">
              Programs
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
            {programOpen && (
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2">
                <Link
                  to="/program1"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Program 1
                </Link>
                <Link
                  to="/program2"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Program 2
                </Link>
                <Link
                  to="/program3"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Program 3
                </Link>
              </div>
            )}
          </li>

          <li className="hover:text-black transition">
            <Link to="/report">The Platform</Link>
          </li>

          <li className="hover:text-black transition">
            <Link to="/about">About Us</Link>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <span className="hover:text-black transition cursor-pointer flex items-center">
              Resources
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
            {resourcesOpen && (
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2">
                <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100">
                  FAQ
                </Link>
                <Link to="/blog" className="block px-4 py-2 hover:bg-gray-100">
                  Blog
                </Link>
                <Link
                  to="/help-center"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Help Center
                </Link>
              </div>
            )}
          </li>
        </ul>

        <div className="flex space-x-8 items-center">
          <Link
            to="/brand-login"
            className="text-black font-semibold underline hover:underline transition"
          >
            Brand Login
          </Link>

          <Button
            className="bg-black text-white justify-end hover:bg-black-800 transition"
            // Custom border radius
            borderRadius="rounded-full"
            // Custom width
            width="w-[180px]"
          >
            Partner with us
          </Button>
        </div>

        <div className="md:hidden">
          <button aria-label="Open Menu">
            <svg
              className="h-8 w-8 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
