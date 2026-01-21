import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFile } from "../../context/FileContext";
import FilePreview from "../../components/FilePreview";
import { ArrowRight, Loader2, FileType, Upload } from "lucide-react";
import { api } from "../../services/api";

const WordToPdf = () => {
  const { selectedFile, setSelectedFile, setProcessingStatus, setResult } =
    useFile();
  const navigate = useNavigate();
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);

  /* ================= FILE HANDLERS ================= */

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* ================= CONVERT FUNCTION ================= */

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select a Word file first");
      return;
    }

    setIsConverting(true);
    setProcessingStatus("processing");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post(
        "/api/convert/word-to-pdf",
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);

      setResult({
        url,
        name: selectedFile.name.replace(/\.(doc|docx)$/i, ".pdf"),
      });

      setProcessingStatus("complete");
      navigate("/download");
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
      setProcessingStatus("error");
    } finally {
      setIsConverting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileType size={36} className="text-purple-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">
            Word to PDF
          </h1>
        </div>

        <p className="text-gray-600 mb-12 text-lg">
          Convert{" "}
          <span className="font-semibold text-purple-600">DOC / DOCX</span>{" "}
          files into high-quality PDFs easily.
        </p>

        {/* ================= NO FILE ================= */}
        {!selectedFile && (
          <div
            className="
              bg-white rounded-3xl p-10
              shadow-2xl
              border-4 border-dashed border-purple-500
              hover:border-purple-600
              transition-all duration-300
              text-center
            "
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept=".doc,.docx"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-6">
              <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-6 rounded-full shadow-xl">
                <Upload size={42} className="text-white" />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="
                  bg-purple-600 hover:bg-purple-700
                  text-white text-lg font-bold
                  px-8 py-4 rounded-xl
                  shadow-lg
                "
              >
                Select Word File
              </button>

              <p className="text-gray-500 text-sm">
                or drag & drop DOC / DOCX here
              </p>
            </div>
          </div>
        )}

        {/* ================= FILE SELECTED ================= */}
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
                bg-gradient-to-r from-purple-600 to-fuchsia-500
                hover:from-purple-700 hover:to-fuchsia-600
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
                  Converting to PDF...
                </>
              ) : (
                <>
                  Convert to PDF
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

export default WordToPdf;
