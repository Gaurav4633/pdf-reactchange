import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext";
import { api } from "../../services/api";
import { Upload, Loader2, ArrowRight, Image } from "lucide-react";

const PdfToImage = () => {
  const {
    selectedFile,
    setSelectedFile,
    setResult,
    setProcessingStatus,
  } = useFile();

  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  /* ================= FILE HANDLER ================= */

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  /* ================= PDF → IMAGE ================= */

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    setProcessingStatus("processing");

    try {
      const response = await api.pdfToImage(selectedFile);

      const images = response.data.images; // 🔥 backend returns filenames array

      if (!images || images.length === 0) {
        throw new Error("No images returned from server");
      }

      // 👉 For now, download FIRST image
      const firstImage = images[0];

      setResult({
        url: `http://13.233.66.13:5000/api/pdf/download/${firstImage}`,
        filename: firstImage,
      });

      setProcessingStatus("complete");
      navigate("/download");

    } catch (error) {
      console.error("PDF TO IMAGE ERROR:", error);
      setProcessingStatus("error");
      alert("PDF to Image conversion failed");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mx-auto px-4 py-16">

      {/* ===== HERO ===== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          PDF to Image
        </h1>
        <p className="text-gray-600">
          Convert PDF pages into high-quality images
        </p>
      </div>

      {/* ===== BEFORE FILE SELECT ===== */}
      {!selectedFile && (
        <div className="max-w-2xl mx-auto text-center">
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="
              bg-white rounded-3xl p-12
              shadow-2xl
              border-4 border-dashed border-blue-500
              hover:border-blue-600
              cursor-pointer
              transition
            "
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-blue-600 p-6 rounded-full shadow-lg">
                <Image size={40} className="text-white" />
              </div>

              <button
                type="button"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                Select PDF File
              </button>

              <p className="text-gray-500 text-sm">
                Click to upload a PDF
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== AFTER FILE SELECT ===== */}
      {selectedFile && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
          <p className="font-semibold mb-4">Selected File</p>
          <p className="text-gray-700 mb-8">{selectedFile.name}</p>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="
              flex items-center justify-center gap-3
              bg-blue-600 hover:bg-blue-700
              text-white text-xl font-bold
              px-10 py-5 rounded-xl
              shadow-lg
              transition
              mx-auto
              disabled:opacity-70
            "
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" />
                Converting...
              </>
            ) : (
              <>
                Convert to Image
                <ArrowRight />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfToImage;
