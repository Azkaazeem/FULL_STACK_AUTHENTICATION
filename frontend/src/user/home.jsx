import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UserHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = Boolean(user);
  const userName = user?.name || 'Guest';

  const dashboardData = useMemo(() => {
    const nameScore = userName.split('').reduce((total, letter) => total + letter.charCodeAt(0), 0);
    const projects = isLoggedIn ? (nameScore % 8) + 5 : 0;
    const views = isLoggedIn ? (nameScore * 17).toLocaleString() : '0';
    const tasks = isLoggedIn ? (nameScore % 5) + 2 : 0;

    return {
      stats: [
        {
          title: 'Total Projects',
          value: projects,
          note: `+${Math.max(1, projects - 4)} this month`,
          icon: 'fa-solid fa-layer-group',
          noteIcon: 'fa-solid fa-arrow-trend-up',
          accent: true,
        },
        {
          title: 'Profile Views',
          value: views,
          note: '+15% from last week',
          icon: 'fa-regular fa-eye',
          noteIcon: 'fa-solid fa-arrow-trend-up',
          accent: true,
        },
        {
          title: 'Active Tasks',
          value: tasks,
          note: `${Math.max(1, tasks - 2)} pending, 2 in progress`,
          icon: 'fa-solid fa-list-check',
          accent: false,
        },
      ],
      activities: [
        {
          title: `${userName} updated UI Components`,
          detail: 'In "Fix My Area" project',
          time: '2 hrs ago',
          icon: 'fa-brands fa-react',
        },
        {
          title: 'Completed Task',
          detail: 'Sidebar CSS styling done',
          time: '5 hrs ago',
          icon: 'fa-solid fa-check-double',
        },
        {
          title: 'Profile activity refreshed',
          detail: 'Dashboard data synced locally',
          time: 'Yesterday',
          icon: 'fa-solid fa-user-plus',
        },
      ],
    };
  }, [isLoggedIn, userName]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      background: '#131315',
      color: '#ffffff',
      confirmButtonColor: '#00e5ff',
      cancelButtonColor: '#3f3f46',
    });

    if (!result.isConfirmed) return;

    try {
      await fetch('https://full-stack-authentication-chi.vercel.app/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.log('Logout API error:', error);
    }

    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/home', { replace: true });

    Swal.fire({
      title: 'Logged out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      timer: 1300,
      showConfirmButton: false,
      background: '#131315',
      color: '#ffffff',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, <span className="text-[#00e5ff]">{userName}</span>!</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">
            {isLoggedIn ? "Here is what's happening with your account today." : 'Please login or signup to unlock your dashboard.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-[#00e5ff] text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#00cce6] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center gap-2"
              >
                <i className="fa-solid fa-right-from-bracket text-xs"></i>
                Logout
              </button>
              <div className="w-11 h-11 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer border-2 border-transparent hover:border-[#00e5ff] transition-all overflow-hidden">
                <i className="fas fa-user text-white text-xl"></i>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/signin" className="bg-[#00e5ff] text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#00cce6] transition-all">
                Login
              </Link>
              <Link to="/signup" className="bg-[#131315] border border-[#2e2e32] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all">
                Signup
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className={`${isLoggedIn ? '' : 'pointer-events-none select-none opacity-35 grayscale'} transition-all duration-300`}>
        <div className="w-full bg-gradient-to-r from-[#131315] to-[#0a191d] border border-[#00e5ff]/30 rounded-2xl p-8 mb-10 relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">Ready to write some code?</h2>
            <p className="text-[#a1a1aa] text-sm max-w-md mb-6 leading-relaxed">
              Your frontend development journey is going great. Check out your latest project stats and keep the momentum going!
            </p>
            <button className="bg-[#00e5ff] text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#00cce6] transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.7)] flex items-center gap-2">
              View Workspace <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00e5ff] blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {dashboardData.stats.map((stat) => (
            <div key={stat.title} className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 hover:border-[#00e5ff]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 group cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[#a1a1aa] text-sm font-medium">{stat.title}</h3>
                <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff] group-hover:scale-110 transition-transform">
                  <i className={stat.icon}></i>
                </div>
              </div>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className={`${stat.accent ? 'text-[#00e5ff]' : 'text-[#a1a1aa]'} text-xs mt-3 flex items-center gap-1.5 font-medium`}>
                {stat.noteIcon && <i className={stat.noteIcon}></i>} {stat.note}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#131315] border border-[#2e2e32] rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-bolt text-[#00e5ff]"></i> Recent Activity
            </h3>
            <button className="text-[#a1a1aa] text-sm hover:text-[#00e5ff] transition-colors">View All</button>
          </div>

          <div className="space-y-2">
            {dashboardData.activities.map((activity) => (
              <div key={activity.title} className="flex items-center justify-between p-4 rounded-lg hover:bg-[#1a1a1d] transition-colors border border-transparent hover:border-[#2e2e32]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00e5ff]/10 flex justify-center items-center text-[#00e5ff]">
                    <i className={activity.icon}></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <p className="text-xs text-[#a1a1aa] mt-0.5">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-[#a1a1aa] font-medium bg-[#1a1a1d] px-2.5 py-1 rounded-md">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;
