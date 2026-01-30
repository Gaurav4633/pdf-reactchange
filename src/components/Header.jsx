import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import ToolsDropdown from './ToolsDropdown';
import { useFile } from '../context/FileContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resetFile } = useFile();
  const navigate = useNavigate();

  // 🔥 Convert click
  const handleConvertClick = () => {
    resetFile();
    navigate('/convert');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-brand-600"
        >
          <div className="bg-gradient-to-r from-brand-600 to-blue-600 text-white p-2 rounded-lg shadow-lg">
            <FileText size={22} />
          </div>
          <span className="tracking-wide">DocTools</span>
        </Link>

        {/* Desktop Navigation (LEFT SHIFTED) */}
        <nav className="hidden md:flex items-center gap-8 ml-12 mr-auto">
          <ToolsDropdown />

          <button
            onClick={handleConvertClick}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Convert
          </button>

          <Link to="/compress" className="text-gray-600 hover:text-gray-900 font-medium">
            Compress
          </Link>
          <Link to="/merge" className="text-gray-600 hover:text-gray-900 font-medium">
            Merge
          </Link>
          <Link to="/rotate" className="text-gray-600 hover:text-gray-900 font-medium">
            Rotate
          </Link>
          <Link to="/split" className="text-gray-600 hover:text-gray-900 font-medium">
            Split
          </Link>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </Link>
          <Link to="/project-details" className="text-purple-600 hover:text-purple-800 font-medium">
          ProjectDetail
        </Link>

        </nav>

        {/* ✅ AUTH BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth/login"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Log in
          </Link>

          <Link
            to="/auth/signup"
            className="
              bg-gradient-to-r from-brand-600 to-blue-600
              hover:from-brand-700 hover:to-blue-700
              text-white px-5 py-2 rounded-xl
              font-semibold shadow-md
            "
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden absolute left-0 w-full
          bg-white shadow-xl border-t border-gray-200
          transition-all duration-300 overflow-hidden
          ${isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col p-6 gap-5">

          <button
            onClick={handleConvertClick}
            className="text-left font-medium text-gray-700"
          >
            Convert
          </button>

          <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Home
          </Link>
          <Link to="/compress" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Compress PDF
          </Link>
          <Link to="/merge" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Merge PDF
          </Link>
          <Link to="/rotate" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Rotate PDF
          </Link>
          <Link to="/split" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Split PDF
          </Link>

          {/* ✅ AUTH (MOBILE) */}
          <div className="border-t pt-4 flex flex-col gap-3">
            <Link
              to="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-center font-medium text-gray-700"
            >
              Log in
            </Link>

            <Link
              to="/auth/signup"
              onClick={() => setIsMenuOpen(false)}
              className="
                text-center
                bg-gradient-to-r from-brand-600 to-blue-600
                text-white py-2 rounded-xl font-semibold
              "
            >
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
