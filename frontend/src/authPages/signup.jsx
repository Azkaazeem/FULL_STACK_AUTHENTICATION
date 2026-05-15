import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Creating account...");

    try {
      const response = await fetch('http://https://full-stack-authentication-chi.vercel.app//api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
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

      <div className="w-full max-w-[400px] bg-[#131315] rounded-xl border border-[#2e2e32] shadow-2xl overflow-hidden">
        <div className="p-8 pb-6">
          <p className="text-[#a1a1aa] text-sm text-center mb-7">Create an account to get started</p>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <label
              htmlFor='profile'
              className="w-24 h-24 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-gray-500 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-user text-white text-4xl"></i>
            </label>
            <input type="file" className="hidden" id='profile' />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup}>
            
            {/* Name Input */}
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Full Name</label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#52525b] focus:ring-1 focus:ring-[#52525b] transition-all mb-4"
            />

            {/* Email Input */}
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Email address</label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-[#1a1a1d] border border-[#2e2e32] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#71717a] focus:outline-none focus:border-[#52525b] focus:ring-1 focus:ring-[#52525b] transition-all mb-4"
            />

            {/* Password Input */}
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[13px] font-medium text-[#ededed]">Password</label>
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
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

            {/* Submit Button */}
            <button type="submit" className="w-full bg-cyan-400 text-black font-semibold py-2 rounded-lg text-[13px] flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors">
              Sign Up
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
              Already have an account? <Link to="/signin" className="text-white font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
