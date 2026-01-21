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
  FileSpreadsheet
} from 'lucide-react';
import { useEffect } from 'react';

const Options = () => {
  const { selectedFile, setSelectedFile } = useFile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFile) {
      navigate('/');
    }
  }, [selectedFile, navigate]);

  if (!selectedFile) return null;

  const handleToolSelect = (path) => {
    navigate(path);
  };

  const tools = [
    {
      title: "Merge PDF",
      description: "Combine with other PDFs",
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
      description: "Reduce file size",
      icon: Minimize2,
      color: "from-yellow-500 to-orange-500",
      path: "/compress"
    },
    {
      title: "Convert to Word",
      description: "Convert PDF to Word",
      icon: FileText,
      color: "from-blue-600 to-cyan-500",
      path: "/convert/pdf-to-word"
    },
    {
      title: "Convert to Excel",
      description: "Convert PDF to Excel",
      icon: FileSpreadsheet,
      color: "from-green-600 to-emerald-500",
      path: "/convert/pdf-to-excel"
    },
    {
      title: "Rotate PDF",
      description: "Rotate pages",
      icon: RefreshCcw,
      color: "from-teal-500 to-cyan-500",
      path: "/rotate"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          What would you like to do?
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Choose an action for your selected PDF file
        </p>

        {/* File Preview */}
        <div className="mb-14">
          <FilePreview
            file={selectedFile}
            onRemove={() => setSelectedFile(null)}
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
