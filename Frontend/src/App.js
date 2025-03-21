import React, { useState, useEffect } from "react";
import FeedbackForm from "./feedback/FeedbackForm.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import HelpUs from "./help-us-find-page/HelpUs.jsx";
import AboutUs from "./About/AboutUs.jsx";
import Home from "./home-page/Home.jsx";
import GoToTop from "./go-to-top/GoToTop.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LostUpload from './lost-details-upload-page/LostUpload.jsx';
import FoundUpload from './found-item-details-page/FoundUpload.jsx';
import ItemDetails from "./item-gallery-details/ItemDetails.jsx";
import ItemGallery from "./items-gallery/ItemGallery.jsx";
import CategorySelection from "./items-gallery/CategorySelection.jsx";
import Login from "./login-page/Login.jsx";
import SignUp from "./login-page/SignUp.jsx";
import Faq from "./faq/Faq.jsx";
import Footer from "./Footer/Footer.jsx";
import ProtectedRoute from './ProtectedRoute.js';
import Confirm from './confirmation_page/Confirm.jsx';

import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "0ab57f1a-6d44-4dfd-b784-55300e2d114b",
    authority: "https://login.microsoftonline.com/91cc1fb6-1275-4acf-b3ea-c213ec16257b",
    redirectUri: "https://osoc-lost-and-found-webapp.netlify.app/", // Update this with your redirect URI
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const [showConfirmPage, setShowConfirmPage] = useState(false);

  const showConfirm = (value) => {
    setShowConfirmPage(value);
  };

  return (
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <Router>
        {showConfirmPage ?
          <Confirm func={showConfirm} /> :
          (<>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<SignUp theme={theme} />} />
              <Route path="/login" element={<Login theme={theme} />} />
              {/* Non-protected routes */}
              <Route path="/about" element={<AboutUs theme={theme} />} />
              <Route path="/faq" element={<Faq theme={theme} />} />

              {/* Protected routes */}
              <Route path="/home" element={<ProtectedRoute><Home theme={theme} /></ProtectedRoute>} />
              <Route path="/lost" element={<ProtectedRoute><LostUpload theme={theme} /></ProtectedRoute>} />
              <Route path="/found" element={<ProtectedRoute><FoundUpload theme={theme} /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><FeedbackForm theme={theme} /></ProtectedRoute>} />
              <Route path="/items" element={<ProtectedRoute><CategorySelection theme={theme} /></ProtectedRoute>} />
              <Route path="/items/:category" element={<ProtectedRoute><ItemGallery func={showConfirm} theme={theme} /></ProtectedRoute>} />
              <Route path="/details/:id" element={<ProtectedRoute><ItemDetails func={showConfirm} theme={theme} /></ProtectedRoute>} />
              <Route path="/helpusfind" element={<ProtectedRoute><HelpUs theme={theme} /></ProtectedRoute>} />

              {/* Sign-out route */}
              <Route path="/signout" element={<SignOut />} />
            </Routes>
            <GoToTop />
            <Footer />
          </>)}
      </Router>
    </MsalProvider>
  );
};

// ProtectedRoute component remains the same as in the previous example

// Sign-out component to handle sign-out process
const SignOut = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance.logout();
  }, [instance]);

  return (
    <div>
      <h1>Signing Out...</h1>
      <p>Please wait while we sign you out.</p>
      {/* Optionally, you can add a link to redirect users back to the homepage */}
      <Link to="/home">Go to Homepage</Link>
    </div>
  );
};

export default App;