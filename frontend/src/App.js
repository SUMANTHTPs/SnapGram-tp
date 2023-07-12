import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Login from '../src/components/Login';
import Home from '../src/containers/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchUser } from './utils/fetchUser';

const clientToken = "1058208774684-kj5drj3fjk5hf5b614fs24npp5oeu81v.apps.googleusercontent.com"

const App = () => {
  
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`} >
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;