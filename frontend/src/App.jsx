import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 1. Yeh import karein
import SignIn from './authPages/signin';
import SignUp from './authPages/signup';
import AdminDashboard from './admin/AdminDashboard';
import Home from './user/home';
import NotFound from './errorPage';

function ProtectedAdmin() {
  const savedUser = localStorage.getItem('loggedInUser');
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (user?.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '0px',
            background: '#131316',
            color: '#fff',
            border: '1px solid #27272a',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
