import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './lost.css';
import image from './bg.jpeg';
import dark from './darkbg.jpg';

const LostUpload = (props) => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    phone: '',
    name: '',
    sapId: '',
    category: '',
    subcategory: '',
    itemName: '',
    place: '',
    images: [],
    previews: []
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images' && key !== 'previews') {
        data.append(key, formData[key]);
      }
    });

    // Append all images
    formData.images.forEach(image => {
      data.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/submitLostItem', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setFormData({
          description: '',
          date: '',
          phone: '',
          name: '',
          sapId: '',
          category: '',
          subcategory: '',
          itemName: '',
          place: '',
          images: [],
          previews: []
        });
        alert('Item submitted successfully!');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.response?.data?.message || 'Server error'}`);
    }
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
      subcategory: ''
    }));
  };

  const handleSubcategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      subcategory: e.target.value,
      ...(e.target.value === 'other' && { itemName: '' })
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 6);
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      previews: [...prev.previews, ...previews]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index)
    }));
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

  const renderSubcategoryOptions = () => {
    switch (formData.category) {
      case 'Cards':
        return (
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select subcategory</option>
            <option value="College ID Card">College ID Card</option>
            <option value="ATM Card">ATM Card</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="other">Any other card</option>
          </select>
        );
      case 'Electronic Devices':
        return (
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select subcategory</option>
            <option value="Mobile Phone">Mobile Phones</option>
            <option value="Laptop">Laptop</option>
            <option value="Smart Watch">Smart Watch</option>
            <option value="Charger">Charger</option>
            <option value="other">Any other electronic device</option>
          </select>
        );
      case 'Books':
        return (
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select subcategory</option>
            <option value="Notebook">Notebooks/Registers</option>
            <option value="Book">Book</option>
            <option value="Novel">Novel</option>
            <option value="other">Any other book</option>
          </select>
        );

      case 'Others':
        return (
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select subcategory</option>
            <option value="Bottle">Bottles</option>
            <option value="Wallet">Wallets</option>
            <option value="Bag">Bags</option>
            <option value="other">Any other item</option>
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-cover bg-center" style={{backgroundImage: `url(${props.theme === 'dark' ? dark : image})`}}>
      <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/95 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lost Item Report
        </h1>

        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FormGroup label="Full Name" required>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </FormGroup>

            <FormGroup label="SAP ID" required>
              <Input
                type="text"
                value={formData.sapId}
                onChange={(e) => setFormData(prev => ({ ...prev, sapId: e.target.value }))}
                placeholder="Enter your SAP ID"
              />
            </FormGroup>

            <FormGroup label="Description" required>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the lost item"
                rows="3"
              />
            </FormGroup>

            <FormGroup label="Date of Loss" required>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </FormGroup>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormGroup label="Contact Number" required>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </FormGroup>

            <FormGroup label="Category" required>
              <Select
                value={formData.category}
                onChange={handleCategoryChange}
                options={[
                  'Cards',
                  'Electronic Devices',
                  'Books',
                  'Others'
                ]}
              />
            </FormGroup>

            {formData.category && (
              <FormGroup label="Subcategory" required>
                {renderSubcategoryOptions()}
              </FormGroup>
            )}

            {formData.subcategory === 'other' && (
              <FormGroup label="Item Name" required>
                <Input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                  placeholder="Specify item name"
                />
              </FormGroup>
            )}

            <FormGroup label="Upload Images (max 6)" required>
              <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 transition-colors hover:border-blue-500 relative group">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                  id="image-upload"
                />
                
                <div className="flex flex-col items-center justify-center min-h-[150px]">
                  <label 
                    htmlFor="image-upload" 
                    className="cursor-pointer flex flex-col items-center w-full"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        className="mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => document.getElementById('image-upload').click()}
                      >
                        Choose Files
                      </button>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        or drag and drop here
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB each (max 6 files)
                      </p>
                    </div>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {formData.images.length} file{formData.images.length > 1 ? 's' : ''} selected
                  </div>
                )}
              </div>

              {/* Image Previews */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </FormGroup>

            <FormGroup label="Location of Loss">
              <Input
                type="text"
                value={formData.place}
                onChange={(e) => setFormData(prev => ({ ...prev, place: e.target.value }))}
                placeholder="Where did you lose the item?"
              />
            </FormGroup>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] focus-ring"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LostUpload;

// Add these reusable components at the bottom of the file
const FormGroup = ({ label, children, required }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-ring transition-colors ${className}`}
    {...props}
  />
);

const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-ring transition-colors ${className}`}
    {...props}
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus-ring transition-colors"
    value={value}
    onChange={onChange}
  >
    <option value="">Select an option</option>
    {options.map(option => (
      <option key={option} value={option} className="dark:bg-gray-800">
        {option}
      </option>
    ))}
  </select>
);
