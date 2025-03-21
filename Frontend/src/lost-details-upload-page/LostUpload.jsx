import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './lost.css';
import image from './bg.jpeg';
import dark from './darkbg.jpg';

const LostUpload = (props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [sapId, setSapId] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [place, setPlace] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    formData.append('phone', phone);
    formData.append('name', name);
    formData.append('sapId', sapId);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('itemName', itemName);
    formData.append('itemImage', itemImage);
    formData.append('place', place);

    try {
      await axios.post('https://localhost:5000/api/submitLostItem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset form fields after successful submission
      setDescription('');
      setDate('');
      setPhone('');
      setName('');
      setSapId('');
      setCategory('');
      setSubcategory('');
      setItemName('');
      setItemImage(null);
      setPlace('');
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory('');
    setItemName('');
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    if (e.target.value === 'other') {
      setItemName('');
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

  const renderSubcategoryOptions = () => {
    switch (category) {
      case 'Cards':
        return (
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
            value={subcategory}
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
            value={subcategory}
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
            value={subcategory}
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
            value={subcategory}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </FormGroup>

            <FormGroup label="SAP ID" required>
              <Input
                type="text"
                value={sapId}
                onChange={(e) => setSapId(e.target.value)}
                placeholder="Enter your SAP ID"
              />
            </FormGroup>

            <FormGroup label="Description" required>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the lost item"
                rows="3"
              />
            </FormGroup>

            <FormGroup label="Date of Loss" required>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormGroup label="Contact Number" required>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </FormGroup>

            <FormGroup label="Category" required>
              <Select
                value={category}
                onChange={handleCategoryChange}
                options={[
                  'Cards',
                  'Electronic Devices',
                  'Books',
                  'Others'
                ]}
              />
            </FormGroup>

            {category && (
              <FormGroup label="Subcategory" required>
                {renderSubcategoryOptions()}
              </FormGroup>
            )}

            {subcategory === 'other' && (
              <FormGroup label="Item Name" required>
                <Input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Specify item name"
                />
              </FormGroup>
            )}

            <FormGroup label="Upload Image" required>
              <div className="mt-1 flex flex-col items-center justify-center px-6 pt-8 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl transition-colors hover:border-primary dark:hover:border-secondary">
                <input
                  className="sr-only"
                  type="file"
                  onChange={(e) => setItemImage(e.target.files[0])}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Drag & drop or click to upload
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG up to 2MB
                </span>
              </div>
            </FormGroup>

            <FormGroup label="Location of Loss">
              <Input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
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
