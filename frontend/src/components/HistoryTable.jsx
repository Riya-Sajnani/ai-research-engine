import React from 'react';

const HistoryTable = ({ history, translations, language }) => {
  const t = translations[language] || translations["English"];

  if (!history || history.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
        <p className="text-gray-500">{t.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1e3a5f] text-white">
              <th className="p-4 font-semibold text-sm">{t.fileHeading}</th>
              <th className="p-4 font-semibold text-sm">{t.caseTypeHeading}</th>
              <th className="p-4 font-semibold text-sm">{t.languageHeading}</th>
              <th className="p-4 font-semibold text-sm">{t.dateTimeHeading}</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr 
                key={item._id || index} 
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
              >
                <td className="p-4 text-sm font-medium text-gray-800">{item.fileName}</td>
                <td className="p-4 text-sm text-gray-600">
                  <span className="bg-[#e4ebf5] text-[#1e3a5f] px-2 py-1 rounded-md text-xs font-semibold">
                    {item.caseType}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{item.language}</td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(item.createdAt || item.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
