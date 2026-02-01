import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  ArrowRight,
  Loader2,
  Plus,
  Upload,
  Image
} from 'lucide-react';
import { api } from '../../services/api';

const ImageToPdf = () => {
  const { selectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 multiple images state
  const [files, setFiles] = useState(
    selectedFile ? [selectedFile] : []
  );

  const fileInputRef = useRef(null);

  // 🔹 add images
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // =========================
  // 🔥 IMAGE → PDF HANDLER
  // =========================
  const handleConvert = async () => {
  if (files.length === 0) {
    alert("Please add at least 1 image.");
    return;
  }

  setIsProcessing(true);
  setProcessingStatus("processing");

  try {
    // 🔥 CALL BACKEND (JSON RESPONSE)
    const response = await api.imageToPdf(files);

    const filename = response.data.file;

    // 🔥 BUILD DOWNLOAD URL
    setResult({
     url: `http://api.pdftools360.in/api/pdf/download/${filename}`, // ✅ FIXED
    filename: filename,
    });

    setProcessingStatus("complete");
    navigate("/download");

  } catch (error) {
    console.error("IMAGE TO PDF ERROR:", error);
    setProcessingStatus("error");
    alert("Conversion failed. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Image to PDF
        </h1>

        <p className="text-gray-600 mb-12">
          Convert JPG, PNG or other images into a single PDF file.
        </p>

        {/* 🔴 NO FILES */}
        {files.length === 0 && (
          <div
            className="
              bg-white rounded-3xl p-10
              shadow-2xl
              border-4 border-dashed border-indigo-500
              hover:border-indigo-600
              transition-all duration-300
              cursor-pointer
            "
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 rounded-full shadow-xl">
                <Image size={42} className="text-white" />
              </div>

              <button
                type="button"
                className="
                  bg-indigo-500 hover:bg-indigo-600
                  text-white text-lg font-bold
                  px-8 py-4 rounded-xl
                  shadow-lg
                "
              >
                Select Images
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop images here
              </p>

              <p className="text-xs text-gray-400">
                Supported: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        )}

        {/* 🟢 FILES SELECTED */}
        {files.length > 0 && (
          <>
            <div className="mb-10 flex flex-col gap-4">
              {files.map((file, index) => (
                <FilePreview key={index} file={file} />
              ))}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="
                  border-2 border-dashed border-gray-300
                  rounded-xl p-4
                  flex items-center justify-center gap-2
                  text-gray-500
                  hover:text-indigo-600 hover:border-indigo-400
                  hover:bg-indigo-50
                  transition-colors
                "
              >
                <Plus size={24} />
                <span className="font-medium">Add more images</span>
              </button>

              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="
                flex items-center justify-center gap-3
                bg-indigo-500 hover:bg-indigo-600
                text-white text-xl font-bold
                px-10 py-5 rounded-xl
                shadow-xl transition-all
                hover:scale-105
                disabled:opacity-70
                w-full sm:w-auto mx-auto
              "
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Converting Images...
                </>
              ) : (
                <>
                  Convert to PDF
                  <ArrowRight size={24} />
                </>
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default ImageToPdf;
