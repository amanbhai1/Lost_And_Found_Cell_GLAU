import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* University Info */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4">GLA University</h4>
          <p className="text-sm dark:text-gray-300">
            17km Stone, NH-2, Mathura-Delhi Road
            <br />
            Mathura, Uttar Pradesh 281406
          </p>
          <div className="space-y-1">
            <p className="text-sm dark:text-gray-300">Phone: +91-5662-250900</p>
            <p className="text-sm dark:text-gray-300">Email: info@gla.ac.in</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/admissions" className="hover:text-blue-600 dark:hover:text-blue-400">Admissions</a></li>
            <li><a href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">Courses</a></li>
            <li><a href="/placements" className="hover:text-blue-600 dark:hover:text-blue-400">Placements</a></li>
            <li><a href="/research" className="hover:text-blue-600 dark:hover:text-blue-400">Research</a></li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Important Links</h4>
          <ul className="space-y-2">
            <li><a href="/mandatory-disclosure" className="hover:text-blue-600 dark:hover:text-blue-400">Mandatory Disclosure</a></li>
            <li><a href="/anti-ragging" className="hover:text-blue-600 dark:hover:text-blue-400">Anti Ragging</a></li>
            <li><a href="/grievance" className="hover:text-blue-600 dark:hover:text-blue-400">Grievance Redressal</a></li>
            <li><a href="/nirf" className="hover:text-blue-600 dark:hover:text-blue-400">NIRF</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/GLAMathura" className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400"><FaFacebook /></a>
            <a href="https://twitter.com/GLAMathura" className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400"><FaTwitter /></a>
            <a href="https://www.instagram.com/glauniversity/" className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400"><FaInstagram /></a>
            <a href="https://www.linkedin.com/school/gla-university/" className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400"><FaLinkedin /></a>
            <a href="https://www.youtube.com/user/GLAMathura" className="text-gray-700 dark:text-gray-300 text-2xl hover:text-blue-600 dark:hover:text-blue-400"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      <div className="text-center text-sm dark:text-gray-300">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} GLA University. All Rights Reserved. | 
          <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 ml-1">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Use</a>
        </p>
        <p className="text-xs">
          Recognized u/s 2(f) of UGC Act 1956 | NAAC 'A' Grade Accredited | NIRF Ranked
        </p>
      </div>
    </footer>
  );
};

export default Footer;