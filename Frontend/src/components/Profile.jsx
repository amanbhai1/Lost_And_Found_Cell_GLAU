import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiBook, FiCalendar, FiSave } from 'react-icons/fi';

const Profile = ({ theme }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    section: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
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
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }
        
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }
        
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err instanceof SyntaxError) {
          setError('Invalid response from server');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(userData)
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      if (err instanceof SyntaxError) {
        setError('Invalid response from server');
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-pulse text-gray-500 dark:text-gray-400">
        Loading profile...
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">
        <div className={`p-8 rounded-2xl shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Profile Settings
          </h1>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <FiUser className="mr-2 h-4 w-4" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
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
                <FiPhone className="mr-2 h-4 w-4" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiBook className="mr-2 h-4 w-4" />
                  Course
                </label>
                <select
                  name="course"
                  value={userData.course}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MBA">MBA</option>
                  <option value="BBA">BBA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div>
                <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiCalendar className="mr-2 h-4 w-4" />
                  Academic Year
                </label>
                <select
                  name="year"
                  value={userData.year}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } p-3 shadow-sm focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className={`flex items-center text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={userData.section}
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 