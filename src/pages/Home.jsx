import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { useNavigate } from "react-router-dom";
import { FileImage } from "lucide-react";

import {
  FileText,
  Files,
  Scissors,
  Minimize2,
  RefreshCcw,
  FileType,
  FileSpreadsheet,
  Image,
  Image as ImageIcon
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate(); // ✅ ADD THIS

  const tools = [

     {
      title: "PDF to Word",
      description: "Convert your PDF to WORD documents with incredible accuracy.",
      icon: FileText,
      color: "from-blue-600 to-cyan-500",
      to: "/convert/pdf-to-word"
    },
     {
  title: "PDF to Excel",
  description: "Extract tables and data from PDF files into editable Excel sheets.",
  icon: FileSpreadsheet,
  color: "from-blue-500 to-green-500",
  to: "/convert/pdf-to-excel"
},
    {
      title: "Word to PDF",
      description: "Make DOC and DOCX files easy to read by converting them to PDF.",
      icon: FileType,
      color: "from-purple-600 to-fuchsia-500",
      to: "/convert/word-to-pdf"
    },
     {
      title: "PPT to PDF",
      description: "Convert your PPT pages into PDF Properly",
      icon: ImageIcon,
      color: "from-orange-500 to-yellow-500",
      to: "/convert/Ppt-to-pdf"
    },
   
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one unified document.",
      icon: Files,
      color: "from-indigo-500 to-blue-500",
      to: "/merge"
    },
    {
      title: "Split PDF",
      description: "Extract pages from your PDF or save each page as a separate PDF.",
      icon: Scissors,
      color: "from-pink-500 to-rose-500",
      to: "/split"
    },
    {
      title: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      icon: Minimize2,
      color: "from-yellow-500 to-orange-500",
      to: "/compress"
    },
    
  
    
    {
  title: "Excel to PDF",
  description: "Convert Excel spreadsheets into a clean and printable PDF file.",
  icon: FileSpreadsheet,
  color: "from-green-500 to-emerald-500",
  to: "/convert/excel-to-pdf"
},

    
    {
      title: "Rotate PDF",
      description: "Rotate your PDF pages properly.",
      icon: RefreshCcw,
      color: "from-teal-500 to-cyan-500",
      to: "/rotate"
    },
    
    {
  title: "Edit PDF",
  description: "Edit text, images, or pages in your PDF file easily and securely.",
  icon: FileText,
  color: "from-yellow-500 to-orange-500",
  to: "/edit"
},
   {
      title: "PDF to Image",
      description: "Extract images from your PDF or save each page as a separate image.",
      icon: FileImage,
      color: "from-red-500 to-orange-500",
      to: "/convert/pdf-to-jpg"
    },

    {
  title: "Image to PDF",
  description: "Convert JPG, PNG, or other images into a single high-quality PDF file.",
  icon: Image,
  color: "from-indigo-500 to-blue-500",
  to: "/convert/image-to-pdf"
}

    
   
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="container mx-auto">

          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Most Popular PDF Tools
            </h2>
            <p className="text-gray-600 text-lg">
               powerful tools to convert, compress, and edit PDFs — 100% FREE.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                {...tool}
                onClick={() => navigate(tool.to)} // ✅ THIS IS THE MAIN FIX
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Home;
