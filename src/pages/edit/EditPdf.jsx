import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  ArrowRight,
  Loader2,
  Upload
} from 'lucide-react';
import { api } from '../../services/api';

const EditPdf = () => {
  const { selectedFile, setProcessingStatus, setResult } = useFile();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔹 single file state (edit = one file)
  const [file, setFile] = useState(selectedFile || null);

  const fileInputRef = useRef(null);

  // 🔹 select file
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // =========================
  // 🔥 EDIT HANDLER (placeholder)
  // =========================
  const handleEdit = async () => {
    if (!file) {
      alert('Please select a PDF file to edit.');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('processing');

    try {
      /**
       * 🔥 BACKEND NOTE
       * yahan future me real editor call hoga:
       * const result = await api.editPdf(file);
       */

      // 🔹 abhi ke liye same file return (demo flow)
      const url = URL.createObjectURL(file);

      setResult({
        url,
        filename: file.name.replace('.pdf', '_edited.pdf'),
      });

      setProcessingStatus('complete');
      navigate('/download');

    } catch (error) {
      console.error(error);
      setProcessingStatus('error');
      alert('Edit failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Edit PDF
        </h1>

        <p className="text-gray-600 mb-12">
          Edit text, images, or pages inside your PDF file.
        </p>

        {/* 🔴 NO FILE */}
        {!file && (
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
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-full shadow-xl">
                <Upload size={42} className="text-white" />
              </div>

              <button
                type="button"
                className="
                  bg-yellow-500 hover:bg-yellow-600
                  text-white text-lg font-bold
                  px-8 py-4 rounded-xl
                  shadow-lg
                "
              >
                Select PDF File
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop PDF file here
              </p>
            </div>
          </div>
        )}

        {/* 🟢 FILE SELECTED */}
        {file && (
          <>
            <div className="mb-10">
              <FilePreview file={file} />
            </div>

            <button
              onClick={handleEdit}
              disabled={isProcessing}
              className="
                flex items-center justify-center gap-3
                bg-yellow-500 hover:bg-yellow-600
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
                  Opening Editor...
                </>
              ) : (
                <>
                  Edit PDF
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

export default EditPdf;
