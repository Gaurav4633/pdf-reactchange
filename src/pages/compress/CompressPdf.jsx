
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useFile } from "../../context/FileContext";
import { api } from "../../services/api";
import { Upload, Loader2, ArrowRight } from "lucide-react";


const CompressPdf = () => {
  const {
    selectedFile,
    setSelectedFile,
    setResult,
    setProcessingStatus, // ✅ FIX: missing before
  } = useFile();

  const [isProcessing, setIsProcessing] = useState(false);
  const [compressLevel, setCompressLevel] = useState("medium"); // UI only
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  // Jab bhi /compress page open ho
  setSelectedFile(null);
  setResult(null);                // optional but recommended
  setProcessingStatus(null);      // optional but recommended
}, [location.pathname]);


  /* ================= FILE HANDLER ================= */

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  /* ================= COMPRESS LOGIC (FIXED) ================= */

  const handleCompress = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    setProcessingStatus("processing");

    try {
      // 🔥 backend JSON return karta hai
      const response = await api.compressPdf(selectedFile);

      const filename = response.data.file;

      setResult({
        url: `http://localhost:5003/api/pdf/download/${filename}`,
        filename: filename,
      });

      setProcessingStatus("complete");
      navigate("/download");

    } catch (error) {
      console.error("COMPRESS PDF ERROR:", error);
      setProcessingStatus("error");
      alert("Compression failed");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="container mx-auto px-4 py-16">

      {/* ===== HERO ===== */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Compress PDF
        </h1>
        <p className="text-gray-600">
          Reduce PDF size easily without losing quality
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
              border-4 border-dashed border-purple-500
              hover:border-purple-600
              cursor-pointer
              transition
            "
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-purple-600 p-6 rounded-full shadow-lg">
                <Upload size={40} className="text-white" />
              </div>

              <button
                type="button"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                Select PDF File
              </button>

              <p className="text-gray-500 text-sm">
                Click to upload your PDF
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== AFTER FILE SELECT ===== */}
      {selectedFile && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h2 className="text-lg font-bold mb-4">
              Compression Size
            </h2>

            <div className="space-y-4 text-left">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={compressLevel === "low"}
                  onChange={() => setCompressLevel("low")}
                />
                <div>
                  <p className="font-semibold">Low</p>
                  <p className="text-sm text-gray-500">
                    Best quality, larger file
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={compressLevel === "medium"}
                  onChange={() => setCompressLevel("medium")}
                />
                <div>
                  <p className="font-semibold">Medium (Recommended)</p>
                  <p className="text-sm text-gray-500">
                    Balanced quality & size
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={compressLevel === "high"}
                  onChange={() => setCompressLevel("high")}
                />
                <div>
                  <p className="font-semibold">High</p>
                  <p className="text-sm text-gray-500">
                    Smallest size
                  </p>
                </div>
              </label>
            </div>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 text-center">
            <p className="text-lg font-semibold mb-6">
              Selected File:
            </p>

            <p className="text-gray-700 mb-8">
              {selectedFile.name}
            </p>

            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="
                flex items-center justify-center gap-3
                bg-green-600 hover:bg-green-700
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
                  Compressing...
                </>
              ) : (
                <>
                  Compress PDF
                  <ArrowRight />
                </>
              )}
            </button>
          </main>
        </div>
      )}
    </div>
  );
};

export default CompressPdf;
