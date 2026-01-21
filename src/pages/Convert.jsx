import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';
import FilePreview from '../../components/FilePreview';
import {
  FileText,
  FileSpreadsheet,
  Image,
  FileType
} from 'lucide-react';

const Convert = () => {
  const { selectedFile } = useFile();
  const navigate = useNavigate();

  const convertOptions = [
    {
      title: 'PDF to Word',
      icon: FileText,
      color: 'from-blue-600 to-cyan-500',
      path: '/convert/pdf-to-word'
    },
    {
      title: 'PDF to Excel',
      icon: FileSpreadsheet,
      color: 'from-green-600 to-emerald-500',
      path: '/convert/pdf-to-excel'
    },
    {
      title: 'PDF to JPG',
      icon: Image,
      color: 'from-orange-500 to-red-500',
      path: '/convert/pdf-to-jpg'
    },
    {
      title: 'Word to PDF',
      icon: FileType,
      color: 'from-purple-600 to-fuchsia-500',
      path: '/convert/word-to-pdf'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Convert your file
        </h1>

        {/* ✅ IF NO FILE */}
        {!selectedFile && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">
              Please upload a file first to use conversion tools.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-700"
            >
              Upload File
            </button>
          </div>
        )}

        {/* ✅ IF FILE EXISTS */}
        {selectedFile && (
          <>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Choose the format you want to convert your file into
            </p>

            <div className="mb-14">
              <FilePreview file={selectedFile} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {convertOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => navigate(option.path)}
                    className="
                      bg-white rounded-2xl p-6
                      border border-gray-100
                      shadow-md hover:shadow-2xl
                      transition-all duration-300
                      hover:-translate-y-2
                      text-center
                    "
                  >
                    <div
                      className={`
                        w-16 h-16 mx-auto mb-4
                        flex items-center justify-center
                        rounded-xl text-white
                        bg-gradient-to-r ${option.color}
                        shadow-lg
                      `}
                    >
                      <Icon size={32} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">
                      {option.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Convert;
