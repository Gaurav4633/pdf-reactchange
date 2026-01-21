import { FileIcon, FileText, Image, Sheet, Presentation, Trash2 } from 'lucide-react';
import { formatBytes, getFileIconName } from '../utils/fileHelpers';

const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  const iconName = getFileIconName(file.name);
  
  const IconComponent = ({ name, ...props }) => {
    switch(name) {
      case 'file-text': return <FileText {...props} />;
      case 'image': return <Image {...props} />;
      case 'sheet': return <Sheet {...props} />;
      case 'presentation': return <Presentation {...props} />;
      case 'file-type-2': return <FileText {...props} />; // Placeholder
      default: return <FileIcon {...props} />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 flex-shrink-0">
          <IconComponent name={iconName} size={24} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-gray-900 truncate block">{file.name}</span>
          <span className="text-sm text-gray-500">{formatBytes(file.size)}</span>
        </div>
      </div>
      
      {onRemove && (
        <button 
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Remove file"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

export default FilePreview;
