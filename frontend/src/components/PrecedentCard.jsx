import React from 'react';
import { ExternalLink, Gavel } from 'lucide-react';

const PrecedentCard = ({ precedent }) => {
  return (
    <div className="group bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-lex-gold/30 transition-all hover:bg-white/[0.08]">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-lex-gold/10 p-2 rounded-lg">
          <Gavel className="text-lex-gold" size={20} />
        </div>
        <button className="text-gray-500 hover:text-lex-gold transition-colors">
          <ExternalLink size={18} />
        </button>
      </div>
      
      <h4 className="font-bold text-white mb-2 leading-tight group-hover:text-lex-gold transition-colors">{precedent.Title}</h4>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest font-bold">
          {precedent.court}
        </span>
        <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest font-bold">
          {precedent.year}
        </span>
        {precedent.citation && (
          <span className="text-[10px] bg-lex-gold/10 text-lex-gold px-2 py-0.5 rounded border border-lex-gold/20 uppercase tracking-widest font-bold">
            {precedent.citation}
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
        {precedent.summary}
      </p>
    </div>
  );
};

export default PrecedentCard;
