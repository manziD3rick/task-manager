import { useAuth } from '../context/AuthContext';

function Navbar({ onReport }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-lg font-bold tracking-wide">Student Task Manager</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-blue-100">
          Hello, <span className="font-semibold text-white">{user?.username}</span>
        </span>
        <button
          onClick={onReport}
          className="bg-white text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
        >
          Report
        </button>
        <button
          onClick={logout}
          className="bg-blue-800 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-900 transition"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
