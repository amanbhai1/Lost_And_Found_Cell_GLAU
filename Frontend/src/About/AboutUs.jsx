import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiShield, FiClock, FiBook, FiEye, FiHeart, FiBriefcase, FiCheckCircle, FiHome } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import campusImage from '../images/institute-overview.jpg';
import teamImage from '../images/conference-halls-banner.jpg';
import donationImage from '../images/donation-process.jpg';

const About = ({ theme }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { 
      icon: <FiUsers className="h-8 w-8" />,
      value: '85%',
      label: 'Staff Efficiency',
      description: 'Human verification accuracy rate',
      color: 'bg-blue-400/10'
    },
    { 
      icon: <FiClock className="h-8 w-8" />,
      value: '24h',
      label: 'Response Time',
      description: 'Average item processing duration',
      color: 'bg-purple-400/10'
    },
    { 
      icon: <FiBook className="h-8 w-8" />,
      value: '1.2K',
      label: 'Monthly Cases',
      description: 'Items processed each month',
      color: 'bg-green-400/10'
    },
    { 
      icon: <FiHeart className="h-8 w-8" />,
      value: '98%',
      label: 'Satisfaction',
      description: 'User satisfaction rate',
      color: 'bg-yellow-400/10'
    }
  ];

  const team = [
    { name: 'Dr. A. K. Singh', role: 'Director, Campus Services', initials: 'AS' },
    { name: 'Prof. Neha Sharma', role: 'Student Welfare Head', initials: 'NS' },
    { name: 'Mr. Rakesh Kumar', role: 'Security Head', initials: 'RK' },
    { name: 'Ms. Priya Yadav', role: 'Technical Lead', initials: 'PY' },
  ];

  // Add new motion variants at the top
  const workflowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-32 pb-48 overflow-hidden"
      >
        <img 
          src={campusImage}
          alt="GLA University Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              About Our Mission
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Pioneering campus accountability through innovative lost & found solutions
          </motion.p>
        </div>
      </motion.section>

      {/* Enhanced Mission/Vision Section */}
      <section ref={missionRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                icon: <FiTarget className="h-12 w-12" />,
                title: "Our Mission",
                content: "To provide a secure, efficient platform that leverages AI and community power to reunite lost items",
                color: "from-blue-400/20 to-blue-600/10"
              },
              {
                icon: <FiEye className="h-12 w-12" />,
                title: "Our Vision",
                content: "Creating a campus where no item goes unclaimed through innovation and mutual trust",
                color: "from-green-400/20 to-green-600/10"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={missionInView ? { scale: 1, opacity: 1 } : {}}
                className={`p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br ${item.color} border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                } shadow-2xl`}
              >
                <div className={`mb-6 p-4 w-fit rounded-2xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {item.icon}
                </div>
                <h2 className={`text-3xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h2>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-purple-400/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-5xl font-bold text-center mb-20 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Operational Excellence
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-3xl backdrop-blur-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-900/50 border-gray-700 hover:border-yellow-400' 
                    : 'bg-white/80 border-gray-200 hover:border-purple-400'
                } transition-all duration-300 shadow-2xl hover:shadow-3xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className={`p-4 rounded-2xl w-fit ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  } mb-6`}>
                    {React.cloneElement(stat.icon, { className: "h-12 w-12" })}
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <h3 className={`text-xl font-semibold mt-4 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {stat.label}
                  </h3>
                  <p className={`mt-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.description}
                  </p>
                </div>
                {/* Animated progress ring */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 100 100" className="text-yellow-400">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                      strokeDasharray="283" 
                      strokeDashoffset="70"
                      className="origin-center -rotate-90 transition-all duration-500"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 bg-gradient-to-r from-yellow-400/10 to-purple-400/10 rounded-3xl p-1"
          >
            <div className={`backdrop-blur-lg rounded-[calc(1.5rem-4px)] p-8 ${
              theme === 'dark' ? 'bg-gray-900/50' : 'bg-white/80'
            }`}>
              <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                Real-Time Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { value: '150+', label: 'Daily Resolutions', color: 'from-yellow-400 to-amber-500' },
                  { value: '99.9%', label: 'Success Rate', color: 'from-purple-400 to-indigo-500' },
                  { value: '4.8/5', label: 'User Rating', color: 'from-green-400 to-teal-500' }
                ].map((metric, index) => (
                  <div key={metric.label} className={`p-6 rounded-2xl bg-gradient-to-br ${metric.color} text-center`}>
                    <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    <p className="text-sm text-white/90">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section ref={teamRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={teamInView ? { opacity: 1 } : {}}
            className={`text-4xl font-bold text-center mb-16 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Leadership Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={teamInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="relative h-80">
                  <img
                    src={teamImage}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
                <div className="p-6 absolute bottom-0 left-0 right-0">
                  <h3 className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Workflow Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-5xl font-bold text-center mb-20 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Department Workflow
            </span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-yellow-400 transform -translate-x-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {[
                {
                  title: 'Department Registration',
                  content: 'Item logged by department admin with physical verification',
                  icon: <FiBook className="h-6 w-6" />,
                  color: 'from-blue-400 to-purple-500'
                },
                {
                  title: 'Admin Verification',
                  content: 'Cross-checked by 2 department authorities for authenticity',
                  icon: <FiShield className="h-6 w-6" />,
                  color: 'from-green-400 to-teal-500'
                },
                {
                  title: 'Inter-Department Collaboration',
                  content: 'Campus-wide search through department networks',
                  icon: <FiUsers className="h-6 w-6" />,
                  color: 'from-purple-400 to-indigo-500'
                },
                {
                  title: 'Donation Authorization',
                  content: 'Final approval by department head before charity transfer',
                  icon: <FiHeart className="h-6 w-6" />,
                  color: 'from-red-400 to-pink-500'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative md:w-3/4 ${
                    index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                  } group`}
                >
                  {/* Connector for mobile */}
                  <div className="absolute top-6 left-6 w-1 h-full bg-gray-200 dark:bg-gray-700 md:hidden" />
                  
                  <div className={`p-8 rounded-3xl backdrop-blur-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-700 hover:border-purple-400' 
                      : 'bg-white/80 border-gray-200 hover:border-yellow-400'
                  } transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color}`}>
                        {React.cloneElement(step.icon, { className: "h-8 w-8 text-white" })}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-purple-400 dark:text-yellow-400 mb-2">
                          Step {index + 1}
                        </div>
                        <h3 className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`mt-3 text-lg ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {step.content}
                        </p>
                      </div>
                    </div>
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute top-6 -left-1 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <img 
              src={donationImage}
              alt="Donation Process"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
            <div className="relative z-10 p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Humanitarian Effort
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                Participate in our donation program that supports local communities
              </p>
              <div className="flex gap-6">
                <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors">
                  Learn About Donations
                </button>
                <button className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors">
                  View Charity Partners
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 