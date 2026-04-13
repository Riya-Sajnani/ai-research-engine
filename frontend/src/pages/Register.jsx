import React, { useState } from 'react';
import { Scale, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    court: '',
    preferredLanguage: 'English'
  });
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      await api.post('/api/auth/register', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
          Court Official Registration
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-[#c9a84c]">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Court Name</label>
              <input
                type="text" name="court" required value={formData.court} onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
              <select
                name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a5f] focus:border-[#1e3a5f] sm:text-sm"
              >
                {['English', 'Hindi', 'Marathi', 'Tamil', 'Bengali', 'Gujarati'].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit" disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#152a46] focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? <Loader2 className="animate-spin" size={20} /> : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-medium text-[#1e3a5f] hover:text-[#152a46]">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
