import React from 'react';

const UserHome = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, <span className="text-[#00e5ff]">Azka</span>! 👋</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">Here is what's happening with your account today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-[#131315] border border-[#2e2e32] rounded-full hover:border-[#00e5ff] transition-colors group">
            <i className="fa-regular fa-bell text-[#a1a1aa] group-hover:text-[#00e5ff] transition-colors"></i>
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#00e5ff] rounded-full border-2 border-[#0a0a0b]"></span>
          </button>
          <div className="w-11 h-11 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer border-2 border-transparent hover:border-[#00e5ff] transition-all overflow-hidden">
            <i className="fas fa-user text-white text-xl"></i>
          </div>
        </div>
      </header>

      {/* Top Gradient Banner */}
      <div className="w-full bg-gradient-to-r from-[#131315] to-[#0a191d] border border-[#00e5ff]/30 rounded-2xl p-8 mb-10 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to write some code? </h2>
          <p className="text-[#a1a1aa] text-sm max-w-md mb-6 leading-relaxed">
            Your frontend development journey is going great. Check out your latest project stats and keep the momentum going!
          </p>
          <button className="bg-[#00e5ff] text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#00cce6] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] flex items-center gap-2">
            View Workspace <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
        {/* Background Glowing Decoration */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00e5ff] blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Stat Card 1 */}
        <div className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 hover:border-[#00e5ff]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 group cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#a1a1aa] text-sm font-medium">Total Projects</h3>
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff] group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-layer-group"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">12</p>
          <p className="text-[#00e5ff] text-xs mt-3 flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-arrow-trend-up"></i> +2 this month
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 hover:border-[#00e5ff]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 group cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#a1a1aa] text-sm font-medium">Profile Views</h3>
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff] group-hover:scale-110 transition-transform">
              <i className="fa-regular fa-eye"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">1,245</p>
          <p className="text-[#00e5ff] text-xs mt-3 flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-arrow-trend-up"></i> +15% from last week
          </p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 hover:border-[#00e5ff]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 group cursor-pointer">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#a1a1aa] text-sm font-medium">Active Tasks</h3>
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff] group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-list-check"></i>
            </div>
          </div>
          <p className="text-4xl font-bold text-white">5</p>
          <p className="text-[#a1a1aa] text-xs mt-3 font-medium">
            3 pending, 2 in progress
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-bolt text-[#00e5ff]"></i> Recent Activity
          </h3>
          <button className="text-[#a1a1aa] text-sm hover:text-[#00e5ff] transition-colors">View All</button>
        </div>
        
        <div className="space-y-2">
          {/* Activity Item 1 */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1a1a1d] transition-colors border border-transparent hover:border-[#2e2e32]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff]">
                <i className="fa-brands fa-react"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Updated UI Components</p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">In "Fix My Area" project</p>
              </div>
            </div>
            <span className="text-xs text-[#a1a1aa] font-medium bg-[#1a1a1d] px-2.5 py-1 rounded-md">2 hrs ago</span>
          </div>

          {/* Activity Item 2 */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1a1a1d] transition-colors border border-transparent hover:border-[#2e2e32]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff]">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Completed Task</p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">Sidebar CSS styling done</p>
              </div>
            </div>
            <span className="text-xs text-[#a1a1aa] font-medium bg-[#1a1a1d] px-2.5 py-1 rounded-md">5 hrs ago</span>
          </div>

          {/* Activity Item 3 */}
          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1a1a1d] transition-colors border border-transparent hover:border-[#2e2e32]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff]">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-white">New Connection</p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">Network growing</p>
              </div>
            </div>
            <span className="text-xs text-[#a1a1aa] font-medium bg-[#1a1a1d] px-2.5 py-1 rounded-md">Yesterday</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserHome;