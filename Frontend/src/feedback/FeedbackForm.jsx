import React from 'react';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey'
    },
    '&:hover fieldset': {
      borderColor: 'grey',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'purple',
    },
  },
});

const FeedbackForm = (props) => {
  const [details, setDetails] = React.useState({ email: "", feedback: "" });
  const host = "https://lost-and-found.cyclic.app";

  const onChange = async (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/feedback`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: details.email, feedback: details.feedback })
    });
    const json = await response.json();
    console.log(json);
    setDetails({ email: "", feedback: "" });
  }

  return (
    <div className={`min-h-screen bg-cover bg-center ${props.theme === 'dark' ? 'bg-dark-overlay' : ''}`} style={{ backgroundImage: `url(./bg.jpg)` }}>
      <div className="max-w-2xl mx-auto p-5 pt-12">
        <div className={`${props.theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} p-8 rounded-lg shadow-lg`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Feedback Form</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Thank you for taking your time to provide feedback. We appreciate hearing from you and will review your comments carefully.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              {props.theme === 'dark' ? (
                <CssTextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  type="email"
                  onChange={onChange}
                  value={details.email}
                  placeholder="Email"
                  id="email"
                  name="email"
                  InputProps={{
                    style: {
                      borderRadius: '10px',
                      color: '#f5f5f5',
                    },
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  type="email"
                  onChange={onChange}
                  value={details.email}
                  placeholder="Email"
                  id="email"
                  name="email"
                  InputProps={{
                    style: {
                      borderRadius: '10px',
                      color: '#333',
                    },
                  }}
                />
              )}
            </div>

            <div>
              <h6 className="text-sm font-medium mb-2">How would you rate us?</h6>
              <div className="flex justify-center space-x-2">
                {[5, 4, 3, 2, 1].map((rate) => (
                  <React.Fragment key={rate}>
                    <input type="radio" name="rate" id={`rate-${rate}`} className="hidden" />
                    <label 
                      htmlFor={`rate-${rate}`} 
                      className="text-3xl cursor-pointer text-gray-300 hover:text-red-400 transition-colors"
                    >
                      ★
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Please share your feedback</label>
              {props.theme === 'dark' ? (
                <CssTextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  type="text"
                  placeholder="Share your experience or suggestions"
                  multiline
                  rows={5}
                  onChange={onChange}
                  value={details.feedback}
                  id="feedback"
                  name="feedback"
                  required
                  InputProps={{
                    style: {
                      borderRadius: '20px',
                      color: '#f5f5f5',
                    },
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  type="text"
                  placeholder="Share your experience or suggestions"
                  multiline
                  rows={5}
                  onChange={onChange}
                  value={details.feedback}
                  id="feedback"
                  name="feedback"
                  required
                  InputProps={{
                    style: {
                      borderRadius: '20px',
                      color: '#333',
                    },
                  }}
                />
              )}
            </div>

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              className="!normal-case !rounded-lg !py-2 !text-base"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
