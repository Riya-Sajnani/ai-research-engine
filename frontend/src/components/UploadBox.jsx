import React, { useCallback, useState } from 'react';
import { UploadCloud, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import translations from '../utils/translations';

const UploadBox = ({ onFileSelect }) => {
  const t = translations["English"];
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const clearSelection = () => {
    setSelectedFile(null);
    setErrorMsg('');
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <motion.div
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
            <h3 className="text-xl font-bold mb-1 truncate w-full">{selectedFile.name}</h3>
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
