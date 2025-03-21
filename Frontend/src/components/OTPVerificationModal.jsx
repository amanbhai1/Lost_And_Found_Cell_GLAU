import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OTPVerificationModal = ({ email, onVerify, theme }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const inputsRef = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp: otpCode
      });
      onVerify();
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    }
  };

  const resendOTP = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setTimeLeft(300);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`relative rounded-2xl p-8 w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Verify Your Email
        </h2>
        
        <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          We've sent a 6-digit code to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={`w-12 h-12 text-center text-xl rounded-lg border-2 focus:outline-none focus:border-green-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-700'}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl transition-all hover:from-green-600 hover:to-blue-600`}
          >
            Verify OTP
          </button>

          <div className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Didn't receive code? {timeLeft > 0 ? (
              <span>Resend in {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            ) : (
              <button
                type="button"
                onClick={resendOTP}
                className="text-green-500 hover:underline focus:outline-none"
              >
                Resend OTP
              </button>
            )}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationModal; 