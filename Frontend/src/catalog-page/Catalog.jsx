import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCalendar, FiX, FiCheckCircle, FiChevronRight, FiMapPin, FiMail, FiPlus, FiSliders, FiHeart } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import loading from "./loading.gif";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { TbZoomQuestion } from 'react-icons/tb';

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 animate-gradient-pan" />
          <div className="relative py-20 px-8 space-y-4">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 p-1 rounded-full"
            >
              <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-full px-6 py-2 text-sm font-semibold`}>
                🎉 1000+ Items Reunited
              </div>
            </motion.div>
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent`}>
              Lost & Found Hub
            </h1>
          </div>
        </motion.div>

        {/* Filters Section */}
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-lg ${
          theme === 'dark' ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/90 border border-gray-100'
        } shadow-xl`}>
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

            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                      : theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
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
          <div className="flex justify-center my-20 space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-200"></div>
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
                  className={`rounded-2xl overflow-hidden shadow-xl ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="relative h-56 overflow-hidden group">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <button className={`p-2 rounded-full backdrop-blur-sm ${
                        theme === 'dark' ? 'bg-gray-800/30 text-red-400' : 'bg-white/30 text-red-500'
                      }`}>
                        <FiHeart className="w-5 h-5" />
                      </button>
                      {item.resolved && (
                        <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          theme === 'dark' ? 'bg-emerald-800/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          Resolved
                        </div>
                      )}
                    </div>
                    {item.images?.length > 0 ? (
                      <>
                        <img
                          src={`${host}${item.images[0]}`}
                          alt={item.itemName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </>
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
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`flex items-center space-x-2 text-sm ${
                        theme === 'dark' ? 'text-gray-200' : 'text-white'
                      }`}>
                        <FiMapPin className="flex-shrink-0" />
                        <span>{item.location || 'Unknown location'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.itemName}
                      </h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 text-emerald-400' 
                          : 'bg-gray-100 text-emerald-600'
                      }`}>
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>

                    <p className={`text-sm mb-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description?.substring(0, 120)}...
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleClaimOpen(item._id)}
                        className={`flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-emerald-600/90 hover:bg-emerald-700 text-white'
                            : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white'
                        } transition-all group`}
                      >
                        <FiCheckCircle className="group-hover:animate-pulse" />
                        <span>Claim Item</span>
                      </button>
                      <button
                        onClick={() => navigate(`/details/${item._id}`)}
                        className={`p-2.5 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 hover:bg-gray-600/70 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        } transition-all`}
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 rounded-2xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-lg`}
          >
            <div className="mb-6 inline-block p-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
              <TbZoomQuestion className="w-16 h-16 text-emerald-500" />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              No Items Found
            </h3>
            <p className={`mb-6 max-w-md mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try adjusting your filters or check back later for new additions
            </p>
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
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 md:hidden z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={`p-4 rounded-full shadow-xl ${
            theme === 'dark' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
          }`}
        >
          <FiSliders className="w-6 h-6" />
        </motion.button>
      </div>

      <Dialog 
        open={openClaimDialog} 
        onClose={handleClaimClose}
        PaperProps={{
          className: `${theme === 'dark' ? '!bg-gray-800' : ''} rounded-2xl !max-w-md`
        }}
      >
        <DialogTitle className={`${theme === 'dark' ? '!text-white' : ''} !pb-2`}>
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Claim Request
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Please provide accurate details to verify your ownership
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 py-4">
            {Object.entries(claimDetails).map(([key, value]) => (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(e) => setClaimDetails({...claimDetails, [key]: e.target.value})}
                fullWidth
                variant="outlined"
                className={`${theme === 'dark' ? '!text-white' : ''}`}
                InputProps={{
                  className: `rounded-xl ${theme === 'dark' ? '!text-white !bg-gray-700/20' : ''}`,
                  endAdornment: (
                    <motion.div whileHover={{ scale: 1.1 }}>
                      {key === 'email' && <FiMail className="text-gray-400 ml-2" />}
                    </motion.div>
                  )
                }}
                required={['details', 'name', 'email', 'sapId', 'contactNumber'].includes(key)}
              />
            ))}
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