import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../context/FileContext';
import { CheckCircle, Download as DownloadIcon, ArrowRight } from 'lucide-react';

const Download = () => {
  const { result, resetFile } = useFile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) return null;

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="text-green-500 w-24 h-24" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your file is ready!
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Your document has been processed successfully.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* 🔥 FIXED DOWNLOAD LINK */}
          <a
            href={result.url}              // ✅ correct field
            download={result.filename}    // ✅ forces download
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 w-full sm:w-auto justify-center"
          >
            <DownloadIcon size={24} />
            Download File
          </a>

          <button
            onClick={() => {
              resetFile();
              navigate('/');
            }}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
          >
            Start Over
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="flex flex-col gap-3">
            <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-300 transition-colors group">
              <span className="text-gray-700 font-medium">Save to Dropbox</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-brand-600" />
            </button>
            <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-300 transition-colors group">
              <span className="text-gray-700 font-medium">Save to Google Drive</span>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-brand-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
