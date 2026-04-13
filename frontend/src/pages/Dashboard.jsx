import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import UploadBox from '../components/UploadBox';
import ResultCard from '../components/ResultCard';
import PrecedentCard from '../components/PrecedentCard';
import PredictionChart from '../components/PredictionChart';
import api from '../utils/api';
import translations from '../utils/translations';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [language, setLanguage] = useState(user?.preferredLanguage || 'English');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const resultsRef = useRef(null);
  const t = translations[language] || translations["English"];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
  };

  const handleAnalyse = async () => {
    if (!selectedFile) return;
    
    setIsAnalysing(true);
    setError('');
    
    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('language', language);
    
    try {
      const response = await api.post('/api/case/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
      // Scroll to results automatically after a short delay to allow rendering
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || 'Error analysing the case document.');
    } finally {
      setIsAnalysing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar language={language} setLanguage={setLanguage} />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">
            {t.welcome}, {user?.name || 'Judge'}
          </h1>
          <p className="text-gray-600">{user?.court}</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">{t.upload}</h2>
          <UploadBox onFileSelect={handleFileSelect} translations={translations} language={language} />
          
          {error && (
            <div className="mt-4 text-red-500 font-medium text-center">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAnalyse}
              disabled={!selectedFile || isAnalysing}
              className="bg-[#c9a84c] hover:bg-[#b09038] text-white font-bold py-3 px-8 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
            >
              {isAnalysing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  {t.loading}
                </>
              ) : (
                t.analyse
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && !isAnalysing && (
          <div ref={resultsRef} className="pt-4 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">{t.results}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Summary Card */}
              <ResultCard title={t.summary}>
                <div className="mb-4">
                  <span className="bg-[#e4ebf5] text-[#1e3a5f] px-3 py-1 rounded-full text-xs font-semibold">
                    {result.caseType}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{result.summary}</p>
                
                {result.legalIssues && result.legalIssues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#1e3a5f] mb-2">Key Legal Issues:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {result.legalIssues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </ResultCard>

              {/* Layout wrapper for smaller stackable cards */}
              <div className="flex flex-col gap-6">
                
                {/* Predictions */}
                <ResultCard title={t.prediction}>
                  <PredictionChart 
                    plaintiffWonPct={result.outcomeStat?.plaintiffWonPct} 
                    defendantWonPct={result.outcomeStat?.defendantWonPct} 
                  />
                </ResultCard>
                
                {/* Legal Provisions */}
                <ResultCard title={t.provisions}>
                  {result.relevantLaws && result.relevantLaws.length > 0 ? (
                    <div className="space-y-3">
                      {result.relevantLaws.map((law, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium text-[#1e3a5f]">{law.actName || law.act}</span>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">
                            Section {law.section}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No specific legal provisions identified.</p>
                  )}
                </ResultCard>
                
              </div>
              
              {/* Precedents Card - Full width */}
              <div className="lg:col-span-2">
                <ResultCard title={t.precedents}>
                  {result.precedents && result.precedents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {result.precedents.map((precedent, i) => (
                        <PrecedentCard key={i} precedent={precedent} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No precedents found.</p>
                  )}
                </ResultCard>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
