import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Receipt, LogOut, LogIn, ClipboardList } from 'lucide-react';
import { useAuth } from '../firebase/authContext';

const Navigation: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Receipt className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">CostTracker</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 flex items-center">
                <ClipboardList className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline flex items-center text-sm"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary flex items-center text-sm">
              <LogIn className="h-4 w-4 mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;