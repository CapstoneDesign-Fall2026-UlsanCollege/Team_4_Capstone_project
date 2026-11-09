import { FEED_PHOTO_CLOUD, FEED_PHOTO_EDGE } from './feed-photo.js';

export const validSuggestionId = id => typeof id === 'string' && /^[A-Za-z0-9-]{1,80}$/.test(id);
export function validSuggestionPoster(poster, suggestionId) {
  if (!validSuggestionId(suggestionId) || !poster || typeof poster !== 'object'
    || Object.keys(poster).sort().join(',') !== 'height,id,publicId,src,width'
    || !/^[A-Za-z0-9]{20}$/.test(poster.id)) return false;
  const publicId = `campusvibe-suggestions/${suggestionId}/${poster.id}`;
  return poster.publicId === publicId && typeof poster.src === 'string'
    && new RegExp(`^https://res[.]cloudinary[.]com/${FEED_PHOTO_CLOUD}/image/upload/v[0-9]+/${publicId}[.]jpg$`).test(poster.src)
    && [poster.width, poster.height].every(edge => Number.isInteger(edge) && edge > 0 && edge <= FEED_PHOTO_EDGE);
}
