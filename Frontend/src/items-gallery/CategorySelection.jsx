import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./category.css";
import { FiBook, FiSmartphone, FiCreditCard, FiBox } from 'react-icons/fi';

const CategorySelection = (props) => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Cards', 
      icon: <FiCreditCard className="w-12 h-12 mb-4 text-white" />,
      color: 'from-blue-500 to-blue-700',
      subcategories: ['College ID Card', 'ATM Card', "Driver's License", 'Aadhar Card', 'Any Other Card'] 
    },
    { 
      name: 'Books', 
      icon: <FiBook className="w-12 h-12 mb-4 text-white" />,
      color: 'from-emerald-500 to-emerald-700',
      subcategories: ['Notebook', 'Book', 'Novel', 'Any Other Book'] 
    },
    { 
      name: 'Devices', 
      icon: <FiSmartphone className="w-12 h-12 mb-4 text-white" />,
      color: 'from-purple-500 to-purple-700',
      subcategories: ['Mobile Phone', 'Laptop', 'Smart Watch', 'Charger', 'Any Other Device'] 
    },
    { 
      name: 'Others', 
      icon: <FiBox className="w-12 h-12 mb-4 text-white" />,
      color: 'from-rose-500 to-rose-700',
      subcategories: ['Bottle', 'Wallet', 'Bag', 'Any other Item'] 
    },
  ];

  const handleSubcategorySelect = (subcategory) => {
    navigate(`/items/${subcategory}`);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${props.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lost & Found Marketplace
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse through categories to find your lost items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative h-auto rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className={`flex flex-col items-center justify-between p-6 h-full bg-gradient-to-br ${category.color}`}>
                <div className="text-center mb-6">
                  {category.icon}
                  <h2 className="text-2xl font-semibold text-white mt-4">{category.name}</h2>
                </div>
                
                <div className="w-full space-y-3 flex-grow">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => handleSubcategorySelect(subcategory)}
                      className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm md:text-base rounded-lg font-medium transition-all transform hover:scale-[1.02]"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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
