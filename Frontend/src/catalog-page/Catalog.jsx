import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCalendar, FiX, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import loading from "./loading.gif";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const Catalog = ({ theme }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const host = "http://localhost:5000";
  const [categories, setCategories] = useState([]);
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [claimDetails, setClaimDetails] = useState({
    details: '',
    name: '',
    email: '',
    sapId: '',
    branch: '',
    year: '',
    contactNumber: ''
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const foundResponse = await fetch(`${host}/getAllItems`);
        const foundData = await foundResponse.json();
        
        // Use only found items
        const foundItems = foundData.data?.map(item => ({ ...item, type: 'found' })) || [];
        
        // Extract unique categories from found items
        const uniqueCategories = [...new Set(foundItems.map(item => item.category))];
        setCategories(['all', ...uniqueCategories.filter(Boolean)]);
        setItems(foundItems);
        
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const itemDate = new Date(item.date);
    const matchesDate = (!startDate || itemDate >= startDate) && 
      (!endDate || itemDate <= endDate);

    return matchesSearch && matchesCategory && matchesDate;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDateRange([null, null]);
  };

  const handleClaimOpen = (itemId) => {
    setSelectedItemId(itemId);
    setOpenClaimDialog(true);
  };

  const handleClaimClose = () => {
    setOpenClaimDialog(false);
    setClaimDetails({
      details: '',
      name: '',
      email: '',
      sapId: '',
      branch: '',
      year: '',
      contactNumber: ''
    });
  };

  const handleClaimSubmit = async () => {
    try {
      if (!claimDetails.details || !claimDetails.name || !claimDetails.email || 
          !claimDetails.sapId || !claimDetails.contactNumber) {
        alert('Please fill all required fields');
        return;
      }

      const response = await fetch(`${host}/claimItem/${selectedItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimDetails)
      });

      if (response.ok) {
        alert('Claim request submitted successfully!');
        handleClaimClose();
      } else {
        alert('Failed to submit claim request');
      }
    } catch (error) {
      console.error('Claim error:', error);
      alert('An error occurred while submitting your claim');
    }
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 text-center"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Found Items Catalog
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse through all found items and help reunite them with their owners
          </p>
        </motion.div>

        {/* Filters Section */}
        <div className={`mb-8 p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center w-full md:w-auto">
              <FiSearch className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`p-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <div className="relative">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  placeholderText="Select date range"
                  className={`p-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                />
                <FiCalendar className={`absolute right-3 top-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
              </div>

              <button
                onClick={resetFilters}
                className={`p-2 rounded-lg flex items-center ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FiX className="mr-1" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className={`mb-6 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Showing {filteredItems.length} of {items.length} items
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="flex justify-center my-20">
            <img src={loading} alt="loading" className="w-20 h-20" />
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  className={`rounded-xl overflow-hidden shadow-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    {item.images?.length > 0 ? (
                      <img
                        src={`${host}${item.images[0]}`}
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          No Image Available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.itemName}
                      </h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.category || 'Uncategorized'}
                      </span>
                    </div>

                    <p className={`text-sm mb-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description?.substring(0, 100)}...
                    </p>

                    <div className={`flex items-center justify-between text-sm mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span>
                        {item.location || 'Unknown location'}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleClaimOpen(item._id)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white'
                        } transition-all`}
                      >
                        <FiCheckCircle />
                        <span>Claim</span>
                      </button>
                      <button
                        onClick={() => navigate(`/details/${item._id}`)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        } transition-all`}
                      >
                        <span>Details</span>
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className={`text-center py-12 rounded-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`text-xl mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No items found matching your criteria
            </div>
            <button
              onClick={resetFilters}
              className={`mt-4 px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Dialog 
        open={openClaimDialog} 
        onClose={handleClaimClose}
        PaperProps={{
          className: `${theme === 'dark' ? '!bg-gray-800' : ''} rounded-2xl`
        }}
      >
        <DialogTitle className={`${theme === 'dark' ? '!text-white' : ''}`}>
          Claim Item Details
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 py-4">
            <TextField
              label="Claim Details"
              value={claimDetails.details}
              onChange={(e) => setClaimDetails({...claimDetails, details: e.target.value})}
              multiline
              rows={4}
              required
              fullWidth
              className={`${theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Full Name"
              value={claimDetails.name}
              onChange={(e) => setClaimDetails({...claimDetails, name: e.target.value})}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={claimDetails.email}
              onChange={(e) => setClaimDetails({...claimDetails, email: e.target.value})}
              required
              fullWidth
            />
            <TextField
              label="SAP ID"
              value={claimDetails.sapId}
              onChange={(e) => setClaimDetails({...claimDetails, sapId: e.target.value})}
              required
              fullWidth
            />
            <TextField
              label="Contact Number"
              value={claimDetails.contactNumber}
              onChange={(e) => setClaimDetails({...claimDetails, contactNumber: e.target.value})}
              required
              fullWidth
            />
            <TextField
              label="Branch"
              value={claimDetails.branch}
              onChange={(e) => setClaimDetails({...claimDetails, branch: e.target.value})}
              fullWidth
            />
            <TextField
              label="Year"
              value={claimDetails.year}
              onChange={(e) => setClaimDetails({...claimDetails, year: e.target.value})}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button 
            onClick={handleClaimClose}
            className={`${theme === 'dark' ? '!text-gray-300' : ''}`}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClaimSubmit}
            variant="contained" 
            className="!bg-gradient-to-r !from-blue-600 !to-purple-600 hover:!from-blue-700 hover:!to-purple-700 !text-white !rounded-lg !px-6 !py-2"
          >
            Submit Claim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Catalog; 