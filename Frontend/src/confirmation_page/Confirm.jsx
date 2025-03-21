import gif from "./check.gif";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Confirm(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
    props.func(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-yellow-400 to-red-500">
      <Button 
        className="absolute top-8 left-5 mb-4" 
        variant="text" 
        color="secondary" 
        startIcon={<ArrowBackIcon />} 
        onClick={handleClick} 
        style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", color: "white" }}
      >
        Home
      </Button>

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-8">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left md:pl-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Successfully Registered
          </h2>
          <p className="text-xl md:text-2xl text-white font-serif">
            You may claim your item from{' '}
            <span className="text-green-400 font-bold">
              Lost And Found Department
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img 
            src={gif} 
            alt="Success GIF" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl" 
          />
        </div>
      </div>
    </div>
  );
}
