import React from 'react';

const PrecedentCard = ({ precedent }) => {
  return (
    <div className="mb-4 pl-4 border-l-4 border-[#c9a84c] bg-gray-50 py-3 pr-3 rounded-r-md">
      <h4 className="font-bold text-[#1e3a5f]">{precedent.caseTitle}</h4>
      <p className="text-sm text-gray-500 mb-2">{precedent.court}, {precedent.year}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{precedent.snippet}</p>
    </div>
  );
};

export default PrecedentCard;
