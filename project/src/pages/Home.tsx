import React from 'react';
import { Link } from 'react-router-dom';
import { Receipt, PieChart, Shield, Users } from 'lucide-react';
import { useAuth } from '../firebase/authContext';

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Project Costs with Confidence</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              A simple, powerful tool to keep your projects on budget and under control
            </p>
            {currentUser ? (
              <Link to="/dashboard" className="btn bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 text-lg">
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className="btn bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 text-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn bg-blue-800/30 backdrop-blur-sm text-white hover:bg-blue-800/50 font-semibold px-8 py-3 text-lg">
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Features that make tracking costs easy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Itemized Tracking</h3>
              <p className="text-gray-600">
                Track individual items with names and costs to get a detailed breakdown of your project expenses.
              </p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <PieChart className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Totals</h3>
              <p className="text-gray-600">
                See your total project cost update instantly as you add, edit, or remove items and other costs.
              </p>
            </div>
            
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your project data is securely stored and only accessible to you. We prioritize your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to take control of your project costs?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of project managers who use CostTracker to stay on budget.
            </p>
            {currentUser ? (
              <Link to="/dashboard" className="btn btn-primary px-8 py-3 text-lg">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary px-8 py-3 text-lg">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;