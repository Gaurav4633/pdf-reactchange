import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  ArrowRight,
  Loader2,
  Plus,
  Upload,
  RotateCw
} from 'lucide-react';
import { api } from '../../services/api';

const RotatePdf = () => {
  const { selectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 files state
  const [files, setFiles] = useState(
    selectedFile ? [selectedFile] : []
  );

  const [rotation, setRotation] = useState(90);
  const fileInputRef = useRef(null);

  // 🔹 file select
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  // 🔹 drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // =========================
  // 🔁 ROTATE HANDLER (FIXED)
  // =========================
 const handleRotate = async () => {
  if (files.length === 0) {
    alert("Please select a PDF file");
    return;
  }

  setIsProcessing(true);
  setProcessingStatus("processing");

  try {
    // 🔥 use FIRST selected file
    const response = await api.rotatePdf(files[0], rotation);

    const filename = response.data.file;

    setResult({
     url: `http://api.pdftools360.in/api/pdf/download/${filename}`, // ✅ FIXED
      filename: filename,
    });

    setProcessingStatus("complete");
    navigate("/download");

  } catch (error) {
    console.error("ROTATE PDF ERROR:", error);
    setProcessingStatus("error");
    alert("Rotate failed");
  } finally {
    setIsProcessing(false);
  }
};



  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Rotate PDF
        </h1>

        <p className="text-gray-600 mb-12">
          Rotate PDF pages clockwise or anticlockwise easily.
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
                Select PDF File
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop a PDF here
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
                accept="application/pdf"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* 🔁 ROTATION OPTIONS */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Rotation Options
              </h3>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setRotation(90)}
                  className="flex-1 py-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
                >
                  <RotateCw size={22} />
                  90°
                </button>

                <button
                  onClick={() => setRotation(180)}
                  className="flex-1 py-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
                >
                  <RotateCw size={22} />
                  180°
                </button>

                <button
                  onClick={() => setRotation(270)}
                  className="flex-1 py-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
                >
                  <RotateCw size={22} />
                  270°
                </button>
              </div>

              <button
                onClick={handleRotate}
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
                    Rotating PDF...
                  </>
                ) : (
                  <>
                    Rotate PDF
                    <ArrowRight size={24} />
                  </>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default RotatePdf;
