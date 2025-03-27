import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiClock, FiSend, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';
import campusImage from "../images/institute-overview.jpg";

const Contact = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={campusImage} 
          alt="Campus Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          theme === 'dark' 
            ? 'from-gray-900 via-gray-900/80 to-gray-900' 
            : 'from-white via-white/90 to-white'
        }`} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-purple-500 p-4 rounded-2xl shadow-xl">
            <FiMapPin className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
            Contact GLA University
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Get instant support for lost items, campus services, or general inquiries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="space-y-6"
          >
            {[
              {
                icon: <FiMapPin className="h-6 w-6" />,
                title: "Campus Address",
                content: "17km Stone, NH-2, Mathura-Delhi Road\nMathura, Uttar Pradesh 281406",
                color: "from-yellow-400 to-amber-500"
              },
              {
                icon: <FiPhone className="h-6 w-6" />,
                title: "Phone Numbers",
                content: "+91 5662 250900\n+91 5662 250909 (Emergency)",
                color: "from-purple-400 to-indigo-500"
              },
              {
                icon: <FiMail className="h-6 w-6" />,
                title: "Email Addresses",
                content: "lostfound@gla.ac.in\nsupport@gla.ac.in",
                color: "from-pink-400 to-rose-500"
              },
              {
                icon: <FiClock className="h-6 w-6" />,
                title: "Working Hours",
                content: "Mon-Sat: 8AM - 8PM\nSun: 10AM - 4PM",
                color: "from-green-400 to-teal-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`group p-1 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg hover:shadow-xl transition-all`}
              >
                <div className={`h-full rounded-xl p-6 backdrop-blur-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-800/80 hover:bg-gray-700/80' 
                    : 'bg-white/90 hover:bg-gray-50/90'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                      {React.cloneElement(item.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`whitespace-pre-line mt-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-8 rounded-2xl shadow-xl backdrop-blur-lg ${
              theme === 'dark' 
                ? 'bg-gray-800/80 border border-gray-700' 
                : 'bg-white/90 border border-gray-200'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                      theme === 'dark' 
                        ? 'bg-gray-700/50 border-gray-600 focus:ring-purple-500 focus:border-purple-500' 
                        : 'bg-white/50 border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <FiArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 focus:ring-purple-500 focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                  }`}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gradient-to-r from-yellow-300 to-purple-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-purple-500 hover:shadow-xl'
                } text-white`}
              >
                <FiSend className="h-5 w-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Enhanced Map Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/20 hover:border-purple-400/30 transition-all duration-300"
        >
          <iframe
            title="GLA University Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.847835259199!2d77.4927223150563!3d27.50138238286501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39737b60144d6eab%3A0x3c90b2d1a0a872f1!2sGLA%20University!5e0!3m2!1sen!2sin!4v1657544002021!5m2!1sen!2sin"
            width="100%"
            height="450"
            className="border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 