import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Options from './pages/Options';
import Download from './pages/Download';
import Convert from "./pages/convert/Convert";

// Auth
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Tools
import PdfToJpg from './pages/convert/PdfToJpg';
import PdfToWord from './pages/convert/PdfToWord';
import WordToPdf from './pages/convert/WordToPdf';
import PdfToExcel from './pages/convert/PdfToExcel';
import PdfToPpt from './pages/convert/PdfToPpt';
import CompressPdf from './pages/compress/CompressPdf';
import MergePdf from './pages/merge/MergePdf';
import SplitPdf from './pages/split/SplitPdf';
import RotatePdf from './pages/rotate/RotatePdf';
import PptToPdf from './pages/convert/PptToPdf';
import ExcelToPdf from './pages/convert/ExcelToPdf';
import EditPdf from './pages/edit/EditPdf';
import ImageToPdf from './pages/convert/ImageToPdf';
import ConvertTools from './components/ConvertTools';
function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-white">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/converttools" element={<ConvertTools />} />
          <Route path="/download" element={<Download />} />
            <Route path="/convert" element={<Convert />} />
          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          
          {/* Tools */}
          <Route path="/convert/pdf-to-word" element={<PdfToWord />} />
          <Route path="/convert/word-to-pdf" element={<WordToPdf />} />
          <Route path="/convert/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/convert/pdf-to-ppt" element={<PdfToPpt />} />
          <Route path="/convert/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/compress" element={<CompressPdf />} />
          <Route path="/merge" element={<MergePdf />} />
          <Route path="/edit" element={<EditPdf />} />
          <Route path="/split" element={<SplitPdf />} />
          <Route path="/rotate" element={<RotatePdf />} />
          <Route path="/convert/ppt-to-pdf" element={<PptToPdf />} />
           <Route path="/convert/excel-to-pdf" element={<ExcelToPdf />} />
             <Route path="/convert/image-to-pdf" element={<ImageToPdf />} />


          {/* Catch all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
