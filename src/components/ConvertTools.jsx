import { Link } from "react-router-dom";
import {
  FileText,
  FileSpreadsheet,
  FileType,
  FileImage,
  Image,
  Presentation
} from "lucide-react";

const tools = [
  {
    title: "PDF to Word",
    to: "/convert/pdf-to-word",
    icon: FileText,
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "PDF to Excel",
    to: "/convert/pdf-to-excel",
    icon: FileSpreadsheet,
    color: "from-green-600 to-emerald-500"
  },
  {
    title: "Word to PDF",
    to: "/convert/word-to-pdf",
    icon: FileType,
    color: "from-purple-600 to-fuchsia-500"
  },
  {
    title: "Excel to PDF",
    to: "/convert/excel-to-pdf",
    icon: FileSpreadsheet,
    color: "from-emerald-600 to-green-500"
  },
  {
    title: "PDF to JPG",
    to: "/convert/pdf-to-jpg",
    icon: FileImage,
    color: "from-red-600 to-orange-500"
  },
  {
    title: "Image to PDF",
    to: "/convert/image-to-pdf",
    icon: Image,
    color: "from-indigo-600 to-blue-500"
  },
  {
    title: "PPT to PDF",
    to: "/convert/ppt-to-pdf",
    icon: Presentation,
    color: "from-orange-600 to-amber-500"
  }
];

const ConvertTools = () => {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Other Convert Tools
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.to}
            className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition bg-white"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-white bg-gradient-to-r ${tool.color}`}
            >
              <tool.icon size={22} />
            </div>
            <span className="font-medium text-gray-800">
              {tool.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConvertTools;
