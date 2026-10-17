export const FEED_PHOTO_CLOUD = 'ghr7xnsl';
export const FEED_PHOTO_BYTES = 300 * 1024;
export const FEED_PHOTO_EDGE = 1280;
export const FEED_PHOTO_DAILY_LIMIT = 20;

export function validFeedPhoto(photo, uid, postId) {
  if (!photo || typeof photo !== 'object' || Object.keys(photo).sort().join(',') !== 'height,publicId,src,width') return false;
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid) || !/^[A-Za-z0-9]{20}$/.test(postId)) return false;
  const publicId = `campusvibe-feed/${uid}/${postId}`;
  const source = new RegExp(`^https://res[.]cloudinary[.]com/${FEED_PHOTO_CLOUD}/image/upload/v[0-9]+/${publicId}[.]jpg$`);
  return photo.publicId === publicId && typeof photo.src === 'string' && source.test(photo.src)
    && [photo.width, photo.height].every(edge => Number.isInteger(edge) && edge > 0 && edge <= FEED_PHOTO_EDGE);
}

export function feedPhotoMedia(photo) {
  return photo ? [{ id: photo.publicId, ...photo, alt: 'Shared campus photo' }] : [];
}

export async function prepareFeedPhoto(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP photo.');
  if (!file.size || file.size > 10 * 1024 * 1024) throw new Error('Choose a photo no larger than 10 MB.');
  const bitmap = await createImageBitmap(file).catch(() => { throw new Error('This photo could not be read. Choose another image.'); });
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 25000000) throw new Error('Choose a photo with no more than 25 megapixels.');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Photo preparation is unavailable in this browser.');
    for (const edge of [FEED_PHOTO_EDGE, 1024, 800]) {
      const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.82, 0.68, 0.5]) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
        if (blob?.size && blob.size <= FEED_PHOTO_BYTES) return { id: crypto.randomUUID().replaceAll('-', '').slice(0, 20), blob, alt: 'Shared campus photo' };
      }
    }
    throw new Error('This photo could not fit the shared photo limit. Choose another image.');
  } finally { bitmap.close(); }
}
