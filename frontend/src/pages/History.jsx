import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HistoryTable from '../components/HistoryTable';
import api from '../utils/api';
import translations from '../utils/translations';
import { Loader2 } from 'lucide-react';

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const t = translations["English"];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/api/history');
      setHistory(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || t.failedLoadHistory || 'Failed to load history.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">{t.history}</h1>
          <p className="text-gray-600">{t.pastAnalyses || 'Past case analyses'}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-[#1e3a5f]" size={48} />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200">
            {error}
          </div>
        ) : (
          <HistoryTable history={history} />
        )}
      </main>
    </div>
  );
};

export default History;
