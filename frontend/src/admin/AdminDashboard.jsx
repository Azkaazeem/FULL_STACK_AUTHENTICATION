import React, { useState } from 'react';
import { Activity, LayoutDashboard, LogOut, Search, Server, Settings, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const chart = [38, 62, 44, 78, 56, 84, 70];
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );
  const activeUsers = users.filter((user) => user.status === 'Active').length;

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Users', icon: Users },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 lg:flex">
      <aside className="border-b border-white/10 bg-[#0d0f16] lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col justify-between p-5">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center bg-cyan-400 text-black">
                <Activity size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wide">Admin Core</h1>
                <p className="text-xs text-slate-500">Control panel</p>
              </div>
            </div>

            <nav className="grid gap-2">
              {menuItems.map(({ label, icon: Icon, active }) => (
                <button
                  key={label}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm transition ${
                    active ? 'bg-cyan-400 text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={() => navigate('/signin')}
            className="mt-6 flex w-full items-center justify-center gap-2 border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 grid gap-4 md:grid-cols-[1fr_340px] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Overview</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Admin Dashboard</h2>
          </div>

          <label className="relative block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users..."
              className="w-full border border-white/10 bg-[#11141d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </label>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <StatCard title="Total Users" value={users.length} icon={Users} tone="text-cyan-300" />
          <StatCard title="Active Users" value={activeUsers} icon={Activity} tone="text-emerald-300" />
          <StatCard title="Server Status" value="Online" icon={Server} tone="text-violet-300" />
        </section>

        <section className="mb-6 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <div className="border border-white/10 bg-[#0d0f16] p-5">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-semibold">Weekly Activity</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Tailwind chart</span>
            </div>

            <div className="flex h-56 items-end gap-3 border-b border-white/10 pt-4">
              {chart.map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex w-full items-end bg-white/[0.03]" style={{ height: '180px' }}>
                    <div
                      className="w-full bg-gradient-to-t from-cyan-500 to-emerald-300 transition hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-[#0d0f16] p-5">
            <h3 className="mb-5 font-semibold">System Health</h3>
            <div className="space-y-4">
              <HealthRow label="API Gateway" value="99.9%" />
              <HealthRow label="Database" value="Stable" />
              <HealthRow label="Security" value="Protected" />
            </div>
          </div>
        </section>

        <section className="border border-white/10 bg-[#0d0f16]">
          <div className="border-b border-white/10 p-5">
            <h3 className="font-semibold">Users</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-white/10 text-slate-300 hover:bg-white/[0.03]">
                      <td className="px-5 py-4 font-medium text-white">{user.name}</td>
                      <td className="px-5 py-4">{user.email}</td>
                      <td className="px-5 py-4">
                        <span className="border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="inline-flex items-center gap-2 border border-red-500/30 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-5 py-12 text-center text-slate-500">
                      No users to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, tone }) {
  return (
    <div className="border border-white/10 bg-[#0d0f16] p-5">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <Icon className={tone} size={20} />
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function HealthRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border border-white/10 bg-[#11141d] p-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-emerald-300">{value}</span>
    </div>
  );
}

export default AdminDashboard;
