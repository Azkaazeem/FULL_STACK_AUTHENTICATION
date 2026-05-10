import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. Yeh import karein
import SignIn from './authPages/signin';
import SignUp from './authPages/signup';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  return (
    <Router>
      {/* 2. Toaster component yahan add karein (Routes se pehle ya baad mein) */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '0px', // Sharp corners
            background: '#131316', // Dark background
            color: '#fff', // White text
            border: '1px solid #27272a', // Dark border
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' }, // Emerald green for success
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' }, // Red for error
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;