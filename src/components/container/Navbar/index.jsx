import React, { useState, useEffect } from "react";
import FullContainer from "../../common/FullContainer";
import Container from "../../common/Container";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ className, userInfo, signoutHandler }) {
  const [sidebar, setSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sellerDropdownOpen, setSellerDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <FullContainer
      className={`py-4 z-20 sticky top-0 bg-lightGreen shadow ${className}`}
    >
      <div className="flex items-center justify-between lg:grid grid-cols-navbar w-11/12">
        <Menu onClick={handleSidebar} className="text-primary h-7 lg:hidden" />

        <Link to="/" className="font-bold text-xl hidden lg:block">
          <img src="/logo.png" alt="" className="h-7" />
        </Link>

        {/* User Account Dropdown */}
        <div className="flex items-center justify-end">
          {userInfo ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-primary focus:outline-none"
              >
                {userInfo.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    User Profile
                  </Link>
                  <Link
                    to="/orderhistory"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Order History
                  </Link>
                  <hr className="border-gray-200" />
                  <button
                    onClick={signoutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}

          {/* Seller Dropdown */}
          {userInfo && userInfo.isSeller && (
            <div className="relative ml-4">
              <button
                onClick={() => setSellerDropdownOpen(!sellerDropdownOpen)}
                className="text-primary focus:outline-none"
              >
                Seller
              </button>
              {sellerDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                  <Link
                    to="/seller/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/seller/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                  <Link
                    to="/seller/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Admin Dropdown */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative ml-4">
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="text-primary focus:outline-none"
              >
                Admin
              </button>
              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                  <Link
                    to="/support"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Support
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {sidebar && (
        <div className="lg:hidden fixed z-20 top-0 left-0 py-4 h-screen text-center bg-white w-full flex items-start">
          <Container>
            <div className="flex items-center justify-between w-full">
              <Menu onClick={handleSidebar} className="text-primary h-7" />
              <Link to="/" className="font-bold text-xl">
                BOOTABAZAAR
              </Link>
              <button className="btnPrimarySmall">Join</button>
            </div>
            <nav className="mt-6">
              <Link
                title="Home"
                className="navLink"
                to="/"
                onClick={handleSidebar}
              >
                Home
              </Link>
              <Link
                title="Blogs"
                className="navLink"
                to="/blog"
                onClick={handleSidebar}
              >
                Blogs
              </Link>
              <Link
                title="Contact Us"
                className="navLink"
                to="/contact-us"
                onClick={handleSidebar}
              >
                Contact Us
              </Link>
              <Link
                title="Login"
                className="navLink"
                to="/login"
                onClick={handleSidebar}
              >
                Login
              </Link>
              <Link
                title="Create Account"
                className="navLink"
                to="/signup"
                onClick={handleSidebar}
              >
                Create Account
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </FullContainer>
  );
}
