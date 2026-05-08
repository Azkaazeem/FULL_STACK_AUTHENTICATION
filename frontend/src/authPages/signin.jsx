import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Main Container (Full screen background)
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-4 font-sans">

      {/* Card Container */}
      <div className="w-full max-w-[400px] bg-[#131315] rounded-xl border border-[#2e2e32] shadow-2xl overflow-hidden">

        {/* Top Section: Header & Form */}
        <div className="p-8 pb-6">
          <p className="text-[#a1a1aa] text-sm text-center mb-7">Welcome back! Please sign in to continue</p>

          {/* Social Auth Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1d] border border-[#2e2e32] hover:bg-[#27272a] transition-colors py-1.5 rounded-lg text-[13px] font-medium text-[#ededed]">
              {/* GitHub Icon */}
              <svg xmlns="http://www.w3.org/polygons" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1d] border border-[#2e2e32] hover:bg-[#27272a] transition-colors py-1.5 rounded-lg text-[13px] font-medium text-[#ededed]">
              {/* Google Icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-[1px] bg-[#2e2e32]"></div>
            <span className="text-[#a1a1aa] text-[13px]">or</span>
            <div className="flex-1 h-[1px] bg-[#2e2e32]"></div>
          </div>

          {/* Email and Password Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Email address</label>
              <button type="button" className="text-[13px] text-[#a1a1aa] hover:text-[#ededed] transition-colors">Use phone</button>
            </div>
            <input
              type="email"
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

            <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded-lg text-[13px] flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors">
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