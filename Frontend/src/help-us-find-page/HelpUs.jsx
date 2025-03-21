import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { FiAlertCircle, FiEye, FiInfo } from 'react-icons/fi';
import loading from "./loading.gif";

const HelpUs = ({ theme }) => {
  const [lostItems, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/getLostItems`);
        const data = await response.json();
        setItems(data.data || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 }
  };

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Help Reunite Lost Items
            <span className="block text-blue-500 mt-2">With Their Owners</span>
          </motion.h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Contribute to our campus community by helping identify these lost items
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-20">
            <img src={loading} alt="loading" className="w-20 h-20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lostItems.length > 0 ? (
              lostItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  className={`rounded-2xl overflow-hidden shadow-xl ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    {item.images?.length > 0 ? (
                      <img
                        src={`${host}/lostItemImages/${item.images[0]}`}
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <FiEye className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <FiAlertCircle className={`h-6 w-6 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.itemName || 'Unnamed Item'}
                      </h3>
                    </div>
                    
                    <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.description || 'No description provided'}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <FiInfo className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <Link
                        to={`/item-details/${item._id}`}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className={`text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  No lost items to display
                </div>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Check back later or report a found item
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HelpUs;