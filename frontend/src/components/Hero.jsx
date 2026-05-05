import React from 'react';
import translations from '../utils/translations';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import lexHero from '../assets/lex_hero.png';

const Hero = () => {
  const navigate = useNavigate();
  const t = translations['English'];
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-lex-navy/20 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-lex-gold/10 border border-lex-gold/20 text-lex-gold text-sm font-medium mb-6">
              <Zap size={14} />
              <span>{t.nextGenLegal || 'Next-Gen Legal Intelligence'}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              {t.heroTitle || 'Revolutionizing'} <span className="lex-gradient-text">{t.heroHighlight || 'Legal Research'}</span> {t.heroSubtitleTitle || 'with AI'}
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              {t.heroSubtitle || 'Empowering Indian Commercial Courts with precision analysis, predictive outcomes, and lightning-fast precedent discovery.'}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-lex-gold hover:bg-lex-goldDark text-lex-navyDark font-bold py-4 px-8 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-lex-gold/20"
                onClick={() => navigate('/dashboard')}
              >
                {t.goToDashboard || 'Go to Dashboard'}
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
              
              <button 
                className="glass-morphism py-4 px-8 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.learnMore || 'Learn More'}
              </button>
            </div>
            
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16 lg:mt-0 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-lex-navy/50 border border-white/10">
              <img 
                src={lexHero} 
                alt="LexAI Hero" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lex-navyDark/80 via-transparent to-transparent" />
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
