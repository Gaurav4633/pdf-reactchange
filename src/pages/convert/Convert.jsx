import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  FileText,
  FileSpreadsheet,
  Image,
  FileType,
  Upload
} from 'lucide-react';
import { useRef } from 'react';

const Convert = () => {
  const { selectedFile, setSelectedFile } = useFile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 🔹 File handlers (Hero style)
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

  const convertOptions = [
    {
      title: 'PDF to Word',
      icon: FileText,
      color: 'from-blue-600 to-cyan-500',
      path: '/convert/pdf-to-word'
    },
    {
      title: 'PDF to Excel',
      icon: FileSpreadsheet,
      color: 'from-green-600 to-emerald-500',
      path: '/convert/pdf-to-excel'
    },
    {
      title: 'PDF to JPG',
      icon: Image,
      color: 'from-orange-500 to-red-500',
      path: '/convert/pdf-to-jpg'
    },
    {
      title: 'Word to PDF',
      icon: FileType,
      color: 'from-purple-600 to-fuchsia-500',
      path: '/convert/word-to-pdf'
    }
  ];

return (
  <div className="
    min-h-screen
    bg-gradient-to-br from-indigo-50 via-white to-cyan-50
    px-4 py-20
  ">
    <div className="max-w-3xl mx-auto">

      {/* 🌟 HERO HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Convert your file
        </h1>
        <p className="text-gray-600 text-lg">
          Fast, secure and high-quality file conversion
        </p>
      </div>

      {/* 🔴 NO FILE SELECTED */}
      {!selectedFile && (
        <div className="max-w-3xl mx-auto">
          <div
            className="
              relative
              bg-white/80 backdrop-blur-xl
              rounded-3xl p-12
              border-3 border-dashed border-blue-500
              shadow-[0_30px_80px_rgba(0,0,0,0.08)]
              border border-blue-200
              cursor-pointer
              text-center
              hover:shadow-[0_40px_100px_rgba(0,0,0,0.12)]
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
              <div className="bg-gradient-to-r from-brand-600 to-blue-600 p-6 rounded-full shadow-2xl">
                <Upload size={44} className="text-white" />
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

      {/* 🟢 FILE SELECTED */}
      {selectedFile && (
        <>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose the format you want to convert your file into
          </p>

          <div className="mb-16">
            <FilePreview file={selectedFile} />
          </div>

          {/* 🔹 CONVERT OPTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {convertOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(option.path)}
                  className="
                    relative
                    bg-white/90 backdrop-blur
                    rounded-2xl p-8
                    border border-gray-200
                    shadow-lg
                    transition-all duration-300
                    hover:-translate-y-3 hover:shadow-2xl
                    text-center
                  "
                >
                  <div
                    className={`
                      w-18 h-18 mx-auto mb-5
                      flex items-center justify-center
                      rounded-2xl text-white
                      bg-gradient-to-r ${option.color}
                      shadow-xl
                    `}
                  >
                    <Icon size={34} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {option.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </>
      )}

    </div>
  </div>
);}


export default Convert;
