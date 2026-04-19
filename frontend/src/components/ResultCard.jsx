import React from 'react';
import translations from '../utils/translations';
import { motion } from 'framer-motion';

const ResultCard = ({ title, children }) => {
  const t = translations['English'];
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-morphism rounded-3xl overflow-hidden border-white/10"
    >
      <div className="bg-white/5 px-6 py-4 flex justify-between items-center border-b border-white/5">
        <h3 className="text-lex-gold font-bold text-lg uppercase tracking-wider">{title}</h3>
        <span className="bg-lex-gold/10 text-lex-gold text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest border border-lex-gold/20">
          {t.aiAnalysis || 'AI Analysis'}
        </span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default ResultCard;
