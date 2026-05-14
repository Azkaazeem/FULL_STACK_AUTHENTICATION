import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-4 font-sans">

      <div className="w-full max-w-[400px] bg-[#131315] rounded-xl border border-[#2e2e32] shadow-2xl overflow-hidden">
        <div className="p-8 pb-6">
          <p className="text-[#a1a1aa] text-sm text-center mb-7">Welcome back! Please sign in to continue</p>

          {/* Email and Password Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Email address</label>
              <button type="button" className="text-[13px] text-[#a1a1aa] hover:text-[#ededed] transition-colors">Use phone</button>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#52525b] focus:ring-1 focus:ring-[#52525b] transition-all mb-4"
            />

            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Password</label>
              <button type="button" className="text-[13px] text-[#a1a1aa] hover:text-[#ededed] transition-colors">Forgot password?</button>
            </div>
            <div className="relative mb-5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#52525b] focus:ring-1 focus:ring-[#52525b] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white transition-colors"
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[13px]`}></i>
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-[13px] font-medium text-[#ededed] mb-1.5">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-[#52525b] focus:ring-1 focus:ring-[#52525b] transition-all"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-cyan-400 text-black font-semibold py-2 rounded-lg text-[13px] flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors">
              Continue
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>

        {/* Bottom Links & Footer */}
        <div className="bg-[#131315] border-t border-[#2e2e32]">
          <div className="py-4 text-center border-b border-[#2e2e32]">
            <p className="text-[#a1a1aa] text-[13px]">
              Don't have an account? <Link to="/signup" className="text-white font-medium hover:underline">Sign up</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;