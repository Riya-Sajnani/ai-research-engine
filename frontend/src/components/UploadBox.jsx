import React, { useCallback, useState } from 'react';
import { UploadCloud, Link, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import translations from '../utils/translations';

const UploadBox = ({ onFileSelect, onUrlSubmit }) => {
  const t = translations["English"];
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'link'
  const [errorMsg, setErrorMsg] = useState('');

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      setSelectedFile(null);
      setErrorMsg(t.validPdfError || 'Please select a valid PDF file.');
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url);
    } else {
      setErrorMsg(t.validUrlError || 'Please enter a valid URL.');
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setUrl('');
    setErrorMsg('');
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
        <button
          onClick={() => { setActiveTab('upload'); clearSelection(); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'upload' ? 'bg-lex-gold text-lex-navyDark shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <UploadCloud size={16} />
          <span>{t.upload || 'Upload PDF'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('link'); clearSelection(); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'link' ? 'bg-lex-gold text-lex-navyDark shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Link size={16} />
          <span>{t.pasteLink || 'Paste Link'}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'upload' ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative group border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-lex-gold bg-lex-gold/5 shadow-glass' : 'border-white/20 hover:border-lex-gold/50 bg-white/5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !selectedFile && document.getElementById('file-upload').click()}
          >
            <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            
            {!selectedFile ? (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-lex-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} className="text-lex-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.dropFileHere || 'Drop your case file here'}</h3>
                <p className="text-gray-400 text-sm">{t.supportDocuments || 'Support documents up to 50MB (.pdf only)'}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 scale-110">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{selectedFile.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {t.readyForAnalysis || 'Ready for analysis'}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
                >
                  <X size={14} />
                  <span>{t.removeFile || 'Remove File'}</span>
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="link"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-morphism p-8 rounded-2xl border-white/20"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-lex-gold/10 p-2 rounded-lg">
                  <Link size={20} className="text-lex-gold" />
                </div>
                <h3 className="text-lg font-bold">{t.researchFromURL || 'Research from URL'}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{t.pasteLinkDescription || 'Paste a direct link to a PDF or a legal repository (e.g., Indian Kanoon, SCC Online).'}</p>
              
              <div className="relative">
                <input
                  type="url"
                  placeholder={t.urlPlaceholder || 'https://example.com/case-file.pdf'}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 focus:outline-none focus:border-lex-gold transition-all"
                />
                {url && (
                  <button 
                    onClick={clearSelection}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {errorMsg && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-sm mt-3 font-medium flex items-center"
        >
          <X size={14} className="mr-1" />
          {errorMsg}
        </motion.p>
      )}
    </div>
  );
};

export default UploadBox;
