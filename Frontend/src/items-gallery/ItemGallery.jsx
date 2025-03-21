import React, { useEffect, useState } from 'react'
import './items.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {category ? `${category} Items` : 'All Lost Items'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse through recently reported lost items
          </p>
        </div>

        {spinner && (
          <div className="flex justify-center my-5 pt-5">
            <img src={loading} alt="loading" className="w-10 h-10" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item._id}
              className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={`${host}/foundItemImages/${item.itemImage}`} 
                alt="items" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent flex flex-col justify-end p-4">
                <div className="space-y-2">
                  <p className="text-white font-semibold text-lg">{item.date}</p>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/details/${item._id}`}
                      className="w-full py-2 px-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-medium text-center transition-all"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleClaimItem(item._id)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all"
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
