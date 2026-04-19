import React, { useState, useEffect } from 'react';
import { Scale, LogOut, LayoutDashboard, History, Info, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import translations from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isTransparent = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations['English'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: t.home || 'Home', path: '/', icon: <Info size={18} />, hidden: !!user },
    { name: t.dashboard || 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} />, hidden: !user },
    { name: t.history || 'History', path: '/history', icon: <History size={18} />, hidden: !user },
  ];

  const glassClass = (isScrolled || !isTransparent) 
    ? "bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-4" 
    : "bg-transparent py-6";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${glassClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            <div className="bg-lex-gold/10 p-2 rounded-lg group-hover:bg-lex-gold/20 transition-all">
              <Scale className="text-lex-gold" size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tighter lex-gradient-text">LexAI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.filter(link => !link.hidden).map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-all ${
                  location.pathname === link.path ? 'text-lex-gold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-xs font-bold text-lex-gold leading-none">{user.name || 'User'}</p>
                    <p className="text-[10px] text-gray-500 leading-none mt-1 uppercase tracking-widest">{user.court || 'Commercial Court'}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-all">{t.login || 'Login'}</Link>
                  <Link to="/register" className="bg-lex-gold hover:bg-lex-goldDark text-lex-navyDark px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-lex-gold/10">{t.getStarted || 'Get Started'}</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-lex-navyDark border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navLinks.filter(link => !link.hidden).map(link => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-4 text-lg font-medium text-gray-300"
                >
                  <div className="bg-white/5 p-2 rounded-lg">{link.icon}</div>
                  <span>{link.name}</span>
                </Link>
              ))}
              
              <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-lex-gold/20 flex items-center justify-center font-bold text-lex-gold">
                        {user.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.court}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-500/10 text-red-400 py-3 rounded-xl font-bold"
                    >
                      <LogOut size={18} />
                      <span>{t.logout || 'Logout'}</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" className="flex items-center justify-center border border-white/10 py-3 rounded-xl font-bold">{t.login || 'Login'}</Link>
                    <Link to="/register" className="flex items-center justify-center bg-lex-gold text-lex-navyDark py-3 rounded-xl font-bold">{t.register || 'Register'}</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
