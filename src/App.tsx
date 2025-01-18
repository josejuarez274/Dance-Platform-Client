import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import HomePage from "components/HomePage/HomePage";

import AuthProvider from "providers/Auth/AuthProvider";
import UserProvider from "providers/User/UserProvider";

import Navbar from "components/Navbar/Navbar";
import ClassesPage from "components/ClassesPage/ClassesPage";

import './App.css';

function App() {
  return (
      <AuthProvider>
       <UserProvider >
           <Router>
               <div className="App">
                   <Navbar />
                   <Routes>
                       <Route path='/' element={<HomePage />} />
                       <Route path='/classes' element={<ClassesPage />} />
                   </Routes>
               </div>
           </Router>
       </UserProvider>
      </AuthProvider>
  );
}

export default App;
