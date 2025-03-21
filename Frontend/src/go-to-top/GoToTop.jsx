import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const goToBtn = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        setIsVisible(winScroll > 250);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={goToBtn}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl group"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
                    <span className="sr-only">Scroll to top</span>
                </button>
            )}
        </>
    );
};

export default GoToTop;
