"use client";
import { useState } from "react";

const Navbar = ({ searchValue, onSearchChange, posts }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  const menuItems = [{ id: 1, text: "Home", link: "/" }];

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-lg">My Navbar</div>

        <div
          className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center`}
        >
          <ul className="lg:flex space-x-4 pr-5">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="text-white hover:text-gray-400">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <input
            className="rounded-lg px-2 py-1 text-black"
            type="text"
            id="search"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search by title"
          />
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
