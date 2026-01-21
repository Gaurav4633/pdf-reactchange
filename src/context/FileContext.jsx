import { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle'); // idle, processing, complete, error
  const [result, setResult] = useState(null);

  const resetFile = () => {
    setSelectedFile(null);
    setProcessingStatus('idle');
    setResult(null);
  };

  return (
    <FileContext.Provider value={{
      selectedFile,
      setSelectedFile,
      processingStatus,
      setProcessingStatus,
      result,
      setResult,
      resetFile
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};
