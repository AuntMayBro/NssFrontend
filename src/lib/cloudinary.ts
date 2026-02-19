export function cloudinaryImage(src: string, width = 400, height = 400, crop = 'fill') {
  if (!src) return src;

  try {
    // If already a full URL from Cloudinary, inject transformation after /upload/
    const url = new URL(src);
    if (url.hostname.includes('res.cloudinary.com')) {
      const parts = url.pathname.split('/');
      // find "upload" segment index
      const uploadIndex = parts.findIndex((p) => p === 'upload');
      if (uploadIndex >= 0) {
        const transforms = `w_${width},h_${height},c_${crop}`;
        // insert transforms after 'upload'
        parts.splice(uploadIndex + 1, 0, transforms);
        url.pathname = parts.join('/');
        return url.toString();
      }
    }
  } catch (e) {
    // fallthrough - src might be a public id or invalid URL
  }

  // If src looks like a public id (no host), construct a URL using Cloudinary demo account
  // Users should replace CLOUD_NAME with their cloud name if needed.
  const CLOUD_NAME = 'demo';
  const transforms = `w_${width},h_${height},c_${crop}`;
  // ensure no leading slash
  const publicId = src.replace(/^\//, '');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export default cloudinaryImage;
