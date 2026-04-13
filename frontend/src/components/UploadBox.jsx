import React, { useCallback, useState } from 'react';
import { UploadCloud, File } from 'lucide-react';

const UploadBox = ({ onFileSelect, translations, language }) => {
  const t = translations[language] || translations["English"];
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      onFileSelect(file);
    } else {
      setSelectedFile(null);
      setErrorMsg('Please select a valid PDF file.');
      onFileSelect(null);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#c9a84c] bg-[#fdfaf2]' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <UploadCloud size={48} className={`mb-4 ${isDragActive ? 'text-[#c9a84c]' : 'text-[#1e3a5f]'}`} />
          <p className="text-lg font-medium text-gray-700 mb-2">{t.upload}</p>
          <p className="text-sm text-gray-500">{t.dragdrop}</p>
        </div>
        <input 
          id="file-upload" 
          type="file" 
          accept=".pdf" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm mt-2 font-medium">{errorMsg}</p>
      )}

      {selectedFile && !errorMsg && (
        <div className="mt-4 p-3 bg-[#f0f4f8] rounded-md flex items-center border border-[#1e3a5f]/20">
          <File className="text-[#1e3a5f] mr-3" size={24} />
          <div>
            <p className="text-sm font-semibold text-[#1e3a5f]">{t.selectFileMessage}</p>
            <p className="text-sm text-gray-700">{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
