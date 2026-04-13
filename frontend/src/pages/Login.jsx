import React, { useState } from 'react';
import { Scale, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-[#1e3a5f]">
          <Scale size={48} className="text-[#c9a84c]" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1e3a5f]">
          LexAI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Legal Research Engine for Indian Commercial Courts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-[#1e3a5f]">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#152a46] focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? <Loader2 className="animate-spin" size={20} /> : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-sm font-medium text-[#c9a84c] hover:text-[#b09038]">
              Register for an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
