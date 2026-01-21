import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 via-gray-100 to-gray-200 border-t border-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-16">

        {/* 🔝 TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-14">

          {/* INTERNAL TOOLS */}
          <div>
            <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
              Internal Tools
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/merge" className="footer-link">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link to="/split" className="footer-link">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link to="/compress" className="footer-link">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link to="/rotate" className="footer-link">
                  Rotate PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* CONVERT TO PDF */}
          <div>
            <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
              Convert to PDF
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/convert/word-to-pdf" className="footer-link">
                  Word to PDF
                </Link>
              </li>
              <li>
                <Link to="/convert/excel-to-pdf" className="footer-link">
                  Excel to PDF
                </Link>
              </li>
              <li>
                <Link to="/convert/ppt-to-pdf" className="footer-link">
                  PPT to PDF
                </Link>
              </li>
              <li>
                <Link to="/convert/image-to-pdf" className="footer-link">
                  Image to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* CONVERT FROM PDF */}
          <div>
            <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
              Convert from PDF
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/convert/pdf-to-word" className="footer-link">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link to="/convert/pdf-to-excel" className="footer-link">
                  PDF to Excel
                </Link>
              </li>
              <li>
                <Link to="/convert/pdf-to-jpg" className="footer-link">
                  PDF to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-extrabold text-gray-900 mb-5 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="footer-link">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔻 BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700">
              DocTools
            </span>
            . All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link to="/privacy" className="footer-bottom-link">
              Privacy
            </Link>
            <Link to="/terms" className="footer-bottom-link">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
