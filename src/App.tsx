import React, {useContext} from 'react';

import HomePage from "components/HomePage/HomePage";

import AuthProvider from "providers/Auth/AuthProvider";
import UserProvider from "providers/User/UserProvider";

import './App.css';

function App() {
  return (
      <AuthProvider>
       <UserProvider >
        <div className="App">
          <HomePage />
        </div>
       </UserProvider>
      </AuthProvider>
  );
}

export default App;
