import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiShield, FiClock, FiBook, FiEye } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

const About = ({ theme }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { icon: <FiClock className="h-8 w-8" />, value: '24h', label: 'Average Response Time' },
    { icon: <FiShield className="h-8 w-8" />, value: '100%', label: 'Secure Process' },
    { icon: <FiBook className="h-8 w-8" />, value: '10K+', label: 'Items Reunited' },
    { icon: <FiUsers className="h-8 w-8" />, value: '98%', label: 'User Satisfaction' },
  ];

  const team = [
    { name: 'Dr. A. K. Singh', role: 'Director, Campus Services', initials: 'AS' },
    { name: 'Prof. Neha Sharma', role: 'Student Welfare Head', initials: 'NS' },
    { name: 'Mr. Rakesh Kumar', role: 'Security Head', initials: 'RK' },
    { name: 'Ms. Priya Yadav', role: 'Technical Lead', initials: 'PY' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-16 text-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            About GLA University Lost & Found
          </h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Connecting lost items with their owners through technology and community
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            >
              <FiTarget className={`h-12 w-12 mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                To provide a secure, efficient, and user-friendly platform that leverages technology to reunite 
                lost items with their owners while maintaining the highest standards of integrity and service.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            >
              <FiEye className={`h-12 w-12 mb-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                To create a campus community where no lost item goes unclaimed, through continuous innovation 
                and fostering a culture of responsibility and mutual trust among students and staff.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className={`mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}
              >
                <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {member.initials}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Report', description: 'Submit details of lost/found item' },
              { title: 'Match', description: 'AI-powered matching system' },
              { title: 'Verify', description: 'Secure ownership verification' },
              { title: 'Return', description: 'Safe item handover process' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}
              >
                <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'} flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    0{index + 1}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Join Our Mission
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Help us maintain a responsible campus community
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href="/report-lost"
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Report Lost Item
              </a>
              <a
                href="/volunteer"
                className={`px-8 py-3 rounded-lg border-2 font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-900/20' 
                    : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Become Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 