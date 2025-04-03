import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import HomePage from "components/HomePage/HomePage";

import AuthProvider from "providers/Auth/AuthProvider";
import UserProvider from "providers/User/UserProvider";

import Navbar from "components/Navbar/Navbar";
import Bookings from "components/Bookings/Bookings";

import './App.css';

function App() {
  return (
      <AuthProvider>
       <UserProvider>
           <Router>
               <div className="App">
                 <Navbar />
                 <HomePage />
                 { /* <Routes>
                       <Route path='/' element={<HomePage />} />
                       <Route path='/classes' element={<Bookings />} />
                   </Routes>  */}
               </div>
           </Router>
       </UserProvider>
      </AuthProvider>
  );
}

export default App;
