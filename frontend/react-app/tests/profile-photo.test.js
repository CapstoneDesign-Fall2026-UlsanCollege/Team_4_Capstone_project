import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PHOTO_MAX_LENGTH, publicMemberName, validatePhotoFile, validProfilePhoto } from '../src/profile-photo.js';

test('shared names use the completed Auth display name, not an email-derived session fallback', () => {
  assert.equal(publicMemberName(null), 'Student');
  assert.equal(publicMemberName(''), 'Student');
  assert.equal(publicMemberName('  Same Name  '), 'Same Name');
  assert.equal(publicMemberName('x'.repeat(140)).length, 120);
});

test('only small JPEG data is accepted, never remote URLs, SVGs or arbitrary data', () => {
  assert.equal(validProfilePhoto('data:image/jpeg;base64,/9j/AAAA=='), true);
  for (const value of [null, {}, '', 'https://example.com/a.jpg', 'data:image/svg+xml;base64,AAAA', 'data:image/jpeg;base64,AAAA', 'data:image/jpeg;base64,/9j/<script>', `data:image/jpeg;base64,/9j/${'A'.repeat(PHOTO_MAX_LENGTH)}`]) assert.equal(validProfilePhoto(value), false);
});
test('file validation rejects oversized, empty and unsupported input', () => {
  for (const type of ['image/jpeg', 'image/png', 'image/webp']) assert.doesNotThrow(() => validatePhotoFile({ type, size: 100 }));
  for (const file of [null, { type: 'image/svg+xml', size: 100 }, { type: 'image/gif', size: 100 }, { type: 'image/png', size: 0 }, { type: 'image/png', size: 5 * 1024 * 1024 + 1 }]) assert.throws(() => validatePhotoFile(file));
});
