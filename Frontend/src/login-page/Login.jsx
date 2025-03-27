import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import glaLogo from '../images/Logofornavbar.png';

const Login = ({ theme }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true
      });

      if (response.data.message) {
        // Store authentication data in localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        setMessage({ type: 'success', content: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setMessage({ type: 'error', content: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <div className={`relative w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-8 lg:p-12 space-y-8">
          <div className="text-center space-y-4">
            <img 
              src={glaLogo} 
              alt="GLA Logo" 
              className="w-24 mx-auto mb-4 animate-pulse"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Sign in to continue
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

          <form onSubmit={handleLogin} className="space-y-6">
            {[
              { icon: FaEnvelope, name: 'email', placeholder: 'University Email', type: 'email' },
              { icon: FaLock, name: 'password', placeholder: 'Password', type: 'password' },
            ].map((field, index) => (
              <div key={index}>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {field.placeholder}
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600">
                  <field.icon className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm dark:text-white placeholder-gray-400"
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:from-green-600 hover:to-blue-600'
              }`}
            >
              {loading ? 'Logging In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => navigate('/signup')}
              className="text-green-500 hover:text-green-600 text-sm"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;