export const IMAGE = 'image';
export const VIDEO = 'video';

/**
 * Limited list of image file extensions used across the project
 */
export const imageExtensions = ['jpg', 'png', 'gif'];

/**
 * Limited list of video file extensions used across the project
 */
export const videoExtensions = ['mp4'];

export function getFileExtension(path) {
  if (path.match(/(?:.+..+[^/]+$)/ig) != null) {
    return path.split('.').slice(-1)[0];
  }
  throw new Error('Unknown file extension');
}

export function getMediaFileType(path) {
  const fileExtension = getFileExtension(path).toLowerCase();
  if (imageExtensions.includes(fileExtension)) {
    return IMAGE;
  }
  if (videoExtensions.includes(fileExtension)) {
    return VIDEO;
  }
  throw new Error('Unsupported media type.');
}
