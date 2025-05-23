import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../firebase/authContext';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Failed to create an account: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="mt-2 text-gray-600">Sign up to start tracking your project costs</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;