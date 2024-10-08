import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../atoms/Logo/Index"
import Button from "../../atoms/Button/Index"
import "@fortawesome/fontawesome-free/css/all.min.css"

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top part of the footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Left section: Logo and subscription */}
          <div>
            <Link to="/">
              <Logo className="w-[130px] h-[43px]" black={false} />
            </Link>
            <p className="mt-4 text-gray-600">Make waves.</p>
            <p className="mt-2 text-gray-600">
              Subscribe for updates on the platform!
            </p>

            <div className="relative w-full mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                // Adding padding to the right to make space for the button
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none pr-20"
              />

              <Button className="absolute right-0 top-0 h-full bg-[#FFD065] text-black font-medium px-6 py-2 rounded-md hover:bg-yellow-400 transition flex items-center">
                Subscribe
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>

          <div className="ml-40">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Waves</li>
              <li>Home</li>
              <li>Product Sharing</li>
              <li>Show Me The Money</li>
              <li>Stay in Sync</li>
              <li>Mobile App</li>
              <li>Communities</li>
              <li>Explore Products</li>
              <li>Data Dashboard</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>For Brands</li>
                <li>For Influencers</li>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Blog</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Security</li>
                <li>Blog</li>
                <li>Help</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-8 text-gray-600">
          <p className="text-sm">2021-2022 © kwik.com</p>

          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gray-900 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-900 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-gray-900 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
