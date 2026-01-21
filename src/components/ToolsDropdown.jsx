import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Files,
  Scissors,
  Minimize2,
  FileText,
  FileSpreadsheet,
  FileType,
  FileImage,
  RotateCw,
  Image,
  Presentation
} from 'lucide-react';

const ToolsDropdown = () => {
  return (
    <div className="relative group">

      {/* Button */}
      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-semibold py-2">
        Tools
        <ChevronDown
          size={16}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      {/* Dropdown */}
      <div
        className="
          absolute top-full left-0 mt-2
          bg-white/95 backdrop-blur-md
          shadow-2xl rounded-xl
          border border-gray-100
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
          transform translate-y-2 group-hover:translate-y-0
          z-50 p-3
        "
      >
        {/* ⬇️ HORIZONTAL LAYOUT */}
        <div className="flex gap-4">

          {/* ================= PDF TOOLS BOX ================= */}
          <div className="w-72 border border-gray-100 rounded-xl p-2">
            <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">
              PDF Tools
            </p>

            <Link to="/merge" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <Files size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Merge PDF</span>
            </Link>

            <Link to="/split" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-pink-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <Scissors size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Split PDF</span>
            </Link>

            <Link to="/compress" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Minimize2 size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Compress PDF</span>
            </Link>

            <Link to="/rotate" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-teal-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
                <RotateCw size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Rotate PDF</span>
            </Link>
          </div>

          {/* ================= CONVERT TOOLS BOX ================= */}
          <div className="w-72 border border-gray-100 rounded-xl p-2">
            <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">
              Convert Tools
            </p>

            <Link to="/convert/pdf-to-word" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <FileText size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">PDF to Word</span>
            </Link>

            <Link to="/convert/pdf-to-excel" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-green-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white">
                <FileSpreadsheet size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">PDF to Excel</span>
            </Link>

            <Link to="/convert/word-to-pdf" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-purple-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white">
                <FileType size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Word to PDF</span>
            </Link>

            <Link to="/convert/excel-to-pdf" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-emerald-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 text-white">
                <FileSpreadsheet size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Excel to PDF</span>
            </Link>

            <Link to="/convert/ppt-to-pdf" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                <Presentation size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">PPT to PDF</span>
            </Link>

            <Link to="/convert/ppt-to-word" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-yellow-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-600 to-orange-500 text-white">
                <Presentation size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">PPT to Word</span>
            </Link>

            <Link to="/convert/pdf-to-jpg" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white">
                <FileImage size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">PDF to JPG</span>
            </Link>

            <Link to="/convert/image-to-pdf" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50 transition">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <Image size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">Image to PDF</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToolsDropdown;
