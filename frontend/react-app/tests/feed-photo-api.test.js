import test from 'node:test';
import assert from 'node:assert/strict';
import { createPhotoHandler } from '../server/feed-photo.js';
import { FEED_PHOTO_BYTES } from '../src/feed-photo.js';

const postId = '01234567890123456789';
const image = 'data:image/jpeg;base64,/9j/AAAA';
const env = { CLOUDINARY_API_KEY: 'test-private-key', CLOUDINARY_API_SECRET: 'test-private-secret' };
function setup({ post = null, count = null, anonymous = false, uploadError = false, conflict = false, configured = true, cleanup = 'ok' } = {}) {
  const calls = { upload: [], destroy: [], budget: [], auth: 0 }; let conflicted = false;
  const media = { uploader: {
    upload: async (file, options) => {
      calls.upload.push({ file, options });
      if (uploadError) throw new Error(env.CLOUDINARY_API_SECRET);
      return { public_id: options.public_id, secure_url: `https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${options.public_id}.jpg`, width: 800, height: 600 };
    },
    destroy: async (id, options) => { calls.destroy.push({ id, options }); return { result: cleanup }; },
  } };
  const request = async (url, init) => {
    if (url.includes('accounts:lookup')) {
      calls.auth++;
      if (JSON.parse(init.body).idToken !== 'alice-token') return Response.json({}, { status: 400 });
      return Response.json({ users: [{ localId: 'alice', providerUserInfo: anonymous ? [] : [{ providerId: 'password' }] }] });
    }
    if (url.includes('/campusFeedPosts/')) return post ? Response.json({ fields: post }) : Response.json({}, { status: 404 });
    if (url.includes('/campusFeedPhotoUploads/')) return count === null ? Response.json({}, { status: 404 }) : Response.json({ fields: { count: { integerValue: String(count) }, windowStart: { timestampValue: new Date().toISOString() } }, updateTime: '2026-10-18T00:00:00Z' });
    if (url.endsWith(':commit')) {
      calls.budget.push(JSON.parse(init.body));
      if (conflict && !conflicted) { conflicted = true; return Response.json({}, { status: 409 }); }
      return Response.json({});
    }
    throw new Error('Unexpected test request.');
  };
  const handler = createPhotoHandler({ env: configured ? env : {}, request, media });
  const invoke = async (body = { action: 'upload', postId, image }, overrides = {}) => {
    const req = { method: 'POST', headers: { host: 'campus.test', origin: 'https://campus.test', authorization: 'Bearer alice-token', 'content-type': 'application/json' }, body, ...overrides };
    const result = { statusCode: 0, headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(value) { this.body = JSON.parse(value); } };
    await handler(req, result); return result;
  };
  return { calls, invoke };
}

test('photo configuration exposes no credentials and unsupported methods are rejected', async () => {
  const { invoke } = setup();
  const config = await invoke(undefined, { method: 'GET' });
  assert.equal(config.statusCode, 200); assert.equal(config.body.enabled, true);
  assert.equal(JSON.stringify(config.body).includes('test-private'), false);
  assert.equal(config.headers['Cache-Control'], 'no-store');
  assert.equal((await invoke(undefined, { method: 'PUT' })).statusCode, 405);
});

test('uploads require a genuine signed-in non-anonymous account and same-origin requests', async () => {
  const { invoke, calls } = setup();
  assert.equal((await invoke(undefined, { headers: { 'content-type': 'application/json' } })).statusCode, 401);
  assert.equal((await invoke(undefined, { headers: { host: 'campus.test', origin: 'https://evil.test' } })).statusCode, 403);
  assert.equal((await invoke(undefined, { headers: { authorization: 'Bearer invalid', 'content-type': 'application/json' } })).statusCode, 401);
  assert.equal((await setup({ anonymous: true }).invoke()).statusCode, 403);
  assert.equal(calls.upload.length, 0);
});

test('server-side uploads constrain the owner, folder, format, dimensions and overwrite policy', async () => {
  const { invoke, calls } = setup();
  const result = await invoke({ action: 'upload', postId, image, public_id: 'someone-else' });
  assert.equal(result.statusCode, 200); assert.equal(calls.upload.length, 1);
  assert.equal(calls.upload[0].options.public_id, `campusvibe-feed/alice/${postId}`);
  assert.equal(calls.upload[0].options.overwrite, false);
  assert.equal(calls.upload[0].options.resource_type, 'image');
  assert.deepEqual(calls.upload[0].options.allowed_formats, ['jpg']);
  assert.equal(calls.budget.length, 1);
  assert.equal(JSON.stringify(result.body).includes('test-private'), false);
});

test('invalid formats, identifiers and oversized photos never reach Cloudinary', async () => {
  const { invoke, calls } = setup();
  for (const data of [{ action: 'upload', postId: '../other', image }, { action: 'upload', postId, image: 'https://example.com/image.jpg' }, { action: 'upload', postId, image: 'data:image/svg+xml;base64,AAAA' }, { action: 'upload', postId, image: `data:image/jpeg;base64,/9j/${'A'.repeat(FEED_PHOTO_BYTES * 2)}` }]) assert.ok([400, 413].includes((await invoke(data)).statusCode));
  assert.equal(calls.upload.length, 0); assert.equal(calls.budget.length, 0);
});

test('twenty-attempt daily limits stop uploads, and transaction conflicts retry admission', async () => {
  const limited = setup({ count: 20 }); assert.equal((await limited.invoke()).statusCode, 429); assert.equal(limited.calls.upload.length, 0);
  const race = setup({ count: 3, conflict: true }); assert.equal((await race.invoke()).statusCode, 200); assert.equal(race.calls.budget.length, 2); assert.equal(race.calls.upload.length, 1);
});

test('existing posts cannot be overwritten and other authors cannot remove photos', async () => {
  const own = setup({ post: { authorId: { stringValue: 'alice' } } });
  assert.equal((await own.invoke()).statusCode, 409);
  assert.equal((await own.invoke({ action: 'discard', postId })).statusCode, 409);
  assert.equal((await own.invoke({ action: 'delete', postId })).statusCode, 409);
  const other = setup({ post: { authorId: { stringValue: 'bob' }, deleting: { booleanValue: true } } });
  assert.equal((await other.invoke({ action: 'delete', postId })).statusCode, 403);
  assert.equal(own.calls.destroy.length + other.calls.destroy.length, 0);
});

test('deletion cleans only the authenticated author asset and tolerates already-removed assets', async () => {
  for (const cleanup of ['ok', 'not found']) {
    const { invoke, calls } = setup({ post: { authorId: { stringValue: 'alice' }, deleting: { booleanValue: true } }, cleanup });
    assert.equal((await invoke({ action: 'delete', postId, publicId: 'other-user-file' })).statusCode, 200);
    assert.equal(calls.destroy[0].id, `campusvibe-feed/alice/${postId}`); assert.equal(calls.destroy[0].options.invalidate, true);
  }
  assert.equal((await setup().invoke({ action: 'delete', postId })).statusCode, 409);
  assert.equal((await setup().invoke({ action: 'discard', postId })).statusCode, 200);
});

test('service configuration and provider failures never disclose credentials', async () => {
  for (const state of [{ configured: false }, { uploadError: true }]) {
    const result = await setup(state).invoke(); assert.equal(result.statusCode, 503);
    assert.equal(JSON.stringify(result.body).includes(env.CLOUDINARY_API_SECRET), false);
    assert.equal(JSON.stringify(result.body).includes(env.CLOUDINARY_API_KEY), false);
  }
});
