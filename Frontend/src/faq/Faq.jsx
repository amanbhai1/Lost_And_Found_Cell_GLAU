import React, { useEffect, useState } from 'react'
import image from "./bg.jpg";

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

    const handleIsClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    }

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
        <div className={`min-h-screen py-12 ${props.theme === 'dark' ? 'bg-black/50' : ''}`}>
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Frequently Asked Questions
                </h2>

                <div className={`space-y-4 ${props.theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm rounded-xl shadow-2xl p-6`}>
                    {faq.map((item, index) => (
                        <div 
                            key={index}
                            className={`group transition-all duration-300 ${
                                props.theme === 'dark' 
                                ? 'hover:bg-gray-700/50' 
                                : 'hover:bg-gray-100/50'
                            } rounded-lg p-4 cursor-pointer`}
                            onClick={() => handleIsClick(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className={`text-lg font-semibold ${
                                    props.theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                                }`}>
                                    {item.question}
                                </h3>
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${
                                        activeIndex === index ? 'rotate-180' : ''
                                    } ${props.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-500 ${
                                    activeIndex === index 
                                    ? 'max-h-96 pt-4 opacity-100' 
                                    : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className={`text-base ${
                                    props.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                } leading-relaxed`}>
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Faq
