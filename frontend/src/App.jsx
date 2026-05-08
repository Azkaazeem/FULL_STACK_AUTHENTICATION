import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './authPages/signin';
import SignUp from './authPages/signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route ko signin par bhej dega */}
        <Route path="/" element={<Navigate to="/signin" />} /> 
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;