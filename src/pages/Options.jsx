import { useNavigate } from 'react-router-dom';
import { useFile } from '../context/FileContext';
import FilePreview from '../components/FilePreview';
import ToolCard from '../components/ToolCard';
import {
  FileText,
  Files,
  Scissors,
  Minimize2,
  RefreshCcw,
  FileSpreadsheet,
  Image,
  FileType,
  Presentation
} from 'lucide-react';
import { useEffect } from 'react';

const Options = () => {
  const { selectedFile, setSelectedFile } = useFile();
  const navigate = useNavigate();

  // 🔒 Safety: no file → redirect home
  useEffect(() => {
    if (!selectedFile) {
      navigate('/', { replace: true });
    }
  }, [selectedFile, navigate]);

  if (!selectedFile) return null;

  const handleToolSelect = (path) => {
    navigate(path);
  };

  // 🔥 ALL TOOLS (SMALL + ATTRACTIVE)
  const tools = [


    {
      title: "PDF → Word",
      description: "Editable DOCX",
      icon: FileText,
      color: "from-blue-600 to-cyan-500",
      path: "/convert/pdf-to-word"
    },
    {
      title: "PDF → Excel",
      description: "Tables & sheets",
      icon: FileSpreadsheet,
      color: "from-green-600 to-emerald-500",
      path: "/convert/pdf-to-excel"
    },
    {
      title: "Word → PDF",
      description: "DOCX to PDF",
      icon: FileType,
      color: "from-purple-600 to-fuchsia-500",
      path: "/convert/word-to-pdf"
    },
    {
      title: "Excel → PDF",
      description: "XLSX to PDF",
      icon: FileSpreadsheet,
      color: "from-red-600 to-rose-500",
      path: "/convert/excel-to-pdf"
    },
    {
      title: "Merge PDF",
      description: "Combine PDFs",
      icon: Files,
      color: "from-indigo-500 to-blue-500",
      path: "/merge"
    },
    {
      title: "Split PDF",
      description: "Extract pages",
      icon: Scissors,
      color: "from-pink-500 to-rose-500",
      path: "/split"
    },
    {
      title: "Compress PDF",
      description: "Reduce size",
      icon: Minimize2,
      color: "from-yellow-500 to-orange-500",
      path: "/compress"
    },
    
    {
      title: "PPT → PDF",
      description: "Slides to PDF",
      icon: Presentation,
      color: "from-orange-600 to-amber-500",
      path: "/convert/ppt-to-pdf"
    },
    {
      title: "PDF → Image",
      description: "JPG / PNG",
      icon: Image,
      color: "from-orange-500 to-red-500",
      path: "/convert/pdf-to-image"
    },
    {
      title: "Image → PDF",
      description: "Images to PDF",
      icon: Image,
      color: "from-teal-500 to-cyan-500",
      path: "/convert/image-to-pdf"
    },
    {
      title: "Rotate PDF",
      description: "Rotate pages",
      icon: RefreshCcw,
      color: "from-sky-500 to-blue-500",
      path: "/rotate"
    },
      {
      title: "Edit PDF",
      description: "Edit pages",
      icon:  FileSpreadsheet,
      color: "from-sky-500 to-blue-500",
      path: "/rotate"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-3">
          What would you like to do?
        </h1>
        <p className="text-center text-gray-600 mb-10 text-base md:text-lg">
          Choose an action for your selected file
        </p>

        {/* File Preview */}
        <div className="mb-12">
          <FilePreview
            file={selectedFile}
            onRemove={() => setSelectedFile(null)}
          />
        </div>

        {/* Tools Grid – SMALL & CLEAN */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              {...tool}
              onClick={() => handleToolSelect(tool.path)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Options;
