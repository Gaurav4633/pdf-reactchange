import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext";
import { api } from "../../services/api";
import { Upload, Loader2, ArrowRight } from "lucide-react";

const SplitPdf = () => {
  const {
    selectedFile,
    setSelectedFile,
    setResult,
    setProcessingStatus,
  } = useFile();

  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState(""); // e.g. 1-3,5
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  /* ================= FILE HANDLER ================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  /* ================= SPLIT LOGIC ================= */
  const handleSplit = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file");
      return;
    }

    setIsProcessing(true);
    setProcessingStatus("processing");

    try {
      // 🔥 BACKEND RETURNS JSON (NOT BLOB)
      const response = await api.splitPdf(selectedFile, pages);

      const filenames = response?.data?.files;

      if (!filenames || filenames.length === 0) {
        throw new Error("No split files returned from server");
      }

      // 🔹 For now, download first split file
      const firstFile = filenames[0];

      setResult({
        url: `https://api.pdftools360.in/api/pdf/download/${filename}`, // ✅ FIXED
        filename: firstFile,
      });

      setProcessingStatus("complete");
      navigate("/download");

    } catch (error) {
      console.error("SPLIT PDF ERROR:", error);
      setProcessingStatus("error");
      alert("Split failed. Please try again.");
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
          Split PDF
        </h1>
        <p className="text-gray-600">
          Extract specific pages from your PDF file
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
              border-4 border-dashed border-brand-500
              hover:border-brand-600
              cursor-pointer
              transition
            "
          >
            <div className="flex flex-col items-center gap-6">
              <div className="bg-brand-600 p-6 rounded-full shadow-lg">
                <Upload size={40} className="text-white" />
              </div>

              <button
                type="button"
                className="bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg"
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
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

          <p className="font-semibold mb-2">Selected File:</p>
          <p className="text-gray-700 mb-6">{selectedFile.name}</p>

          {/* PAGE INPUT */}
          <label className="block font-semibold mb-2">
            Pages to extract
          </label>
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Example: 1-3 or 2,5"
            className="w-full border rounded-lg p-3 mb-8"
          />

          <button
            onClick={handleSplit}
            disabled={isProcessing}
            className="
              flex items-center justify-center gap-3
              bg-brand-600 hover:bg-brand-700
              text-white text-xl font-bold
              px-10 py-5 rounded-xl
              shadow-lg
              transition
              w-full
              disabled:opacity-70
            "
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" />
                Splitting PDF...
              </>
            ) : (
              <>
                Split PDF
                <ArrowRight />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SplitPdf;
