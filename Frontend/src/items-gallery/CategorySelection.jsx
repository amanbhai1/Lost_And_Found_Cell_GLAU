import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiSmartphone, FiCreditCard, FiBox, FiChevronRight } from 'react-icons/fi';

const CategorySelection = ({ theme }) => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Cards', 
      icon: <FiCreditCard className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      subcategories: ['College ID Card', 'ATM Card', "Driver's License", 'Aadhar Card', 'Any Other Card'] 
    },
    { 
      name: 'Books', 
      icon: <FiBook className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-600',
      subcategories: ['Notebook', 'Book', 'Novel', 'Any Other Book'] 
    },
    { 
      name: 'Devices', 
      icon: <FiSmartphone className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      subcategories: ['Mobile Phone', 'Laptop', 'Smart Watch', 'Charger', 'Any Other Device'] 
    },
    { 
      name: 'Others', 
      icon: <FiBox className="w-8 h-8" />,
      color: 'from-rose-500 to-rose-600',
      subcategories: ['Bottle', 'Wallet', 'Bag', 'Any other Item'] 
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lost & Found Hub
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a category to browse items
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              className="group relative h-auto rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
              
              <div className="relative flex flex-col items-center justify-between p-6 h-full">
                <div className="text-center mb-6 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-white mt-4">{category.name}</h2>
                </div>
                
                <div className="w-full space-y-3 flex-grow">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => navigate(`/items/${subcategory}`)}
                      className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm md:text-base rounded-lg font-medium transition-all transform hover:scale-[1.02] flex items-center justify-between"
                    >
                      <span>{subcategory}</span>
                      <FiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Can't find your item category?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
