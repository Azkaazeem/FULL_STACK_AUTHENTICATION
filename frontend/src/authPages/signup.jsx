import React, { useState } from 'react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Main Wrapper
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-4 font-sans">
      
      {/* Container Card */}
      <div className="w-full max-w-[420px] bg-[#131315] rounded-2xl border border-[#2e2e32] shadow-2xl overflow-hidden p-10">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
            <span className="text-2xl font-bold tracking-tight">clerk</span>
          </div>
          <h2 className="text-2xl font-semibold text-[#ededed]">Create your account</h2>
          <p className="text-[#a1a1aa] text-sm mt-2">No credit card required.</p>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 bg-[#1a1a1d] border border-[#2e2e32] hover:bg-[#27272a] transition-all py-2 rounded-lg text-sm font-medium text-[#ededed]">
            <i className="fa-brands fa-github text-lg"></i> GitHub
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1a1a1d] border border-[#2e2e32] hover:bg-[#27272a] transition-all py-2 rounded-lg text-sm font-medium text-[#ededed]">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg> Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-[1px] bg-[#2e2e32]"></div>
          <span className="text-[#a1a1aa] text-xs uppercase">or</span>
          <div className="flex-1 h-[1px] bg-[#2e2e32]"></div>
        </div>

        {/* Signup Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">Email address</label>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6c47ff] border-focus:border-[#6c47ff] transition-all"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#ededed] mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
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

          <button className="w-full bg-[#6c47ff] hover:bg-[#5a36e0] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group">
            Continue 
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-[#a1a1aa] text-sm">
            Already have an account? <a href="/signin" className="text-[#6c47ff] font-medium hover:underline">Sign in</a>
          </p>
        </div>

      </div>

      {/* Secured Footer */}
      <div className="fixed bottom-8 flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
        <span className="text-xs text-[#a1a1aa]">Secured by</span>
        <div className="flex items-center gap-1 font-bold text-xs uppercase tracking-widest">
           <i className="fa-solid fa-shield-halved text-[#6c47ff]"></i> clerk
        </div>
      </div>
    </div>
  );
};

export default SignUp;