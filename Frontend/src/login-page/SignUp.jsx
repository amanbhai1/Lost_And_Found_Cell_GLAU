import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaUsers, FaFacebookF, FaLinkedinIn, FaGoogle, FaLock } from 'react-icons/fa';
import glaLogo from '../images/Logofornavbar.png';
import axios from 'axios';

const SignUp = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    section: '',
    password: ''
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });
    setLoading(true);

    if (!formData.email.endsWith('@gla.ac.in')) {
      setMessage({ 
        type: 'error', 
        content: 'Only GLA University emails (@gla.ac.in) are allowed' 
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true
      });

      if (response.data.message) {
        setMessage({ 
          type: 'success', 
          content: 'Registration successful! Redirecting to login...' 
        });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      // Handle network errors
      if (err.message === 'Network Error') {
        errorMessage = 'Network error - please check your internet connection';
      }
      // Handle server response errors
      else if (err.response) {
        const status = err.response.status;
        const serverError = err.response.data?.error;
        const validationErrors = err.response.data?.errors;

        // Handle different error types based on status code
        switch(status) {
          case 400:
            if (validationErrors) {
              errorMessage = validationErrors.map(e => e.msg).join(', ');
            } else if (serverError) {
              errorMessage = serverError;
            }
            break;
          case 409:
            errorMessage = 'User already exists with this email address';
            break;
          case 500:
            errorMessage = 'Server error - please try again later';
            break;
          default:
            errorMessage = `Unexpected error (${status}) - please try again`;
        }
      }
      // Handle request setup errors
      else {
        errorMessage = 'Error in request setup - please check your input';
      }

      setMessage({ type: 'error', content: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <div className={`relative w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Signup Form */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 space-y-8">
            <div className="text-center space-y-4">
              <img 
                src={glaLogo} 
                alt="GLA Logo" 
                className="w-24 mx-auto mb-4 animate-pulse"
              />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Join our campus community
              </p>
              {message.content && (
                <div className={`p-3 rounded-lg ${message.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'}`}>
                  <div className="flex items-center justify-between">
                    <span>{message.content}</span>
                    <button 
                      onClick={() => setMessage({ type: '', content: '' })}
                      className="ml-2 hover:opacity-75"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Social Signup Buttons */}
            <div className="space-y-6">
              <div className="flex justify-center gap-4">
                <button className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:scale-105 transition-transform">
                  <FaFacebookF className="text-xl" />
                </button>
                <button className="p-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white hover:scale-105 transition-transform">
                  <FaLinkedinIn className="text-xl" />
                </button>
                <button className="p-3 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white hover:scale-105 transition-transform">
                  <FaGoogle className="text-xl" />
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                    Or register with email
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              {[
                { icon: FaUser, name: 'name', placeholder: 'Full Name' },
                { icon: FaEnvelope, name: 'email', placeholder: 'University Email', type: 'email', pattern: '[a-zA-Z0-9._%+-]+@gla\\.ac\\.in', title: 'Please use your GLA University email' },
                { icon: FaPhone, name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                { icon: FaGraduationCap, name: 'course', placeholder: 'Course' },
                { icon: FaCalendarAlt, name: 'year', placeholder: 'Academic Year' },
                { icon: FaUsers, name: 'section', placeholder: 'Section' },
                { icon: FaLock, name: 'password', placeholder: 'Password', type: 'password' },
              ].map((field, index) => (
                <div key={index}>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {field.placeholder}
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600">
                    <field.icon className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Password must contain:
                <ul className="list-disc pl-5">
                  <li>Minimum 8 characters</li>
                  <li>At least 1 letter</li>
                  <li>At least 1 number</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:from-green-600 hover:to-blue-600'
                }`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                  Already have an account?
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/login')}
              className="w-full py-2.5 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-500/10 transition-colors"
            >
              Sign In Instead
            </button>
          </div>

          {/* Right Section - Welcome */}
          <div className="hidden md:block w-1/2 bg-gradient-to-br from-green-600 to-blue-600 p-12 relative">
            <div className="absolute inset-0 bg-opacity-10 bg-white backdrop-blur-sm" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">Welcome to GLA!</h2>
              <p className="text-lg text-white/90 px-8">
                Start your journey with our campus lost & found system
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-2.5 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all hover:border-white/50 hover:scale-105"
              >
                Existing User? Sign In
              </button>
              <p className="text-sm text-white/80">
                Secure & Verified Campus System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;