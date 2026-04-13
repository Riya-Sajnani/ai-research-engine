import React from 'react';

const PredictionChart = ({ plaintiffWonPct, defendantWonPct }) => {
  // Ensure percentages add up to max 100 visually.
  const pPct = typeof plaintiffWonPct === 'number' ? plaintiffWonPct : 0;
  const dPct = typeof defendantWonPct === 'number' ? defendantWonPct : 0;
  
  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-semibold text-[#1e3a5f]">Plaintiff Won</span>
          <span className="text-sm font-semibold text-[#1e3a5f]">{pPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-[#1e3a5f] h-4 rounded-full" 
            style={{ width: `${pPct}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-semibold text-red-700">Defendant Won</span>
          <span className="text-sm font-semibold text-red-700">{dPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-red-700 h-4 rounded-full" 
            style={{ width: `${dPct}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 italic text-center w-full block">
        This is statistical guidance only and not a legal recommendation.
      </p>
    </div>
  );
};

export default PredictionChart;
