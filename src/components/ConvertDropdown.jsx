

import { Link } from 'react-router-dom';
import {
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image
} from 'lucide-react';

const ConvertDropdown = () => {
  return (
    <div className="relative group">

      {/* Button */}
      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-semibold py-2">
        Convert To
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
          w-80
        "
      >
        <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">
          Convert To
        </p>

        {/* PDF */}
        <Link
          to="/convert/to-pdf"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-50 transition"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white">
            <FileText size={18} />
          </div>
          <span className="text-sm font-medium text-gray-800">
            Convert to PDF
          </span>
        </Link>

        {/* Excel */}
        <Link
          to="/convert/to-excel"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-green-50 transition"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white">
            <FileSpreadsheet size={18} />
          </div>
          <span className="text-sm font-medium text-gray-800">
            Convert to Excel
          </span>
        </Link>

        {/* PPT */}
        <Link
          to="/convert/to-ppt"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 transition"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white">
            <Presentation size={18} />
          </div>
          <span className="text-sm font-medium text-gray-800">
            Convert to PPT
          </span>
        </Link>

        {/* Image */}
        <Link
          to="/convert/to-image"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-indigo-50 transition"
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
            <Image size={18} />
          </div>
          <span className="text-sm font-medium text-gray-800">
            Convert to Image
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ConvertDropdown;
