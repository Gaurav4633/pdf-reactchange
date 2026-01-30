import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import { ArrowRight, Loader2, Plus, Upload } from 'lucide-react';
import { api } from '../../services/api';

const MergePdf = () => {
  const { selectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 multiple files state
  const [files, setFiles] = useState(
    selectedFile ? [selectedFile] : []
  );

  const fileInputRef = useRef(null);

  // 🔹 add files
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
  // 🔥 FINAL MERGE HANDLER
  // =========================
  const handleMerge = async () => {
  if (files.length < 2) {
    alert("Please select at least 2 PDF files");
    return;
  }

  setIsProcessing(true);
  setProcessingStatus("processing");

  try {
    const response = await api.mergePdf(files);

    const filename = response.data.file;

    setResult({
      url: `http://13.233.66.13:5000/api/pdf/download/${filename}`,
      filename: filename,
    });

    setProcessingStatus("complete");
    navigate("/download");

  } catch (error) {
    console.error("MERGE PDF ERROR:", error);
    setProcessingStatus("error");
    alert("Merge failed");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Merge PDF
        </h1>
        <p className="text-gray-600 mb-12">
          Combine multiple PDFs into one file in the order you want.
        </p>

        {/* 🔴 NO FILES */}
        {files.length === 0 && (
          <div
            className="
              bg-white rounded-3xl p-10
              shadow-2xl
              border-4 border-dashed border-brand-500
              hover:border-brand-600
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
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-brand-600 to-blue-600 p-6 rounded-full shadow-xl">
                <Upload size={42} className="text-white" />
              </div>

              <button
                type="button"
                className="bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg"
              >
                Select PDF Files
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop PDF files here
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
                  hover:text-brand-600 hover:border-brand-400
                  hover:bg-brand-50
                  transition-colors
                "
              >
                <Plus size={24} />
                <span className="font-medium">Add more PDFs</span>
              </button>

              <input
                type="file"
                multiple
                accept="application/pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleMerge}
              disabled={isProcessing}
              className="
                flex items-center justify-center gap-3
                bg-brand-600 hover:bg-brand-700
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
                  Merging PDFs...
                </>
              ) : (
                <>
                  Merge PDF
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

export default MergePdf;
