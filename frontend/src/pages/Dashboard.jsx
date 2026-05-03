import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import UploadBox from '../components/UploadBox';
import ResultCard from '../components/ResultCard';
import PrecedentCard from '../components/PrecedentCard';
import PredictionChart from '../components/PredictionChart';
import api from '../utils/api';
import translations from '../utils/translations';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const resultsRef = useRef(null);
  const t = translations["English"];

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError('');
  };

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleAnalyse = async () => {
    if (!selectedFile) return;
    
    setIsAnalysing(true);
    setError('');
    
    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('language', 'English');
    
    try {
      const response = await api.post('/api/cases/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data?.data || null);
      scrollToResults();
    } catch (err) {
      setError(err.response?.data?.message || 'Error analysing the case document.');
    } finally {
      setIsAnalysing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
<Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t.welcomeBackUser || 'Welcome back'}, <span className="lex-gradient-text">{user?.name || 'Researcher'}</span>
            </h1>
            <p className="text-gray-400 flex items-center">
              <Sparkles size={16} className="text-lex-gold mr-2" />
              {user?.court || t.readyForNewAnalysis || 'Ready for new case analysis'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-gray-500 text-sm italic">
            {t.lastSession || 'Last session:'} {new Date().toLocaleDateString()}
          </div>
        </motion.div>

        {/* Action Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Input Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-morphism p-8 rounded-3xl border-white/10"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              {t.startNewAnalysis || 'Start New Analysis'}
            </h2>
            
            <UploadBox 
              onFileSelect={handleFileSelect} 
            />
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center text-red-400 text-sm"
                >
                  <AlertCircle size={18} className="mr-2 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleAnalyse}
                disabled={!selectedFile || isAnalysing}
                className="bg-lex-gold hover:bg-lex-goldDark text-lex-navyDark font-bold py-3 px-10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-lex-gold/10"
              >
                {isAnalysing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {t.processing || 'Processing...'}
                  </>
                ) : (
                  t.analyzeDocument || 'Analyze Document'
                )}
              </button>
            </div>
          </motion.div>

          {/* Quick Tips / Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-morphism p-6 rounded-3xl border-white/10 flex-grow">
              <h3 className="font-bold text-lex-gold mb-4 uppercase tracking-widest text-xs">{t.recentActivity || 'Recent Activity'}</h3>
              <div className="space-y-4">
                <p className="text-gray-500 text-sm italic">{t.noRecentAnalyses || 'No recent analyses found. Start by uploading a PDF or pasting a link.'}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-lex-navy to-[#152a46] p-6 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="font-bold text-white mb-2">{t.proTip || 'Pro Tip'}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.pasteLinksTip || 'You can now paste direct links from Indian Kanoon for instant semantic analysis of judgments.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        {result && !isAnalysing && (
          <motion.div 
            ref={resultsRef} 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-12 border-t border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center">
                <Sparkles className="text-lex-gold mr-3" size={28} />
                {t.analysisResults || 'Analysis Results'}
              </h2>
              <button className="text-lex-gold text-sm font-semibold hover:underline">{t.exportReport || 'Export Report (PDF)'}</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Summary Card */}
              <ResultCard title={t.summary}>
                <div className="mb-4">
                  <span className="bg-lex-gold/10 text-lex-gold px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-lex-gold/20">
                    {result.caseType}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{result.summary}</p>
                
                {result.legalIssues && result.legalIssues.length > 0 && (
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-lex-gold mb-4 flex items-center uppercase tracking-widest text-xs">{t.keyLegalIssues || 'Key Legal Issues'}</h4>
                    <ul className="space-y-3 text-gray-300">
                      {result.legalIssues.map((issue, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-lex-gold mr-3 mt-1">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ResultCard>

              {/* Layout wrapper for smaller stackable cards */}
              <div className="flex flex-col gap-8">
                
                {/* Predictions */}
                <ResultCard title={t.prediction}>
                  <PredictionChart 
                    plaintiffWonPct={result.outcomeStat?.plaintiffWinPercentage} 
                    defendantWonPct={result.outcomeStat?.defendantWinPercentage} 
                  />
                </ResultCard>
                
                {/* Legal Provisions */}
                <ResultCard title={t.provisions}>
                  {result.provisions && result.provisions.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {result.provisions.map((provision, i) => (
                      <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:border-lex-gold/20 transition-all">
                        <div>
                          <span className="font-bold text-white block">{provision.actName}</span>
                          <span className="text-xs text-gray-500 uppercase tracking-widest">{provision.title}</span>
                          <span className="text-xs text-gray-400 mt-1 block">{provision.description?.substring(0, 100)}...</span>
                        </div>
                        <span className="text-sm bg-lex-gold text-lex-navyDark px-3 py-1 rounded-lg font-bold whitespace-nowrap ml-2">
                          {provision.section}
                        </span>
                      </div>
                    ))}
                  </div>
                  ) : (
                    <p className="text-gray-500 italic">{t.noSpecificProvisions || 'No specific legal provisions identified.'}</p>
                  )}
                </ResultCard>
                
              </div>
              
              {/* Precedents Card - Full width */}
              <div className="lg:col-span-2">
                <ResultCard title={t.precedents}>
                  {result.precedents && result.precedents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {result.precedents.map((precedent, i) => (
                        <PrecedentCard key={i} precedent={precedent} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">{t.noPrecedentsFound || 'No precedents found in our current database.'}</p>
                  )}
                </ResultCard>
              </div>

            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
