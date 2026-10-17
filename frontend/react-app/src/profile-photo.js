export const PHOTO_MAX_LENGTH = 16384;
export const PHOTO_MAX_INPUT = 5 * 1024 * 1024;
export const memberId = uid => typeof uid === 'string' && uid !== 'demo' ? uid : '';
export const memberLabel = (name, uid) => `${name || 'Student'}${memberId(uid) ? `, member ${uid}` : ''}`;

export function validProfilePhoto(value) {
  return typeof value === 'string' && value.length <= PHOTO_MAX_LENGTH && /^data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/]+={0,2}$/.test(value);
}

export function validatePhotoFile(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP photo.');
  if (!file.size || file.size > PHOTO_MAX_INPUT) throw new Error('Choose a photo no larger than 5 MB.');
}

export async function prepareProfilePhoto(file) {
  validatePhotoFile(file);
  const bitmap = await createImageBitmap(file).catch(() => { throw new Error('This photo could not be read. Choose another image.'); });
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40000000) throw new Error('Choose a photo with no more than 40 megapixels.');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Photo editing is unavailable in this browser.');
    const edge = Math.min(bitmap.width, bitmap.height);
    // Re-encode a square crop: never persist the original file or its metadata.
    for (const size of [128, 96, 64]) {
      canvas.width = canvas.height = size;
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, size, size);
      context.drawImage(bitmap, (bitmap.width - edge) / 2, (bitmap.height - edge) / 2, edge, edge, 0, 0, size, size);
      for (const quality of [0.82, 0.65, 0.45]) {
        const photo = canvas.toDataURL('image/jpeg', quality);
        if (validProfilePhoto(photo)) return photo;
      }
    }
    throw new Error('This photo could not fit the profile thumbnail limit. Choose another image.');
  } finally { bitmap.close(); }
}
