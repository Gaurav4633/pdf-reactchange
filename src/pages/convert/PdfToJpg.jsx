import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  ArrowRight,
  Loader2,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { api } from '../../services/api';

const PdfToJpg = () => {
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
      alert('Please upload a PDF file first.');
      return;
    }

    setIsConverting(true);
    setProcessingStatus('processing');

    try {
      const result = await api.convert(selectedFile, 'jpg');
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
      <div className="max-w-2xl mx-auto text-center">

        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <ImageIcon size={36} className="text-orange-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">
            PDF to JPG
          </h1>
        </div>

        <p className="text-gray-600 mb-12 text-lg">
          Convert <span className="font-semibold text-orange-600">PDF pages</span>{' '}
          into high-quality JPG images.
        </p>

        {/* 🔴 NO FILE → HERO UPLOAD */}
        {!selectedFile && (
          <div
            className="
              bg-white rounded-3xl p-10
              shadow-2xl
              border-4 border-dashed border-orange-500
              hover:border-orange-600
              transition-all duration-300
              cursor-pointer
            "
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-full shadow-xl">
                <Upload size={42} className="text-white" />
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
                Select PDF File
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop a PDF here
              </p>
            </div>
          </div>
        )}

        {/* 🟢 FILE SELECTED */}
        {selectedFile && (
          <>
            <div className="mb-12 text-left">
              <FilePreview file={selectedFile} />
            </div>

            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="
                flex items-center justify-center gap-4
                bg-gradient-to-r from-orange-600 to-red-500
                hover:from-orange-700 hover:to-red-600
                text-white text-xl font-bold
                px-12 py-5 rounded-2xl
                shadow-2xl
                transition-all duration-300
                hover:scale-105
                disabled:opacity-70
                w-full sm:w-auto mx-auto
              "
            >
              {isConverting ? (
                <>
                  <Loader2 className="animate-spin" size={26} />
                  Converting to JPG...
                </>
              ) : (
                <>
                  Convert to JPG
                  <ArrowRight size={26} />
                </>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default PdfToJpg;
