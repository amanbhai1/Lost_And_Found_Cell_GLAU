import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiClock, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {category || 'All Items'}
          </h1>
          <Link 
            to="/categories" 
            className={`inline-flex items-center text-lg ${
              props.theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiChevronRight className="rotate-180 mr-1" />
            Back to Categories
          </Link>
        </motion.div>

        {spinner ? (
          <div className="flex justify-center my-20">
            <img src={loading} alt="loading" className="w-20 h-20 animate-pulse" />
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
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  {item.images?.length > 0 ? (
                    <img 
                      src={`${host}${item.images[0]}`}
                      alt={item.itemName} 
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full flex flex-col items-center justify-center ${
                      props.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <FiImage className="w-16 h-16 text-gray-400 mb-4" />
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-200">
                        <FiClock className="mr-2" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{item.itemName}</h3>
                      <div className="flex gap-3">
                        <Link
                          to={`/details/${item._id}`}
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white transition-all"
                        >
                          <FiChevronRight className="-rotate-90" />
                          <span>Details</span>
                        </Link>
                        <button
                          onClick={() => handleClaimItem(item._id)}
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white transition-all"
                        >
                          <FiCheckCircle />
                          <span>Claim</span>
                        </button>
                      </div>
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
          className: `${props.theme === 'dark' ? '!bg-gray-800 !text-white' : ''} rounded-2xl`
        }}
      >
        <DialogTitle className={`${props.theme === 'dark' ? '!text-white' : ''}`}>Enter Your Details</DialogTitle>
        <DialogContent>
          <div className="space-y-4 py-4">
            <TextField
              label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              multiline
              rows={4}
              required
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="SAP ID"
              value={sapId}
              onChange={(e) => setSapId(e.target.value)}
              required
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              fullWidth
              className={`${props.theme === 'dark' ? '!text-white' : ''}`}
              InputProps={{
                className: props.theme === 'dark' ? '!text-white' : ''
              }}
            />
          </div>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button 
            onClick={handleClose}
            className={`${props.theme === 'dark' ? '!text-gray-300' : ''} hover:!bg-gray-100`}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            className="!bg-gradient-to-r !from-blue-600 !to-purple-600 hover:!from-blue-700 hover:!to-purple-700 !text-white !rounded-lg !px-6 !py-2"
          >
            Claim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemGallery;
