import { Link } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import ToolsDropdown from './ToolsDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <ToolsDropdown />

          {[
            { label: 'Compress', to: '/compress' },
            { label: 'Convert', to: '/convert' },/*addymr pdf-to-word */
            { label: 'Merge', to: '/merge' },
             { label: 'Rotate', to: '/rotate' },
            { label: 'Home', to: '/'},
           
          ].map((item) => (
    <Link
    key={item.label}
    to={item.to}
    className={`relative font-medium transition
      ${item.label === 'Home'
        ? 'text-blue-600 hover:text-blue-800'
        : 'text-gray-600 hover:text-gray-900'
      }
    `}
  >
    {item.label}  
  </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth/login"
            className="text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Log in
          </Link>

          <Link
            to="/auth/signup"
            className="
              bg-gradient-to-r from-brand-600 to-blue-600
              hover:from-brand-700 hover:to-blue-700
              text-white px-5 py-2 rounded-xl
              font-semibold shadow-lg
              transition-all hover:scale-105
            "
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700"
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
          ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col p-6 gap-5">
        {/*addbyme */}
 
<Link to="/convert" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700"> 
     convert
</Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Home
          </Link>
          <Link to="/compress" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Compress PDF
          </Link>
          <Link to="/convert/pdf-to-word" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            PDF to Word
          </Link>
          <Link to="/merge" onClick={() => setIsMenuOpen(false)} className="font-medium text-gray-700">
            Merge PDF
          </Link>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
            <Link
              to="/auth/login"
              className="text-center font-medium text-gray-700"
            >
              Log in
            </Link>
            <Link
              to="/auth/signup"
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
