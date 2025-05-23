import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './firebase/authContext';
import Navigation from './components/Navigation';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CostTracker. All rights reserved.
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;