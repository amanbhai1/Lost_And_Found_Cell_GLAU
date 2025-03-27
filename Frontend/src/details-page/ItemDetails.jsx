import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiMapPin, FiTag, FiAlertTriangle, FiMessageSquare, FiZoomIn, FiX, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { TbProgressCheck } from 'react-icons/tb';
import loading from "./loading.gif";

const ItemDetails = ({ theme }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const host = "http://localhost:5000";
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const navigate = useNavigate();

  const modalStyles = {
    overlay: {
      backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(10px)'
    },
    content: {
      border: 'none',
      background: 'transparent',
      inset: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${host}/api/getItemDetails/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch item');
        }

        if (data.success) {
          setItem(data.item);
        } else {
          setError(data.message || 'Item not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch item details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItemDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loading} alt="loading" className="w-20 h-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen p-4 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-xl mb-4">{error}</div>
        <Link
          to="/catalog"
          className={`px-4 py-2 rounded-lg flex items-center ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FiArrowLeft className="mr-2" /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-80 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/categories"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white/90 text-gray-600 hover:bg-white'
              } shadow-lg transition-all`}
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Catalog</span>
            </Link>
          </motion.div>

          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="w-32 h-32 md:w-48 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-8 border-white dark:border-gray-800 shadow-xl cursor-pointer"
              onClick={() => item.images?.[0] && setSelectedImage(item.images[0])}
            >
              {item.images?.[0] ? (
                <img
                  src={`${host}${item.images[0]}`}
                  alt={item.itemName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <FiAlertTriangle className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
              )}
            </motion.div>
            
            <motion.div className="space-y-2 md:space-y-4 px-4 sm:px-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {item.itemName}
              </h1>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' 
                    ? 'bg-emerald-900/30 text-emerald-400' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {item.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="aspect-square rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl relative group"
            >
              {item.images?.[0] ? (
                <>
                  <img
                    src={`${host}${item.images[0]}`}
                    alt={item.itemName}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    onClick={() => setSelectedImage(item.images[0])}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              
              {item.images?.[0] && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    className={`p-2 rounded-lg backdrop-blur-sm ${
                      theme === 'dark' 
                        ? 'bg-gray-800/30 text-white' 
                        : 'bg-white/80 text-gray-900'
                    }`}
                    onClick={() => setSelectedImage(item.images[0])}
                  >
                    <FiZoomIn className="w-6 h-6" />
                  </button>
                </div>
              )}
            </motion.div>

            <div className="flex space-x-2 md:space-x-4 pb-2 md:pb-4">
              {item.images?.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden cursor-pointer relative group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`${host}${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-xs font-medium text-white truncate">
                      {item.itemName} #{index + 1}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Location Card */}
            <motion.div 
              whileHover={{ y: -2 }}
              className={`p-4 md:p-6 rounded-2xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <FiMapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">Found Location</h3>
                  <p className="text-gray-500 dark:text-gray-400">Where the item was discovered</p>
                </div>
              </div>
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {item.location || 'Unknown location'}
              </p>
            </motion.div>

            {/* Description Card */}
            <motion.div 
              whileHover={{ y: -2 }}
              className={`p-4 md:p-6 rounded-2xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <FiTag className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">Full Description</h3>
                  <p className="text-gray-500 dark:text-gray-400">Detailed information about the item</p>
                </div>
              </div>
              <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                !item.description && 'italic text-gray-400'
              }`}>
                {item.description || 'No detailed description available'}
              </p>
            </motion.div>

            {/* Claim Section */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={`p-4 md:p-6 rounded-2xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center space-x-2 md:space-x-3 mb-6">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <FiCheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">Claim Process</h3>
                  <p className="text-gray-500 dark:text-gray-400">Verify ownership to retrieve item</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px -3px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-4 md:px-8 md:py-5 text-base md:text-lg font-semibold rounded-xl transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                } flex items-center justify-center gap-3 shadow-lg hover:shadow-xl`}
                onClick={() => navigate(`/claim/${id}`)}
              >
                <span>Start Claim Process</span>
                <motion.span 
                  whileHover={{ x: 3, rotate: -45 }}
                  className="inline-block"
                >
                  <FiExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
        <button className="p-3 md:p-4">
          <FiAlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotate: 2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9, rotate: -2 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${host}${selectedImage}`}
                alt="Enlarged view"
                className="w-full h-full object-contain max-h-[90vh] rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
              >
                <FiX className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemDetails; 