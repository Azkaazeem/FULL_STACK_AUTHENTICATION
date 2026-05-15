import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, LayoutDashboard, LogOut, Search, Server, Settings, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import 'sweetalert2/dist/sweetalert2.min.css';

const API_URL = 'https://full-stack-authentication-chi.vercel.app/api/v1/auth';
const roleOptions = ['all', 'admin', 'user'];

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminUser = useMemo(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const authToken = localStorage.getItem('authToken');

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok || data.status !== true) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('authToken');
        navigate('/signin', { replace: true });
        toast.error(data.message || 'Admin access only');
        return;
      }

      setUsers(data.users);
    } catch {
      toast.error('Unable to load users');
    } finally {
      setLoading(false);
    }
  }, [authToken, navigate]);

  useEffect(() => {
    if (adminUser?.role !== 'admin' || !authToken) {
      navigate('/signin', { replace: true });
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [adminUser?.role, authToken, fetchUsers, navigate]);

  const filteredUsers = users.filter((user) => {
    const searchText = `${user.name} ${user.email}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const dashboardUsers = users.slice(0, 5);
  const adminCount = users.filter((user) => user.role === 'admin').length;
  const chart = [38, 62, 44, 78, 56, 84, 70];

  const changeUserRole = async (userId, role) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/role`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ role }),
      });
      const data = await response.json();

      if (!response.ok || data.status !== true) {
        toast.error(data.message || 'Role update failed');
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) => (user._id === userId ? data.user : user))
      );
      toast.success('Role updated successfully');
    } catch {
      toast.error('Role update failed');
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Delete user?',
      text: 'This user will be removed from the database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#131315',
      color: '#ffffff',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok || data.status !== true) {
        toast.error(data.message || 'Delete failed');
        return;
      }

      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
      toast.success('User deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout from the admin panel?',
      icon: 'question',
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
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.log('Logout API failed');
    }

    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    navigate('/signin', { replace: true });
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Users', icon: Users },
    { label: 'Settings', icon: Settings, disabled: true },
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
                <p className="text-xs text-slate-500">{adminUser?.email || 'Control panel'}</p>
              </div>
            </div>

            <nav className="grid gap-2">
              {menuItems.map(({ label, icon: Icon, disabled }) => (
                <button
                  key={label}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setActiveTab(label)}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm transition ${
                    activeTab === label ? 'bg-cyan-400 text-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  } ${disabled ? 'cursor-not-allowed opacity-40 hover:bg-transparent hover:text-slate-400' : ''}`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
              {activeTab === 'Dashboard' ? 'Overview' : 'User Management'}
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{activeTab}</h2>
          </div>

          {activeTab === 'Users' && (
            <div className="grid gap-3 sm:grid-cols-[minmax(220px,340px)_180px]">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search users..."
                  className="w-full border border-white/10 bg-[#11141d] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </label>

              <RoleFilter value={selectedRole} onChange={setSelectedRole} />
            </div>
          )}
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <StatCard title="Total Users" value={users.length} icon={Users} tone="text-cyan-300" />
          <StatCard title="Admins" value={adminCount} icon={Activity} tone="text-emerald-300" />
          <StatCard title="Server Status" value="Online" icon={Server} tone="text-violet-300" />
        </section>

        {activeTab === 'Dashboard' ? (
          <>
            <section className="mb-6 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
              <div className="border border-white/10 bg-[#0d0f16] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-semibold">Weekly Activity</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Live overview</span>
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
                  <HealthRow label="Database" value={loading ? 'Loading' : 'Stable'} />
                  <HealthRow label="Security" value="Protected" />
                </div>
              </div>
            </section>

            <UsersTable
              title="Latest Users"
              users={dashboardUsers}
              loading={loading}
              onRoleChange={changeUserRole}
              onDelete={deleteUser}
              footer={
                users.length > 5 && (
                  <button
                    onClick={() => setActiveTab('Users')}
                    className="border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                  >
                    Show More
                  </button>
                )
              }
            />
          </>
        ) : (
          <UsersTable
            title="All Users"
            users={filteredUsers}
            loading={loading}
            onRoleChange={changeUserRole}
            onDelete={deleteUser}
          />
        )}
      </main>
    </div>
  );
}

function RoleFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full border border-white/10 bg-[#11141d] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
    >
      {roleOptions.map((role) => (
        <option key={role} value={role} className="bg-[#11141d]">
          {role === 'all' ? 'All Roles' : role}
        </option>
      ))}
    </select>
  );
}

function UsersTable({ title, users, loading, onRoleChange, onDelete, footer }) {
  return (
    <section className="border border-white/10 bg-[#0d0f16]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
        <h3 className="font-semibold">{title}</h3>
        {footer}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id} className="border-t border-white/10 text-slate-300 hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">
                    <select
                      value={user.role}
                      onChange={(event) => onRoleChange(user._id, event.target.value)}
                      className="border border-white/10 bg-[#11141d] px-3 py-2 text-xs text-white outline-none transition focus:border-cyan-400"
                    >
                      <option value="user" className="bg-[#11141d]">user</option>
                      <option value="admin" className="bg-[#11141d]">admin</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <span className="border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onDelete(user._id)}
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
                <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                  No users to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
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
