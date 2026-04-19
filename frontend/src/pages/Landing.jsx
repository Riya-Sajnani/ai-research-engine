import React from 'react';
import translations from '../utils/translations';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import { motion } from 'framer-motion';

const Landing = () => {
  const t = translations["English"];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar isTransparent />
      
      <main>
        <Hero />
        <AboutSection />
        
        {/* Call to Action Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-morphism p-12 rounded-3xl border-lex-gold/20"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.readyToTransform || 'Ready to transform your research?'}</h2>
              <p className="text-gray-400 mb-10 text-lg">
                {t.joinProfessionals || 'Join hundreds of legal professionals using LexAI to streamline their case analysis.'}
              </p>
              <button 
                onClick={() => window.location.href = '/register'}
                className="bg-lex-gold hover:bg-lex-goldDark text-lex-navyDark font-bold py-4 px-10 rounded-xl transition-all shadow-lg"
              >
                {t.createFreeAccount || 'Create Free Account'}
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t border-white/5 bg-lex-navyDark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:items-center">
          <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4 sm:mb-0">
            <span className="font-bold text-2xl tracking-tight lex-gradient-text">LexAI</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2026 LexAI Research Engine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
