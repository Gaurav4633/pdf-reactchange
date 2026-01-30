import { useNavigate } from 'react-router-dom';
import { useFile } from '../context/FileContext';
import { Upload, FileUp } from 'lucide-react';
import { useRef } from 'react';

const Hero = () => {
  const { setSelectedFile } = useFile();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      navigate('/options');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      navigate('/options');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white py-5 px-4">
      <div className="container mx-auto max-w-5xl  text-center">

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight">
          The complete solution for 
          <span className="text-brand-400"> working with PDFs made simple</span>
       
        </h1>

        <p className="text-sm md:text-sm text-gray-300 mb-14 max-w-3xl mx-auto">
          100% FREE, fast, and easy tools to merge, split, compress, convert,
          rotate, unlock, and watermark PDFs — in just a few clicks.
        </p>

        {/* Upload Card */}
        <div
          className="
            bg-white rounded-3xl
             p-10 md:p-14
             shadow-2xl
            w-full max-w-[700px]   /* 👈 width set */
            h-[340px]          /* 👈 height set */
            mx-auto
             border-4 border-dashed border-brand-500
             hover:border-brand-600
             transition-all duration-300
             cursor-pointer
            hover:scale-[1.02]
          "
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center gap-6">

            {/* Icon */}
            <div className="bg-gradient-to-r from-brand-600 to-blue-600 p-6 rounded-full shadow-xl">
              <Upload size={48} className="text-white" />
            </div>

            {/* Button */}
            <button
              type="button"
              className="
                flex items-center gap-2
                bg-brand-600 hover:bg-brand-700
                text-white text-xl font-bold
                px-10 py-4 rounded-2xl
                shadow-xl transition-all
                hover:scale-105
              "
            >
              <FileUp size={22} />
              Select  File
            </button>

            <p className="text-gray-400 text-sm">
              or <span className="font-semibold">drag & drop</span> your file here
            </p>

            <p className="text-xs text-gray-400">
              Supported formats: PDF, DOCX, XLSX, PPTX
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
