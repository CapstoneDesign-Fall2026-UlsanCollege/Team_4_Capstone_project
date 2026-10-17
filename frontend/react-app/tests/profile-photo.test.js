import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memberId, memberLabel, PHOTO_MAX_LENGTH, validatePhotoFile, validProfilePhoto } from '../src/profile-photo.js';

test('same names retain their complete distinct member identifiers, not an ambiguous prefix', () => {
  assert.notEqual(memberLabel('Alex', 'same-prefix-one'), memberLabel('Alex', 'same-prefix-two'));
  assert.equal(memberId('same-prefix-one'), 'same-prefix-one');
  assert.equal(memberId('demo'), '');
  assert.equal(memberLabel('Alex', 'demo'), 'Alex');
});
test('only small JPEG data is accepted, never remote URLs, SVGs or arbitrary data', () => {
  assert.equal(validProfilePhoto('data:image/jpeg;base64,/9j/AAAA=='), true);
  for (const value of [null, {}, '', 'https://example.com/a.jpg', 'data:image/svg+xml;base64,AAAA', 'data:image/jpeg;base64,AAAA', 'data:image/jpeg;base64,/9j/<script>', `data:image/jpeg;base64,/9j/${'A'.repeat(PHOTO_MAX_LENGTH)}`]) assert.equal(validProfilePhoto(value), false);
});
test('file validation rejects oversized, empty and unsupported input', () => {
  for (const type of ['image/jpeg', 'image/png', 'image/webp']) assert.doesNotThrow(() => validatePhotoFile({ type, size: 100 }));
  for (const file of [null, { type: 'image/svg+xml', size: 100 }, { type: 'image/gif', size: 100 }, { type: 'image/png', size: 0 }, { type: 'image/png', size: 5 * 1024 * 1024 + 1 }]) assert.throws(() => validatePhotoFile(file));
});
