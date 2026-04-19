import React from 'react';
import translations from '../utils/translations';
import { motion } from 'framer-motion';

const PredictionChart = ({ plaintiffWonPct, defendantWonPct }) => {
  const t = translations['English'];
  const pPct = typeof plaintiffWonPct === 'number' ? plaintiffWonPct : 0;
  const dPct = typeof defendantWonPct === 'number' ? defendantWonPct : 0;
  
  return (
    <div className="w-full space-y-8">
      <div>
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gray-500 block mb-1">{t.successProbability || 'Success Probability'}</span>
            <span className="text-lg font-bold text-white">{t.plaintiffOutcome || 'Plaintiff Outcome'}</span>
          </div>
          <span className="text-2xl font-bold text-lex-gold">{pPct}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5 p-[2px]">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${pPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-lex-gold/50 to-lex-gold h-full rounded-full shadow-[0_0_15px_rgba(201,168,76,0.5)]"
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-gray-500 block mb-1">{t.defenseProbability || 'Defense Probability'}</span>
            <span className="text-lg font-bold text-white">{t.defendantOutcome || 'Defendant Outcome'}</span>
          </div>
          <span className="text-2xl font-bold text-red-400">{dPct}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5 p-[2px]">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${dPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="bg-gradient-to-r from-red-500/50 to-red-600 h-full rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          />
        </div>
      </div>
      
      <div className="bg-lex-gold/5 border border-lex-gold/10 p-4 rounded-xl">
        <p className="text-[10px] text-lex-gold uppercase tracking-widest text-center font-bold leading-relaxed">
          {t.statisticalGuidance || 'Statistical Guidance Only'} • {t.notLegalRecommendation || 'Not a Legal Recommendation'} • {t.poweredBy || 'Powered by LexAI ML v2.4'}
        </p>
      </div>
    </div>
  );
};

export default PredictionChart;
