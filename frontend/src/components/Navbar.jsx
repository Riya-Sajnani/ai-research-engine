import React from 'react';
import { Scale } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import translations from '../utils/translations';

const Navbar = ({ language, setLanguage }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const t = translations[language] || translations["English"];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (e) => {
    if (setLanguage) {
      setLanguage(e.target.value);
    }
  };

  return (
    <nav className="bg-[#1e3a5f] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <Scale className="text-[#c9a84c] mr-2" size={28} />
              <span className="font-bold text-xl tracking-tight">LexAI</span>
            </div>
            
            {user && (
              <div className="hidden md:flex space-x-4">
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t.dashboard || "Dashboard"}
                </Link>
                <Link to="/history" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {t.history}
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">Language:</span>
              <select 
                value={language} 
                onChange={handleLanguageChange}
                className="bg-[#152a46] border border-gray-600 text-sm rounded-md px-2 py-1 focus:outline-none focus:border-[#c9a84c]"
              >
                {Object.keys(translations).map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-[#c9a84c]">{user.name || 'Honorable Judge'}</div>
                  <div className="text-xs text-gray-300">{user.court || ''}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-transparent border border-gray-500 hover:border-white text-gray-300 hover:text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
