import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiSave } from 'react-icons/fi';

const AccountSettings = ({ theme }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch account details');
        }

        setUserEmail(data.email);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err instanceof SyntaxError) {
          setError('Invalid response from server');
        }
      }
    };

    fetchUserEmail();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      const payload = {
        currentPassword: formData.currentPassword,
        ...(formData.newEmail && { newEmail: formData.newEmail }),
        ...(formData.newPassword && { newPassword: formData.newPassword })
      };

      const response = await fetch('/api/users/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Account update failed');
      }

      if (data.email) {
        setUserEmail(data.email);
      }

      setSuccess('Account settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setFormData({
        currentPassword: '',
        newEmail: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-pulse text-gray-500 dark:text-gray-400">
        Loading account settings...
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">
        <div className={`p-8 rounded-2xl shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Account Settings
          </h1>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <FiMail className="mr-2 h-4 w-4" />
                Current Email
              </label>
              <input
                type="email"
                value={userEmail}
                readOnly
                className={`mt-1 block w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-gray-300' 
                    : 'border-gray-300 bg-gray-50 text-gray-500'
                } p-3 shadow-sm cursor-not-allowed`}
              />
            </div>

            <div>
              <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <FiMail className="mr-2 h-4 w-4" />
                New Email
              </label>
              <input
                type="email"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <FiLock className="mr-2 h-4 w-4" />
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className={`mt-1 block w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiLock className="mr-2 h-4 w-4" />
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiLock className="mr-2 h-4 w-4" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiSave className="mr-2 h-4 w-4" />
              Update Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings; 