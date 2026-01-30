import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const location = useLocation();

  const resetFile = () => {
    setSelectedFile(null);
    setProcessingStatus('idle');
    setResult(null);
  };

  // page ka flow kha page open hoga
useEffect(() => {
  // Pages where file SHOULD stay
  const allowedPaths = [
    "/convert",
    "/convert/pdf-to-word",
    "/convert/word-to-pdf",
    "/convert/pdf-to-excel",
    "/convert/excel-to-pdf",
    "/convert/pdf-to-jpg",
    "/convert/ppt-to-pdf",
    "/download", 
  ];

 
  if (
    location.pathname === "/" &&
    !location.state?.fromFileSelect
  ) {
    resetFile();
  }
}, [location.pathname]);


  return (
    <FileContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        processingStatus,
        setProcessingStatus,
        result,
        setResult,
        resetFile
      }}
    >
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
