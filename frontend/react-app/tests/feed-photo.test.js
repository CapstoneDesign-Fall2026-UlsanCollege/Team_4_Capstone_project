import test from 'node:test';
import assert from 'node:assert/strict';
import { FEED_PHOTO_BYTES, feedPhotoMedia, prepareFeedPhoto, validFeedPhoto } from '../src/feed-photo.js';

const id = '01234567890123456789';
const photo = { publicId: `campusvibe-feed/alice/${id}`, src: `https://res.cloudinary.com/ghr7xnsl/image/upload/v123/campusvibe-feed/alice/${id}.jpg`, width: 640, height: 480 };

test('shared photo references are canonical and bound to the author and post', () => {
  assert.equal(validFeedPhoto(photo, 'alice', id), true);
  assert.equal(validFeedPhoto(photo, 'bob', id), false);
  assert.equal(validFeedPhoto(photo, 'alice', '00000000000000000000'), false);
  for (const value of [null, {}, { ...photo, secret: 'never stored' }, { ...photo, width: 1281 }, { ...photo, height: 0 }, { ...photo, height: 1.5 }]) assert.equal(validFeedPhoto(value, 'alice', id), false);
  for (const src of [photo.src.replace('https:', 'http:'), photo.src.replace('res.cloudinary.com', 'example.com'), photo.src.replace('/ghr7xnsl/', '/other-cloud/'), `${photo.src}?tracking=yes`, `${photo.src}#fragment`, photo.src.replace('.jpg', '.svg'), 'data:image/jpeg;base64,/9j/AAAA']) assert.equal(validFeedPhoto({ ...photo, src }, 'alice', id), false);
});

test('shared photos adapt to existing Feed preview controls', () => {
  assert.deepEqual(feedPhotoMedia(null), []);
  assert.deepEqual(feedPhotoMedia(photo), [{ id: photo.publicId, ...photo, alt: 'Shared campus photo' }]);
});

test('unsupported and oversized inputs fail before decoding an image', async () => {
  for (const file of [null, { type: 'image/svg+xml', size: 10 }, { type: 'image/gif', size: 10 }, { type: 'image/jpeg', size: 0 }, { type: 'image/png', size: 10 * 1024 * 1024 + 1 }]) await assert.rejects(prepareFeedPhoto(file));
  assert.equal(FEED_PHOTO_BYTES, 307200);
});
