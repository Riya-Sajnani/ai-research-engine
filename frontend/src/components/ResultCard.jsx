import React from 'react';

const ResultCard = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6 relative">
      <div className="bg-[#1e3a5f] p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <span className="bg-[#c9a84c] text-white text-xs font-bold px-2 py-1 rounded">
          AI Generated
        </span>
      </div>
      <div className="p-6 text-gray-800">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
