import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiSmartphone, FiCreditCard, FiBox, FiChevronRight, FiHelpCircle } from 'react-icons/fi';

const CategorySelection = ({ theme }) => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Cards', 
      icon: <FiCreditCard className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      subcategories: ['College ID Card', 'ATM Card', "Driver's License", 'Aadhar Card', 'Any Other Card'],
      stats: { found: 142, claimed: 118 }
    },
    { 
      name: 'Books', 
      icon: <FiBook className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-600',
      subcategories: ['Notebook', 'Book', 'Novel', 'Any Other Book'],
      stats: { found: 89, claimed: 72 }
    },
    { 
      name: 'Devices', 
      icon: <FiSmartphone className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      subcategories: ['Mobile Phone', 'Laptop', 'Smart Watch', 'Charger', 'Any Other Device'],
      stats: { found: 65, claimed: 48 }
    },
    { 
      name: 'Others', 
      icon: <FiBox className="w-8 h-8" />,
      color: 'from-rose-500 to-rose-600',
      subcategories: ['Bottle', 'Wallet', 'Bag', 'Any other Item'],
      stats: { found: 204, claimed: 165 }
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
            <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} px-6 py-2 rounded-full`}>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Lost & Found Hub
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reuniting People with Their Belongings
          </h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover your lost items through our categorized system. Select a category below to browse recently found items.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover="hover"
              className="group relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all backdrop-blur-lg bg-white/5 border border-white/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
              
              <div className="relative flex flex-col items-center justify-between p-6 h-full">
                <div className="text-center mb-6 space-y-6 w-full">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <motion.div
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        className="text-white"
                      >
                        {category.icon}
                      </motion.div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80">Total Found</p>
                      <p className="text-2xl font-bold text-white">{category.stats.found}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-white mt-4">{category.name}</h2>
                  
                  <div className="flex justify-center gap-4 text-sm text-white/80">
                    <div className="text-center">
                      <p className="font-semibold">{category.stats.claimed}</p>
                      <p className="text-xs">Items Claimed</p>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-center">
                      <p className="font-semibold">{category.stats.found - category.stats.claimed}</p>
                      <p className="text-xs">Awaiting Claim</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full space-y-3 flex-grow">
                  {category.subcategories.map((subcategory) => (
                    <motion.button
                      key={subcategory}
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(`/items/${subcategory}`)}
                      className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm md:text-base rounded-xl font-medium transition-all flex items-center justify-between"
                    >
                      <span>{subcategory}</span>
                      <FiChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-lg"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <FiHelpCircle className="w-12 h-12 text-purple-600 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Can't Find Your Item?
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Our support team is available 24/7 to help you track down your lost items.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <FiHelpCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySelection;
