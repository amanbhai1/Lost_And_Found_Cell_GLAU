import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./found.css";
import image from "./bg.jpeg";
import Switch from 'react-switch';
import dark from './darkbg.jpg';
import logo from '../images/Logofornavbar.png';

const FoundUpload = (props) => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    category: '',
    subcategory: '',
    itemName: '',
    itemImage: null,
    place: '',
    ownerName: '',
    details: '',
    isIdentifiable: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post('https://lost-and-found.cyclic.app/api/submitFoundItem', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Reset form after successful submission
      setFormData({
        description: '',
        date: '',
        category: '',
        subcategory: '',
        itemName: '',
        itemImage: null,
        place: '',
        ownerName: '',
        details: '',
        isIdentifiable: false
      });
      alert('Item submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  useEffect(() => {
    if (props.theme !== 'dark') {
      document.body.style.background = `url(${image}) `;
      document.body.style.backgroundSize = 'cover';
    }
    else {
      document.body.style.background = `url(${dark}) `;
      document.body.style.backgroundSize = 'cover';
    }

    return () => {
      document.body.style.background = null;
    };
  }, [props.theme]);

  return (
    <div className={`min-h-screen ${props.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <img src={logo} alt="Logo" className="h-16 mr-4" />
          <h1 className="text-3xl font-bold">Report Found Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter item description"
              required
            />
          </div>

          {/* Date and Place */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date Found</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Place Found</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter place where item was found"
                required
              />
            </div>
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select category</option>
                <option value="Cards">Cards</option>
                <option value="Electronic Devices">Electronic Devices</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
              </select>
            </div>
            {formData.category && (
              <div>
                <label className="block text-sm font-medium mb-2">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select subcategory</option>
                  {/* Add subcategory options based on category */}
                </select>
              </div>
            )}
          </div>

          {/* Item Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Item Image</label>
            <input
              type="file"
              name="itemImage"
              onChange={(e) => setFormData(prev => ({ ...prev, itemImage: e.target.files[0] }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Identifiable Switch */}
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium">Is the item identifiable?</label>
            <Switch
              checked={formData.isIdentifiable}
              onChange={(checked) => setFormData(prev => ({ ...prev, isIdentifiable: checked }))}
              onColor="#3b82f6"
              offColor="#6b7280"
              handleDiameter={24}
              height={28}
              width={56}
            />
          </div>

          {/* Owner Details (if identifiable) */}
          {formData.isIdentifiable && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Owner's Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter owner's name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter additional details"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Found Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundUpload;
