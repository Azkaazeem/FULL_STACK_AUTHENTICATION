import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Creating account...");

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      toast.dismiss(loadingToast);

      if (data.status === true) {
        // Success ka popup
        toast.success("Account Created Successfully! 🎉");
        navigate('/signin');
      } else {
        // Error ka popup
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log("Connection Error:", error);
      // Server connect na hone ka popup
      toast.error("Server se connect nahi ho pa raha!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-4 font-sans">
      <div className="w-full max-w-[420px] bg-[#131315] rounded-2xl border border-[#2e2e32] shadow-2xl overflow-hidden p-10">

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#ededed]">Create your account</h2>
        </div>

        {/* 3. Form ke onSubmit par apna function call karna */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6c47ff] transition-all"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6c47ff] transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#ededed] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6c47ff] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white transition-colors"
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-xl px-4 py-3 text-sm text-[#ededed] focus:outline-none focus:ring-1 focus:ring-[#6c47ff] transition-all"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#6c47ff] hover:bg-[#5a36e0] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group mt-2">
            Sign Up
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#a1a1aa] text-sm">
            Already have an account? <Link to="/signin" className="text-[#6c47ff] font-medium hover:underline">Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUp;