import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0b] text-white p-4 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00e5ff] blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Glowing 404 Text */}
        <h1 
          className="text-8xl md:text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#00e5ff] to-[#005c66] leading-none mb-4"
          style={{ filter: 'drop-shadow(0px 0px 20px rgba(0, 229, 255, 0.4))' }}
        >
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-wide">
          PAGE NOT FOUND
        </h2>
        
        <p className="text-[#a1a1aa] text-sm md:text-base max-w-md mb-8 leading-relaxed">
          Looks like you've wandered too far into the digital void. <br/>
          This page doesn't exist, or has been moved.
        </p>

        {/* Action Button */}
        <Link 
          to="/home" 
          className="bg-[#00e5ff] text-black px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#00cce6] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)]"
        >
          BACK TO SAFETY
        </Link>

        {/* Bottom Link */}
        <button className="mt-8 text-[#a1a1aa] text-xs hover:text-[#00e5ff] transition-colors underline underline-offset-4 decoration-[#2e2e32] hover:decoration-[#00e5ff]">
          Report a broken link
        </button>
      </div>

    </div>
  );
};

export default ErrorPage;