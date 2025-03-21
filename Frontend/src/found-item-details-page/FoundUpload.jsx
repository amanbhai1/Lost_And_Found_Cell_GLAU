import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
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
    document.body.style.background = props.theme === 'dark' 
      ? 'linear-gradient(to bottom, #1a202c, #2d3748)' 
      : 'linear-gradient(to bottom, #f7fafc, #edf2f7)';
    return () => {
      document.body.style.background = null;
    };
  }, [props.theme]);

  return (
    <div className={`min-h-screen ${props.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <img src={logo} alt="Logo" className="h-20" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Report Found Item
          </h1>
        </div>

        <form onSubmit={handleSubmit} className={`space-y-6 p-8 rounded-xl shadow-2xl ${
          props.theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm`}>
          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
              placeholder="Enter item description"
              required
            />
          </div>

          {/* Date and Place */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date Found</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Place Found</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
                placeholder="Enter place where item was found"
                required
              />
            </div>
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
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
              <div className="space-y-2">
                <label className="block text-sm font-medium">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
                  required
                >
                  <option value="">Select subcategory</option>
                </select>
              </div>
            )}
          </div>

          {/* Item Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Item Image</label>
            <input
              type="file"
              name="itemImage"
              onChange={(e) => setFormData(prev => ({ ...prev, itemImage: e.target.files[0] }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
              <div className="space-y-2">
                <label className="block text-sm font-medium">Owner's Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
                  placeholder="Enter owner's name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Additional Details</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
                  placeholder="Enter additional details"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
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
