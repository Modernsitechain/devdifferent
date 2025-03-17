import dayjs from 'dayjs';

export const getFileName = (type: string): string => {
  const generatedFileName = dayjs().format('DDMMYYYYHHmmss');
  return `${generatedFileName}${getFileType(type)}`;
};

const getFileType = (type: string): string => {
  let fileType = '';

  switch (type) {
    case 'image/png':
      fileType = '.png';
      break;
    case 'image/jpeg':
      fileType = '.jpeg';
      break;
    case 'image/jpg':
      fileType = '.jpg';
      break;
    case 'image/webp':
      fileType = '.webp';
      break;
    case 'video/quicktime':
      fileType = '.mov';
      break;
    case 'video/mp4':
      fileType = '.mp4';
      break;
    default:
      fileType = '.png';
      break;
  }
  return fileType;
};
