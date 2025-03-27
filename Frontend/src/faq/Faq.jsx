import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiMail, FiSmartphone, FiZap } from 'react-icons/fi';
import image from "./bg.jpg";
import campusImage from "../images/institute-overview.jpg";

const Faq = (props) => {

    const faq = [
        { question: "How does the Lost and Found web app work?", answer: "Our Lost and Found web app provides a platform for users to report lost items and search for their missing possessions. Users can create a profile, submit details about their lost item, and browse through the found items listed on our platform. The app uses the entered details to identify potential matches and connect the owners with the finders." },
        { question: "What should I do if I've lost something?", answer: "If you've lost something, log in to your account on our web app and report the lost item with as many details as possible. This helps increase the chances of a successful match. We recommend regularly checking our platform for updates on items gallery that match your description." },
        { question: "Can I search for a lost item without creating an account?", answer: "No you cannot. Since this app is for UPES students only hence we need to log you in to verify you. Having an account also allows you to receive notifications and communicate with the finder of a potential match." },
        { question: "What should I do if I find a lost item?", answer: "If you find a lost item, please create an account on our web app and report the found item with accurate details. You have to upload a photo of the item to help with identification. This was you will help and owner find their lost item." },
        { question: "How long does it usually take to find a lost item? ", answer: "The time it takes to find a lost item can vary depending on various factors such as the uniqueness of the item, the accuracy of the description, and the availability of potential matches. We encourage users to regularly check our platform and update their lost item reports with any additional details." },
        { question: "Is my personal information secure?", answer: "We take user privacy and data security seriously. We have implemented measures to safeguard your personal information. Only registered users with verified accounts have access to specific details of lost and found items. We recommend reviewing our privacy policy for more information on data protection." },
        { question: "What if I have further questions or need assistance?", answer: "If you have any additional questions, need assistance, or encounter any issues with our web app, please reach out to our support team. You can contact us through the provided channels, such as email or the support section on our website." }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    // Add motion variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    useEffect(() => {
        const bgStyle = props.theme === 'dark' 
            ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`
            : `url(${image})`;
        
        document.body.style.background = bgStyle;
        document.body.style.backgroundSize = 'cover';
        
        return () => {
            document.body.style.background = null;
        };
    }, [props.theme]);

    return (
        <div className={`min-h-screen relative overflow-hidden ${props.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <motion.div 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0"
                >
                    <img 
                        src={campusImage} 
                        alt="Campus" 
                        className="w-full h-full object-cover opacity-20"
                    />
                </motion.div>
                <div className={`absolute inset-0 bg-gradient-to-t ${
                    props.theme === 'dark' 
                    ? 'from-gray-900 via-gray-900/80 to-gray-900' 
                    : 'from-white via-white/90 to-white'
                }`} />
            </div>

            <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-6"
                >
                    <div className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-purple-500 p-4 rounded-2xl shadow-xl">
                        <FiHelpCircle className="h-12 w-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                        Help Center
                    </h1>
                    <p className={`text-xl ${props.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Instant answers to your questions about lost items and campus services
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {faq.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`group cursor-pointer rounded-2xl p-1 bg-gradient-to-br ${
                                activeIndex === index 
                                ? 'from-yellow-400 to-purple-500' 
                                : 'from-transparent to-transparent'
                            } shadow-lg hover:shadow-xl transition-all`}
                            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                        >
                            <div className={`h-full rounded-xl p-6 ${
                                props.theme === 'dark' 
                                ? 'bg-gray-800/80 hover:bg-gray-700/80' 
                                : 'bg-white/90 hover:bg-gray-50/90'
                            } transition-colors`}>
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${
                                        props.theme === 'dark' 
                                        ? 'bg-purple-500/10 text-purple-300' 
                                        : 'bg-purple-100 text-purple-600'
                                    }`}>
                                        <FiZap className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className={`text-xl font-semibold ${
                                                props.theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                                            }`}>
                                                {item.question}
                                            </h3>
                                            <FiChevronDown className={`w-6 h-6 transform transition-transform ${
                                                activeIndex === index ? 'rotate-180' : ''
                                            } ${props.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                                        </div>
                                        <AnimatePresence>
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className={`mt-4 text-lg ${
                                                        props.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                                    } leading-relaxed`}>
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Support Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center bg-gradient-to-r from-yellow-400 to-purple-500 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-6">Still need help?</h3>
                        <p className="text-gray-200 mb-8 text-lg">
                            Our support team is ready to assist you 24/7
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="mailto:support@gla.ac.in" className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
                                props.theme === 'dark' 
                                ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                                : 'bg-white/90 hover:bg-gray-100/90'
                            } transition-colors`}>
                                <FiMail className="h-6 w-6 text-yellow-400" />
                                <span className="font-semibold">support@gla.ac.in</span>
                            </a>
                            <a href="tel:+915662250900" className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
                                props.theme === 'dark' 
                                ? 'bg-gray-800/90 hover:bg-gray-700/90' 
                                : 'bg-white/90 hover:bg-gray-100/90'
                            } transition-colors`}>
                                <FiSmartphone className="h-6 w-6 text-purple-400" />
                                <span className="font-semibold">+91-5662-250900</span>
                            </a>
                        </div>
                        <span className="text-sm text-gray-300 mt-2">
                            Mon-Sat: 9AM - 5PM (IST)
                        </span>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}

export default Faq
