import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCheckCircle, FiClock, FiMapPin, FiAlertCircle, FiBook, FiBox, FiSmartphone, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Update the images object with working URLs
const images = {
  hero: 'https://glauniversity.in:8085/Static/images/h-about.jpg',
  library: 'https://images.unsplash.com/photo-1495741545814-2d7f4d9ea305?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  campus: 'https://images.unsplash.com/photo-1576495492010-eb3a8b16bdf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  hostel: 'https://images.unsplash.com/photo-1584132960623-9d6e4c51f8d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  auditorium: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  map: 'https://images.unsplash.com/photo-1579783483453-83c018aff8d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
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
    transition: { type: 'spring', stiffness: 100 }
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
        className="relative pt-24 pb-16 overflow-hidden"
      >
        <img 
          src={images.hero} 
          alt="GLA University Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-blue-900/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              GLA University
            </span><br />
            Lost & Found Portal
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Official digital platform for reuniting lost items with their owners across our 110-acre campus
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Search lost items..."
                className="w-full px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-lg text-white placeholder-gray-200 focus:ring-2 focus:ring-yellow-400 shadow-xl"
              />
              <button className="absolute right-3 top-3 p-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all shadow-md">
                <FiSearch className="h-6 w-6" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <motion.div variants={itemVariants}>
              <a 
                href="/lost"
                className="flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-lg text-white rounded-xl hover:bg-white/20 transition-all shadow-lg hover:shadow-xl"
              >
                <FiClock className="mr-2 text-yellow-400" />
                Report Lost Item
              </a>
            </motion.div>
            <motion.div variants={itemVariants}>
              <a 
                href="/found"
                className="flex items-center justify-center px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
              >
                <FiCheckCircle className="mr-2" />
                Report Found Item
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Campus Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                img: images.library,
                title: 'Central Library',
                text: 'Most common place for lost study materials and devices'
              },
              { 
                img: images.hostel,
                title: 'Hostel Blocks',
                text: 'Common area for personal item recovery'
              },
              { 
                img: images.auditorium,
                title: 'Amphitheater',
                text: 'Frequent spot for lost personal belongings'
              },
            ].map((feature, index) => (
              <div key={feature.title} className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-sm">{feature.text}</p>
                </div>
              </div>
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
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '95%', label: 'Recovery Rate' },
              { number: '24h', label: 'Response Time' },
              { number: '10k+', label: 'Items Reunited' },
              { number: '99%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all shadow-lg hover:shadow-xl`}
              >
                <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>
                  {stat.number}
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Finds */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Recently Found Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <FiMapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Found in Library</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Black leather wallet with student ID card</p>
                <button className="text-blue-500 hover:text-blue-600 flex items-center">
                  <FiCheckCircle className="mr-2" />
                  Claim Item
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Live Campus Activity
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Updates</h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Laptop matched with owner <span className="text-gray-400 text-sm">· 15m ago</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Common Lost Items
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: FiBook, label: 'Books' },
              { icon: FiSmartphone, label: 'Phones' },
              { icon: FiTag, label: 'Keys' },
              { icon: FiBox, label: 'Bags' },
              { icon: FiCheckCircle, label: 'IDs' },
            ].map((item, index) => (
              <div key={item.label} className="p-4 bg-white dark:bg-gray-700 rounded-xl text-center hover:shadow-md transition-shadow">
                <item.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Campus Map
          </h2>
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md overflow-hidden">
            <img 
              src={images.map} 
              alt="GLA University Campus Map" 
              className="w-full h-full object-contain"
            />
            <div className="p-6 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Academic Block', 'Hostel Area', 'Sports Complex', 'Admin Building'].map((location) => (
                  <div key={location} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <FiMapPin className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Quick Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { question: 'How to report a lost item?', answer: 'Use our simple form to submit details about your lost item.' },
              { question: 'What happens after I report?', answer: 'Our system automatically matches with found items and notifies you.' },
              { question: 'Is there a deadline to claim?', answer: 'Items are stored for 30 days before being donated.' },
              { question: 'How to verify ownership?', answer: 'We use secure methods including photo verification and ID checks.' },
            ].map((faq, index) => (
              <div key={faq.question} className="p-6 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Contact our support team for urgent assistance
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link 
                to="/contact"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                to="/faq"
                className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Visit FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* University Identity Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <img 
              src="https://www.gla.ac.in/main-campus/img/logo.png" 
              alt="GLA University Logo" 
              className="h-20 mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              GLA University Initiative
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
              As part of our commitment to student welfare, this platform is officially 
              maintained by the GLA University administration to ensure quick recovery 
              of lost items across our 110-acre campus.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.gla.ac.in" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                Official Website
              </a>
              <Link to="/contact" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Campus Security
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
