import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  ArrowRight,
  Loader2,
  Upload,
  Presentation
} from 'lucide-react';
import { api } from '../../services/api';

const PptToPdf = () => {
  const { selectedFile, setSelectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);

  // 🔹 file handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleConvert = async () => {
    if (!selectedFile) {
      alert('Please upload a PPT or PPTX file first.');
      return;
    }

    setIsConverting(true);
    setProcessingStatus('processing');

    try {
      const result = await api.convert(selectedFile, 'pdf');
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          PPT to PDF
        </h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Convert PowerPoint presentations into high-quality PDFs.
        </p>

        {/* 🔴 NO FILE → HERO UPLOAD */}
        {!selectedFile && (
          <div
            className="
              max-w-xl mx-auto
              bg-white rounded-3xl p-10
              shadow-2xl
              border-4 border-dashed border-orange-500
              hover:border-orange-600
              transition-all duration-300
              cursor-pointer
              text-center
            "
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept=".ppt,.pptx"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-full shadow-xl">
                <Presentation size={42} className="text-white" />
              </div>

              <button
                type="button"
                className="
                  bg-orange-600 hover:bg-orange-700
                  text-white text-lg font-bold
                  px-8 py-4 rounded-xl
                  shadow-lg
                "
              >
                Select PPT / PPTX File
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop a PowerPoint file here
              </p>
            </div>
          </div>
        )}

        {/* 🟢 FILE SELECTED */}
        {selectedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* File Preview */}
            <div>
              <FilePreview file={selectedFile} />
            </div>

            {/* Convert Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="
                  w-full
                  flex items-center justify-center gap-3
                  bg-gradient-to-r from-orange-600 to-red-500
                  hover:from-orange-700 hover:to-red-600
                  text-white text-xl font-bold
                  py-5 px-6 rounded-2xl
                  shadow-2xl transition-all
                  hover:scale-105
                  disabled:opacity-70
                "
              >
                {isConverting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Converting to PDF...
                  </>
                ) : (
                  <>
                    Convert to PDF
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PptToPdf;
