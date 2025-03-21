import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronDown, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { useMsal } from '@azure/msal-react';
import Switch from 'react-switch';
import logo from '../images/Logofornavbar.png';

const Navbar = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { accounts, instance } = useMsal();
  const userAccount = accounts[0];

  const handleSignOut = () => {
    instance.logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={`bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between w-full transition-colors duration-300 relative z-50`}>
      {/* Logo */}
      <NavLink to="/" className="flex items-center z-50">
        <img src={logo} alt="Logo" className="h-14" />
      </NavLink>

      {/* Navigation Links */}
      <nav
        className={`lg:flex lg:items-center space-x-6 absolute lg:static bg-white dark:bg-gray-900 w-full lg:w-auto top-16 left-0 shadow-md lg:shadow-none transition-all duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/home">
          Home
        </NavLink>
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/about">
          About
        </NavLink>

        {/* Report Dropdown */}
        <div className="relative group">
          <button className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0 flex items-center">
            Report <FiChevronDown className="ml-1" />
          </button>
          <div className="absolute left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 hidden group-hover:block">
            <NavLink className="block text-gray-700 dark:text-white px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" to="/found">
              Report Found Item
            </NavLink>
            <NavLink className="block text-gray-700 dark:text-white px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" to="/lost">
              Report Lost Item
            </NavLink>
          </div>
        </div>

        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/items">
          Items Gallery
        </NavLink>
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/helpusfind">
          Help Us Find
        </NavLink>
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/faq">
          FAQ
        </NavLink>
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/feedback">
          Feedback
        </NavLink>
        <NavLink className="block lg:inline-block text-gray-700 dark:text-white hover:text-blue-500 px-4 py-2 lg:px-0 lg:py-0" to="/contact">
          Contact Us
        </NavLink>
      </nav>

      {/* Right Section: Search, Theme Toggle, Profile */}
      <div className="flex items-center space-x-4 relative z-50">
        {/* Search Bar (Icon Only, Expands on Click) */}
        <div className="relative">
          <button
            onClick={() => setSearchExpanded(!isSearchExpanded)}
            className="p-2 text-gray-700 dark:text-white hover:text-blue-500 focus:outline-none z-50"
          >
            <FiSearch className="text-xl" />
          </button>
          {isSearchExpanded && (
            <form
              onSubmit={handleSearch}
              className="absolute right-0 top-10 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <FiSearch className="text-lg" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Theme Toggle */}
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          onColor="#2C3245"
          offColor="#E1E2E2"
          onHandleColor="#fff"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={48}
          className="ml-2 z-50"
        />

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden z-50" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700 dark:text-white cursor-pointer" />
          ) : (
            <GiHamburgerMenu className="text-2xl text-gray-700 dark:text-white cursor-pointer" />
          )}
        </div>

        {/* Profile Dropdown */}
        {accounts.length > 0 && (
          <div className="relative z-50">
            <div
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <FiUser className="text-xl text-gray-700 dark:text-white" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-56 p-3 z-50">
                <div className="flex items-center space-x-3 pb-2 border-b border-gray-200 dark:border-gray-600">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FiUser className="text-xl text-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <h5 className="text-gray-700 dark:text-white font-medium">{userAccount.name}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{userAccount.username}</p>
                  </div>
                </div>
                <div className="py-2">
                  <NavLink
                    to="/profile"
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                  >
                    <FiUser className="w-5 h-5" />
                    <p className="text-sm">View Profile</p>
                  </NavLink>
                  <div
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 px-3 py-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <p className="text-sm">Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;