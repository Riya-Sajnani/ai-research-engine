import React, { useState } from 'react';
import { Scale, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import translations from '../utils/translations';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const { login } = useAuth();
  const t = translations["English"];
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, ...userData } = response.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-lex-navy/20 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lex-gold/10 blur-[100px] rounded-full -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="bg-lex-gold/10 p-2 rounded-lg">
              <Scale className="text-lex-gold" size={32} />
            </div>
            <span className="font-bold text-3xl tracking-tighter lex-gradient-text">LexAI</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">{t.welcomeBack || 'Welcome Back'}</h2>
          <p className="text-gray-500 mt-2">{t.accessDashboard || 'Access your legal research dashboard'}</p>
        </div>

        <div className="glass-morphism p-8 rounded-3xl border-white/10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t.emailAddress || 'Email Address'}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder || 'name@court.gov.in'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-lex-gold transition-all text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t.password || 'Password'}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                  <span>{t.signIn || 'Sign In'}</span>
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {t.dontHaveAccount || "Don't have an account?"}{' '}
              <Link to="/register" className="text-lex-gold font-bold hover:underline">
                {t.createOneNow || 'Create one now'}
              </Link>
            </p>
          </div>
        </div>

        <Link to="/" className="mt-8 flex items-center justify-center text-gray-500 text-sm hover:text-white transition-all">
          <span>{t.backToHome || '← Back to home'}</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
