import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`${isAboutPage ? 'bg-transparent' : 'bg-blue-600'} text-white shadow-lg transition-colors`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          StyleYou
        </Link>
        <div className="flex items-center space-x-4">
          {isAboutPage ? (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
              <Link to="/register" className="bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors text-white">
                Get Started
              </Link>
            </div>
          ) : (
            user ? (
              <>
                <span className="text-white">Welcome, {user.firstName}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-white">
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
