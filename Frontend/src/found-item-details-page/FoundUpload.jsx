import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import logo from '../images/Logofornavbar.png';
import { FiX } from 'react-icons/fi';

const categories = [
  { 
    name: 'Cards',
    subcategories: ['College ID Card', 'ATM Card', "Driver's License", 'Aadhar Card', 'Any Other Card']
  },
  { 
    name: 'Books',
    subcategories: ['Notebook', 'Book', 'Novel', 'Any Other Book']
  },
  { 
    name: 'Electronic Devices',
    subcategories: ['Mobile Phone', 'Laptop', 'Smart Watch', 'Charger', 'Any Other Device']
  },
  { 
    name: 'Others',
    subcategories: ['Bottle', 'Wallet', 'Bag', 'Any other Item']
  }
];

const FoundUpload = (props) => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    category: '',
    subcategory: '',
    itemName: '',
    images: [],
    place: '',
    ownerName: '',
    details: '',
    isIdentifiable: false
  });

  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }
    
    const newFiles = files.slice(0, 6 - formData.images.length);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({ ...prev, images: newImages }));
    setPreviewUrls(newPreviews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length + formData.images.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }
    
    const newFiles = files.slice(0, 6 - formData.images.length);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'images') data.append(key, value);
    });

    formData.images.forEach((file, index) => {
      data.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/submitFoundItem', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setFormData({
          description: '',
          date: '',
          category: '',
          subcategory: '',
          itemName: '',
          images: [],
          place: '',
          ownerName: '',
          details: '',
          isIdentifiable: false
        });
        alert('Item submitted successfully!');
      } else {
        alert('Submission failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.response?.data?.message || 'Submission failed'}`);
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
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
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
                  {categories
                    .find(cat => cat.name === formData.category)
                    ?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          {/* Item Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Item Images (Max 6)</label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${props.theme === 'dark' ? 'border-gray-600 hover:border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="space-y-2">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  <p className="text-sm">
                    Drag & drop images here or click to upload<br />
                    (Maximum 6 images, 2MB each)
                  </p>
                </div>
              </label>
              
              {/* Image Previews */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              {previewUrls.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  {previewUrls.length} image(s) selected
                </p>
              )}
            </div>
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

          {/* Item Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-transparent"
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={formData.images.length === 0}
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
