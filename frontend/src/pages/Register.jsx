import React, { useState } from 'react';
import { Scale, Loader2, User, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import translations from '../utils/translations';
import { motion } from 'framer-motion';

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
  const t = translations["English"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      await api.post('/api/auth/register', formData);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-lex-navy/20 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-lex-gold/10 blur-[100px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-lex-gold/10 p-2 rounded-lg">
              <Scale className="text-lex-gold" size={32} />
            </div>
            <span className="font-bold text-3xl tracking-tighter lex-gradient-text">LexAI</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">{t.createAccount || 'Create Account'}</h2>
          <p className="text-gray-500 mt-2">{t.joinRevolution || 'Join the revolution in legal research'}</p>
        </div>

        <div className="glass-morphism p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.fullName || 'Full Name'}</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder || 'Adv. John Doe'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.emailAddress || 'Email Address'}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder || 'john@court.gov.in'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.courtOrganization || 'Court/Organization'}</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="court"
                    required
                    value={formData.court}
                    onChange={handleChange}
                    placeholder={t.courtPlaceholder || 'Delhi High Court'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.primaryLanguage || 'Primary Language'}</label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                >
                  <option value="English" className="bg-lex-navyDark">English</option>
                  <option value="Hindi" className="bg-lex-navyDark">Hindi</option>
                  <option value="Marathi" className="bg-lex-navyDark">Marathi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t.password || 'Password'}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder || '••••••••'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center py-4 px-4 bg-lex-gold hover:bg-lex-goldDark text-lex-navyDark rounded-xl font-bold transition-all shadow-lg shadow-lex-gold/10 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span>{t.createAccountButton || 'Create Account'}</span>
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {t.alreadyHaveAccount || 'Already have an account?'}{' '}
              <Link to="/login" className="text-lex-gold font-bold hover:underline">
                {t.signIn || 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
