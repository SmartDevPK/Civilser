import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  // State Management
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email Validation Helper
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        'http://localhost:5000/forgotpassword',
        { email }, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (data.success) {
        toast.success('Password reset email sent! Check your inbox (including spam folder).');
      } else {
        toast.error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        'If that email is registered, you will receive a reset link';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Render Component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Reset Your Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                       shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" 
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-4 text-center text-sm">
          <Link 
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;