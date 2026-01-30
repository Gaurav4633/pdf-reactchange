import { useNavigate, useLocation } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  FileText,
  FileSpreadsheet,
  Image,
  FileType,
  Upload,
  Presentation
} from 'lucide-react';
import { useRef, useEffect } from 'react';

const Convert = () => {
  const { selectedFile, setSelectedFile } = useFile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);




  // File handlers
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setSelectedFile(file);

  // 🔥 FORCE redirect to Convert page
  navigate("/convert");
};


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Convert options
  const convertOptions = [
    {
      title: 'PDF to Word',
      icon: FileText,
      color: 'from-blue-600 to-cyan-500',
      path: '/convert/pdf-to-word'
    },
    {
      title: 'Word to PDF',
      icon: FileType,
      color: 'from-purple-600 to-fuchsia-500',
      path: '/convert/word-to-pdf'
    },
    {
      title: 'PDF to Excel',
      icon: FileSpreadsheet,
      color: 'from-green-600 to-emerald-500',
      path: '/convert/pdf-to-excel'
    },
     {
      title: 'Excel to PDF',
      icon: FileSpreadsheet,
      color: 'from-red-600 to-rose-500',
      path: '/convert/excel-to-pdf'
    },
    {
      title: 'PDF to Image',
      icon: Image,
      color: 'from-orange-500 to-red-500',
      path: '/convert/pdf-to-jpg'
    },
    {
      title: 'PPT to PDF',
      icon: Presentation,
      color: 'from-orange-600 to-amber-500',
      path: '/convert/ppt-to-pdf'
    }
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Convert your file
          </h1>
          <p className="text-gray-600">
            Fast, secure and high-quality file conversion
          </p>
        </div>

        {/* NO FILE SELECTED */}
        {!selectedFile && (
          <div className="max-w-2xl mx-auto">
            <div
              className="
                bg-white/70 backdrop-blur-xl
                rounded-3xl p-14
                h-[350px]
                w-[700px]
                border-2 border-dashed border-brand-400
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                cursor-pointer
                text-center
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
                hover:border-brand-500
                transition-all duration-300
              "
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
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
                  className="
                    bg-brand-600 hover:bg-brand-700
                    text-white text-lg font-bold
                    px-10 py-4 rounded-xl
                    shadow-lg transition-transform
                    hover:scale-105
                  "
                >
                  Select File
                </button>

                <p className="text-gray-500 text-sm">
                  or drag & drop your file here
                </p>

                <p className="text-xs text-gray-400">
                  Supported: PDF, DOCX, XLSX, PPTX
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FILE SELECTED */}
        {selectedFile && (
          <>
            <p className="text-center text-gray-600 mb-10 text-lg">
              Choose the format you want to convert your file into
            </p>

            <div className="mb-14">
              <FilePreview file={selectedFile} />
            </div>

            {/* CONVERT OPTIONS – SIMPLE & ATTRACTIVE */}
            <div className="flex gap-6 overflow-x-auto pb-4 px-2">
              {convertOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(option.path)}
                    className="
                      min-w-[160px]
                      bg-white
                      rounded-xl
                      border border-gray-200
                      px-6 py-6
                      flex flex-col items-center gap-4
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      hover:border-brand-500
                    "
                  >
                    <div
                      className={`
                        w-14 h-14
                        flex items-center justify-center
                        rounded-full
                        bg-gradient-to-r ${option.color}
                        text-white
                        shadow-md
                      `}
                    >
                      <Icon size={24} />
                    </div>

                    <span className="text-sm font-semibold text-gray-800 text-center">
                      {option.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Convert;
