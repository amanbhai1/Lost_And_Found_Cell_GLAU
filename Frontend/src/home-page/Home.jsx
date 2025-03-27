import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCheckCircle, FiClock, FiMapPin, FiAlertCircle, FiBook, FiBox, FiSmartphone, FiTag, FiGrid, FiList, FiCreditCard, FiBriefcase, FiKey, FiChevronRight, FiHeart, FiGift, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import heroImage from '../images/h-aboutremove.png';
import libraryImage from '../images/library.jpg';
import campusImage from '../images/institute-overview.jpg';
import hostelImage from '../images/hostel-1.jpg';
import auditoriumImage from '../images/conference-halls-banner.jpg';
import mapImage from '../images/campusmap.jpg';
import completeTourImage from '../images/complete-tour.jpg';

// Update the images object with working URLs
const images = {
  hero: heroImage,
  library: libraryImage,
  campus: campusImage,
  hostel: hostelImage,
  auditorium: auditoriumImage,
  map: mapImage
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, duration: 0.5 }
  }
};

const Home = ({ theme }) => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative pt-32 pb-24 overflow-hidden"
      >
        <img 
          src={images.hero} 
          alt="GLA University Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/30"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl space-y-4"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent block">
              Lost & Found
            </span>
            <span className="text-3xl md:text-4xl font-normal block mt-4">GLA University</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Official digital platform for reuniting lost items with their owners across our 110-acre campus
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-12 relative group"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search lost items..."
                className="w-full px-6 py-5 rounded-2xl border-0 bg-white/15 backdrop-blur-xl text-white placeholder-gray-200 dark:placeholder-gray-400 focus:ring-4 focus:ring-yellow-400/30 shadow-2xl pr-20"
              />
              <button className="absolute right-3 top-3 p-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all shadow-lg flex items-center gap-2">
                <FiSearch className="h-6 w-6" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.div variants={itemVariants}>
              <a 
                href="/categories"
                className="flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-lg text-white rounded-xl hover:bg-white/20 transition-all shadow-lg hover:shadow-xl"
              >
                <FiGrid className="mr-2 text-yellow-400" />
                Explore Categories
              </a>
            </motion.div>
            <motion.div variants={itemVariants}>
              <a 
                href="/items"
                className="flex items-center justify-center px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
              >
                <FiList className="mr-2" />
                Browse All Items
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Key Hotspots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                img: images.library,
                title: 'Central Library',
                text: 'Study materials & devices',
                icon: <FiBook className="h-6 w-6 text-purple-400" />
              },
              { 
                img: images.hostel,
                title: 'Hostel Blocks', 
                text: 'Personal items recovery',
                icon: <FiKey className="h-6 w-6 text-blue-400" />
              },
              { 
                img: images.auditorium,
                title: 'Amphitheater',
                text: 'Personal belongings',
                icon: <FiTag className="h-6 w-6 text-yellow-400" />
              },
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                <img 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-200 text-sm font-medium">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className={`py-24 bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 via-gray-900 to-gray-800' : 'from-yellow-50 to-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Success Stories
            </h2>
            <button className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
              View All
              <FiChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'MacBook Pro 16"',
                location: 'Library - Computer Section',
                status: 'Returned within 6 hours',
                icon: <FiSmartphone className="h-8 w-8 text-green-500" />,
                color: 'bg-green-400/10'
              },
              { 
                title: 'Student ID Cards',
                location: 'Cafeteria Entrance',
                status: '5 IDs claimed today',
                icon: <FiCreditCard className="h-8 w-8 text-blue-500" />,
                color: 'bg-blue-400/10'
              },
              { 
                title: 'Research Thesis',
                location: 'Physics Department',
                status: 'Recovered after 3 days',
                icon: <FiBook className="h-8 w-8 text-purple-500" />,
                color: 'bg-purple-400/10'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`mb-6 flex items-center justify-center w-14 h-14 rounded-2xl ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <FiMapPin className="mr-2 flex-shrink-0" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm font-medium text-yellow-500">
                    <FiClock className="mr-2" />
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Category Grid */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: FiBook, label: 'Academic', color: 'text-purple-400' },
              { icon: FiSmartphone, label: 'Electronics', color: 'text-blue-400' },
              { icon: FiTag, label: 'Accessories', color: 'text-pink-400' },
              { icon: FiBriefcase, label: 'Bags', color: 'text-green-400' },
              { icon: FiKey, label: 'Keys', color: 'text-orange-400' },
            ].map((category, index) => (
              <motion.div 
                key={category.label}
                whileHover={{ y: -10 }}
                className={`p-6 rounded-2xl text-center hover:shadow-xl transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50'} relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color}/10 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <category.icon className={`h-16 w-16 mx-auto mb-4 ${category.color} group-hover:scale-110 transition-transform`} />
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {category.label}
                </h3>
                <button className="flex items-center justify-center mx-auto text-sm text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <FiChevronRight className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <motion.section 
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-yellow-400/10 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '95%', label: 'Recovery Rate', icon: FiCheckCircle },
              { number: '24h', label: 'Response Time', icon: FiClock },
              { number: '10k+', label: 'Items Reunited', icon: FiBriefcase },
              { number: '99%', label: 'Satisfaction', icon: FiAlertCircle },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all shadow-xl hover:shadow-2xl group"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-200 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Finds */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Recent Discoveries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center">
                    <FiMapPin className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Found in Library</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Black leather wallet with student ID card</p>
                <button className="w-full py-3 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-500 rounded-xl transition-colors flex items-center justify-center">
                  <FiCheckCircle className="mr-2" />
                  Claim Item
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-xl`}>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                <FiAlertCircle className="h-8 w-8 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Live Updates
              </h2>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  whileHover={{ x: 10 }}
                  className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'} shadow-sm hover:shadow-md transition-all flex items-center`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center mr-6">
                    <FiCheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Laptop matched with owner <span className="text-gray-400 text-sm">· 15m ago</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-24 bg-gradient-to-br from-yellow-400/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Common Losses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: FiBook, label: 'Books', color: 'bg-purple-400/10' },
              { icon: FiSmartphone, label: 'Phones', color: 'bg-blue-400/10' },
              { icon: FiTag, label: 'Keys', color: 'bg-yellow-400/10' },
              { icon: FiBox, label: 'Bags', color: 'bg-green-400/10' },
              { icon: FiCheckCircle, label: 'IDs', color: 'bg-pink-400/10' },
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all text-center`}
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <item.icon className={`h-8 w-8 ${item.color.replace('bg', 'text').replace('/10', '')}`} />
                </div>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Map Section */}
      <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="relative">
              <img 
                src={images.map} 
                alt="Campus Map" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Interactive Campus Map
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Academic Block', 'Hostel Area', 'Sports Complex', 'Admin Building'].map((location) => (
                  <motion.div 
                    key={location}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50'} transition-all flex items-center cursor-pointer`}
                  >
                    <FiMapPin className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{location}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-gradient-to-br from-yellow-400/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                question: 'Reporting Lost Items', 
                answer: 'Submit details through our simple form with photo evidence',
                icon: <FiAlertCircle className="h-6 w-6 text-purple-400" />
              },
              { 
                question: 'Claim Process', 
                answer: 'Verify ownership through our secure validation system',
                icon: <FiCheckCircle className="h-6 w-6 text-blue-400" />
              },
              { 
                question: 'Item Storage', 
                answer: 'All found items securely stored for 30 days',
                icon: <FiClock className="h-6 w-6 text-yellow-400" />
              },
              { 
                question: 'Safety Measures', 
                answer: 'End-to-end encrypted verification process',
                icon: <FiKey className="h-6 w-6 text-green-400" />
              },
            ].map((faq, index) => (
              <motion.div 
                key={faq.question}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-yellow-400/10 rounded-xl mr-4">
                    {faq.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 pl-16">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unclaimed Items Donation Program */}
      <section className="py-24 bg-gradient-to-br from-yellow-400/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl hover:shadow-3xl transition-all`}>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="flex-shrink-0 p-6 bg-yellow-400/10 rounded-2xl">
                <FiGift className="h-16 w-16 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Unclaimed Items Donation Program
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Items not claimed within 6 months are donated to local charities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} transition-all`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-400/10 rounded-xl">
                    <FiCalendar className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    6 Month Holding Period
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Every found item is securely stored for 180 days while we actively search for its owner
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} transition-all`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-400/10 rounded-xl">
                    <FiHeart className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Charity Partnerships
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Unclaimed items support local shelters, schools, and community centers
                </p>
              </motion.div>
            </div>

            <div className="mt-12 flex flex-col items-center text-center">
              <div className="mb-6 flex items-center gap-4 bg-yellow-400/10 px-6 py-3 rounded-full">
                <FiBox className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-medium text-yellow-500">
                  500+ Items Donated This Year
                </span>
              </div>
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors flex items-center gap-2">
                <FiGift className="h-5 w-5" />
                View Donation Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`p-12 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl hover:shadow-3xl transition-all`}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our support team is available 24/7 to help you with urgent matters
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors flex items-center justify-center gap-3"
              >
                <FiAlertCircle className="h-6 w-6" />
                Emergency Contact
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3"
              >
                <FiChevronRight className="h-6 w-6 text-yellow-400" />
                Visit Help Center
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* University Identity Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-400/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all`}
          >
            <img 
              src={completeTourImage} 
              alt="Campus Tour" 
              className="w-full h-96 object-cover rounded-2xl mb-8 shadow-lg"
            />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              GLA University Initiative
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              As part of our commitment to student welfare, this platform is officially 
              maintained by the GLA University administration to ensure quick recovery 
              of lost items across our 110-acre campus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.gla.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <FiChevronRight className="mr-2 text-yellow-400" />
                Official Portal
              </motion.a>
              <motion.div 
                whileHover={{ y: -3 }}
                className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors cursor-pointer flex items-center justify-center"
              >
                <FiKey className="mr-2" />
                Campus Security
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
