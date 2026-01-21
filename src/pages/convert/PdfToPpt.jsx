import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import { ArrowRight, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

const PdfToPpt = () => {
  const { selectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      navigate('/');
    }
  }, [selectedFile, navigate]);

  const handleConvert = async () => {
    setIsConverting(true);
    setProcessingStatus('processing');
    
    try {
      const result = await api.convert(selectedFile, 'ppt');
      setResult(result);
      setProcessingStatus('complete');
      navigate('/download');
    } catch (error) {
      console.error(error);
      setProcessingStatus('error');
      alert('Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  if (!selectedFile) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PDF to PowerPoint</h1>
        <p className="text-gray-600 mb-10">
          Turn your PDF files into easy to edit PPT and PPTX slideshows.
        </p>
        
        <div className="mb-10 text-left">
          <FilePreview file={selectedFile} />
        </div>

        <button 
          onClick={handleConvert}
          disabled={isConverting}
          className="flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white text-xl font-bold px-10 py-5 rounded-xl shadow-xl transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto mx-auto"
        >
          {isConverting ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Converting...
            </>
          ) : (
            <>
              Convert to PPT
              <ArrowRight size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PdfToPpt;
