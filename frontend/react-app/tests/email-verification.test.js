import test from 'node:test';
import assert from 'node:assert/strict';
import { hasVerifiedEmail } from '../src/email-verification.js';

const account = { uid: 'member', email: 'person@example.com', emailVerified: true, isAnonymous: false };
test('only a strictly verified, identified, non-anonymous email account is a member', () => {
  assert.equal(hasVerifiedEmail(account), true);
  for (const emailVerified of [false, undefined, null, 'true', 1]) assert.equal(hasVerifiedEmail({ ...account, emailVerified }), false);
  for (const value of [null, {}, { ...account, uid: '' }, { ...account, email: '' }, { ...account, email: null }, { ...account, isAnonymous: true }]) assert.equal(hasVerifiedEmail(value), false);
});
test('verification is required for Gmail and other mail providers without restricting domains', () => {
  for (const email of ['person@gmail.com', 'person@outlook.com', 'person@campus.ac.kr']) {
    assert.equal(hasVerifiedEmail({ ...account, email }), true);
    assert.equal(hasVerifiedEmail({ ...account, email, emailVerified: false }), false);
  }
});
