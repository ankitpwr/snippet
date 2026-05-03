import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // If there's no user logged in, don't show the navbar (or show a simplified public one)
  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
        <Link
          to="/snippets"
          className="text-xl font-bold text-gray-800 flex items-center gap-2"
        >
          SnippetBin
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/snippets"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Dashboard
          </Link>
          <div className="flex items-center gap-4 border-l pl-4 border-gray-300">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
