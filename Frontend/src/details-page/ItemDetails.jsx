import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiMapPin, FiTag, FiShare2, FiAlertTriangle, FiMessageSquare } from 'react-icons/fi';
import { TbProgressCheck } from 'react-icons/tb';
import loading from "./loading.gif";

const ItemDetails = ({ theme }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const host = "http://localhost:5000";

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
      <div className={`relative h-96 overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="max-w-6xl mx-auto px-8 pt-12">
          <div className="flex justify-between items-start mb-8">
            <Link
              to="/catalog"
              className={`flex items-center space-x-2 backdrop-blur-sm rounded-full px-6 py-3 ${
                theme === 'dark' 
                  ? 'bg-black/30 hover:bg-black/50 text-white' 
                  : 'bg-white/80 hover:bg-white text-gray-900'
              }`}
            >
              <FiArrowLeft className="text-lg" />
              <span className="font-medium">Back to Catalog</span>
            </Link>
            
            <div className="flex space-x-3">
              <button className={`p-3 rounded-full backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-black/30 hover:bg-black/50 text-white' 
                  : 'bg-white/80 hover:bg-white text-gray-900'
              }`}>
                <FiShare2 />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-6"
          >
            {item.images?.length > 0 ? (
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                <img
                  src={`${host}${item.images[0]}`}
                  alt={item.itemName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-white/10 flex items-center justify-center">
                <FiAlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.itemName}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 -mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10">
            {/* Enhanced Image Gallery */}
            <div className="space-y-6">
              <div className="relative h-96 rounded-2xl overflow-hidden group">
                {item.images?.length > 0 ? (
                  <>
                    <img
                      src={`${host}${item.images[0]}`}
                      alt={item.itemName}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {item.images?.slice(1).map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={`${host}${image}`}
                      alt={`${item.itemName} ${index + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Details Section */}
            <div className="space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 text-emerald-800">
                <TbProgressCheck className="w-5 h-5 mr-2" />
                <span className="font-medium">Active Listing</span>
              </div>

              {/* Metadata Grid */}
              <div className={`grid grid-cols-2 gap-4 p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiTag className="w-4 h-4 mr-2" />
                    Category
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.category}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Reported Date
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    Location Found
                  </div>
                  <div className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.location}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Item Description
                </h2>
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.description || 'No description provided'}
                </p>
              </div>

              {/* Contact Section */}
              {item.contactInfo && (
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'
                }`}>
                  <div className="flex items-center mb-4">
                    <FiMessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                    <h3 className="text-xl font-semibold">Contact Owner</h3>
                  </div>
                  <div className="space-y-2">
                    <p className={`break-all ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item.contactInfo}
                    </p>
                    <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]">
                      Mark as Found
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className={`p-4 rounded-full shadow-lg backdrop-blur-sm flex items-center ${
          theme === 'dark' 
            ? 'bg-black/30 hover:bg-black/50 text-white' 
            : 'bg-white/80 hover:bg-white text-gray-900'
        }`}>
          <FiAlertTriangle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ItemDetails; 