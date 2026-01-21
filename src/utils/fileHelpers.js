// Format bytes to human readable string
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

// Get file type icon (lucide icon name mapping)
export const getFileIconName = (filename) => {
  const ext = getFileExtension(filename).toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return 'image';
  if (['pdf'].includes(ext)) return 'file-text'; // Approximation
  if (['doc', 'docx'].includes(ext)) return 'file-type-2'; // Approximation
  if (['xls', 'xlsx'].includes(ext)) return 'sheet';
  if (['ppt', 'pptx'].includes(ext)) return 'presentation';
  
  return 'file';
};

// Validate file type based on tool
export const validateFileType = (file, expectedTypes = []) => {
  if (!file) return false;
  if (expectedTypes.length === 0) return true;
  
  // expectedTypes: ['application/pdf', 'image/jpeg'] etc.
  // or simple extensions like ['.pdf', '.jpg']
  
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  
  return expectedTypes.some(type => {
    if (type.startsWith('.')) {
      return fileName.endsWith(type);
    }
    return fileType === type;
  });
};
