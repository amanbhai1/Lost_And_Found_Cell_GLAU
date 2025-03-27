import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiSearch, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import Switch from 'react-switch';
import logo from '../images/Logofornavbar.png';

const Navbar = ({ theme, toggleTheme }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isReportDropdownOpen, setReportDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    // Clear all auth-related storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax' + 
      (window.location.protocol === 'https:' ? '; Secure' : '');
    
    // Reset state
    setIsLoggedIn(false);
    setUserData(null);
    setDropdownOpen(false);
    
    // Force full page reload to clear any cached data
    window.location.href = '/';
  }, [navigate]);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');
    
    if (token && storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        setUserData(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleSignOut();
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [handleSignOut]);

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [checkAuth]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleProfileClick = () => {
    // Force auth check before proceeding
    checkAuth();
    
    if (!isLoggedIn) {
      navigate('/login');
      setDropdownOpen(false);
    } else {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav className={`sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8 mx-8 flex-grow justify-center">
            <NavLink 
              to="/home" 
              className="text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors relative
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 dark:after:bg-white after:transition-all
                hover:after:w-full"
            >
              Home
            </NavLink>
            
            {/* Show Report dropdown only when logged in */}
            {isLoggedIn && (
              <div className="relative group">
                <button 
                  onMouseEnter={() => setReportDropdownOpen(true)}
                  onMouseLeave={() => setReportDropdownOpen(false)}
                  className="flex items-center text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Report
                  <FiChevronDown className={`ml-1.5 h-4 w-4 transform transition-transform ${
                    isReportDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isReportDropdownOpen && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                    onMouseEnter={() => setReportDropdownOpen(true)}
                    onMouseLeave={() => setReportDropdownOpen(false)}
                  >
                    <NavLink 
                      to="/found" 
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => setReportDropdownOpen(false)}
                    >
                      Report Found Item
                    </NavLink>
                    <NavLink 
                      to="/lost" 
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => setReportDropdownOpen(false)}
                    >
                      Report Lost Item
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            {[...(isLoggedIn ? ['items'] : []), 'helpusfind', 'faq', 'contact', 'about'].map((link) => (
              <NavLink 
                key={link}
                to={`/${link}`} 
                className="capitalize text-gray-700 dark:text-gray-300 px-3 py-2 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors relative
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gray-900 dark:after:bg-white after:transition-all
                  hover:after:w-full"
              >
                {link.replace('us', ' Us ')}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Search Bar */}
            <div className="relative">
              <button
                onClick={() => setSearchExpanded(!isSearchExpanded)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              
              {isSearchExpanded && (
                <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 w-72">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FiSearch className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              onColor="#1f2937"
              offColor="#e5e7eb"
              onHandleColor="#f9fafb"
              offHandleColor="#111827"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={24}
              width={48}
              className="shadow-sm"
            />

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <GiHamburgerMenu className="h-6 w-6" />
              )}
            </button>

            {/* Simplified Profile Button */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
              >
                <FiUser className="h-4 w-4" />
              </button>
              
              {/* Enhanced Profile Dropdown */}
              {isDropdownOpen && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {userData?.initials || <FiUser className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {userData?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {userData?.email || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <NavLink
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FiUser className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </NavLink>
                    <NavLink
                      to="/account"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FiSettings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </NavLink>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <FiLogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 space-y-1 border-t border-gray-100 dark:border-gray-800 mt-2">
            {['home', ...(isLoggedIn ? ['items'] : []), 'helpusfind', 'faq', 'contact', 'about'].map((link) => (
              <NavLink
                key={link}
                to={`/${link}`}
                className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                {link.replace('us', ' Us ')}
              </NavLink>
            ))}
            {isLoggedIn && (
              <>
                <div className="px-5 py-3">
                  <div className="h-px bg-gray-100 dark:bg-gray-800"></div>
                </div>
                <NavLink
                  to="/found"
                  className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Report Found
                </NavLink>
                <NavLink
                  to="/lost"
                  className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  Report Lost
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;