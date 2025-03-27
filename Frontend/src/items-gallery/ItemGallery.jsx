import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiClock, FiCheckCircle, FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import loading from "./loading.gif";
import dark from './dark.jpg';

const ItemGallery = (props) => {

  const [spinner, setSpinner] = React.useState(true);
  const [Items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sapId, setSapId] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const { category } = useParams();
  const host = "http://localhost:5000";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  // API call
  const url = `${host}/getAllItems`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if(json.success) {
          setItems(json.data);
        } else {
          console.error('Error fetching items:', json.error);
        }
        console.log(json);
      } catch (error) {
        console.log(error.message);
      }
      finally {
        setSpinner(false);
      }
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    if (props.theme === 'dark') {
      document.body.style.background = `url(${dark}) `;
      document.body.style.backgroundSize = 'cover';
    }

    return () => {
      document.body.style.background = null;
    };
  }, [props.theme]);


  const filteredItems = category ? Items.filter(item => item.subcategory === category) : Items;

  //handle claim
  const handleClaimItem = (itemId) => {
    setSelectedItemId(itemId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItemId('');
    setDetails('');
    setName('');
    setEmail('');
    setSapId('');
    setBranch('');
    setYear('');
    setContactNumber('');
  };

  const handleSubmit = async () => {
    try {
      // Validate mandatory fields
      if (!details || !name || !email || !sapId || !contactNumber) {
        console.error('Mandatory fields are missing');
        return;
      }

      console.log('Claiming item:', selectedItemId);

      const response = await fetch(`${host}/claimItem/${selectedItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          details,
          name,
          email,
          sapId,
          branch,
          year,
          contactNumber,
        }),
      });

      if (response.ok) {
        console.log('Item claimed successfully');
        props.func(true);
      } else {
        console.error('Failed to claim item');
      }

      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${props.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/categories" 
              className={`p-2 rounded-lg flex items-center ${
                props.theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              } shadow-md transition-all`}
            >
              <FiChevronRight className="rotate-180" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {category || 'All Items'}
            </h1>
          </div>
          
          {category && (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Showing items in <span className="font-semibold text-blue-600">{category}</span>
            </p>
          )}
        </motion.div>

        {spinner ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-96 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse">
                <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  whileHover="hover"
                  className="group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
                  
                  {item.images?.length > 0 ? (
                    <motion.img 
                      src={`${host}${item.images[0]}`}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className={`w-full h-full flex flex-col items-center justify-center ${
                      props.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <FiImage className="w-16 h-16 text-gray-400 mb-4" />
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-200 gap-2">
                      <FiClock className="flex-shrink-0" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white">{item.itemName}</h3>
                    
                    <div className="flex gap-3">
                      <Link
                        to={`/details/${item._id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        <span>Details</span>
                        <FiChevronRight className="-rotate-90" />
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClaimItem(item._id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-emerald-500/30 transition-all"
                      >
                        <FiCheckCircle />
                        <span>Claim</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          className: `${props.theme === 'dark' ? '!bg-gray-800 !text-white' : ''} rounded-3xl backdrop-blur-lg bg-white/90`
        }}
      >
        <DialogTitle className="text-2xl font-bold text-center pt-8">
          Claim Item
          <div className="mt-2 w-12 h-1 bg-blue-500 rounded-full mx-auto" />
        </DialogTitle>
        
        <DialogContent>
          <div className="space-y-4 py-4">
            {['details', 'name', 'email', 'sapId', 'branch', 'year', 'contactNumber'].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                value={eval(field)}
                onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}(e.target.value)`)}
                required={['details', 'name', 'email', 'sapId', 'contactNumber'].includes(field)}
                fullWidth
                variant="outlined"
                className="rounded-xl"
                InputProps={{
                  className: `${props.theme === 'dark' ? '!text-white' : ''} rounded-xl`,
                  endAdornment: field === 'details' && <FiAlertTriangle className="text-gray-400 ml-2" />
                }}
              />
            ))}
          </div>
        </DialogContent>
        
        <DialogActions className="px-6 pb-6 gap-3">
          <Button 
            onClick={handleClose}
            className={`rounded-lg px-6 py-2 ${
              props.theme === 'dark' 
                ? '!text-gray-300 hover:!bg-gray-700' 
                : '!text-gray-600 hover:!bg-gray-100'
            }`}
          >
            Cancel
          </Button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-8 py-3 shadow-lg transition-all"
          >
            Submit Claim
          </motion.button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemGallery;
