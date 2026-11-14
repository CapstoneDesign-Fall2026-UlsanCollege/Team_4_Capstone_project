import { v2 as cloudinary } from 'cloudinary';
import { FEED_PHOTO_BYTES, FEED_PHOTO_CLOUD, FEED_PHOTO_DAILY_LIMIT, FEED_PHOTO_EDGE, validFeedPhoto } from '../../frontend/react-app/src/feed-photo.js';
import { validSuggestionId, validSuggestionPoster } from '../../frontend/react-app/src/suggestion-poster.js';

const firebaseKey = 'AIzaSyAn8ES7j5qykoUvXJtHF-_lF-9AyypaZEs';
const productionProject = 'campus-vibe-7a95a';
const bodyLimit = Math.ceil(FEED_PHOTO_BYTES * 4 / 3) + 1024;
const failure = (status, message) => Object.assign(new Error(message), { status });

async function readBody(req) {
  if (req.body !== undefined) {
    if (Buffer.byteLength(typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) > bodyLimit) throw failure(413, 'The prepared photo exceeds 300 KB.');
    try { return typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
    catch { throw failure(400, 'Invalid photo request.'); }
  }
  let bytes = 0; const chunks = [];
  for await (const chunk of req) {
    bytes += Buffer.byteLength(chunk);
    if (bytes > bodyLimit) throw failure(413, 'The prepared photo exceeds 300 KB.');
    chunks.push(Buffer.from(chunk));
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw failure(400, 'Invalid photo request.'); }
}

export function createPhotoHandler({ env = process.env, request = fetch, media = cloudinary, purpose = 'feed' } = {}) {
  if (!['feed', 'suggestion'].includes(purpose)) throw new Error('Unknown photo purpose.');
  const suggestion = purpose === 'suggestion';
  const cloud = env.CLOUDINARY_CLOUD_NAME || FEED_PHOTO_CLOUD;
  const configured = cloud === FEED_PHOTO_CLOUD && !!env.CLOUDINARY_API_KEY && !!env.CLOUDINARY_API_SECRET;
  const local = !env.VERCEL_ENV && env.NODE_ENV !== 'production' && !!env.FIREBASE_AUTH_EMULATOR_HOST && !!env.FIRESTORE_EMULATOR_HOST;
  const project = local ? 'demo-campusvibe-feed' : productionProject;
  const identity = local ? `http://${env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com` : 'https://identitytoolkit.googleapis.com';
  const database = local ? `http://${env.FIRESTORE_EMULATOR_HOST}` : 'https://firestore.googleapis.com';
  const documents = `projects/${project}/databases/(default)/documents`;
  const options = { cloud_name: cloud, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET, timeout: 25000 };

  async function call(url, token, init = {}) {
    return request(url, { ...init, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, signal: AbortSignal.timeout(30000) });
  }
  async function readPost(postId, token) {
    if (suggestion) {
      const owner = await call(`${database}/v1/${documents}/campusSuggestionOwners/${postId}`, token);
      if (owner.status === 404) return null;
      if (!owner.ok) throw failure(403, 'Only the suggestion author can change its poster.');
    }
    const response = await call(`${database}/v1/${documents}/${suggestion ? 'campusSuggestions' : 'campusFeedPosts'}/${postId}`, token);
    if (response.status === 404) return null;
    if (!response.ok) throw failure(503, 'Cannot verify the post. Reconnect and retry.');
    return (await response.json()).fields || {};
  }
  async function consumeUpload(uid, token) {
    const name = `${documents}/campusFeedPhotoUploads/${uid}`;
    for (let attempt = 0; attempt < 4; attempt++) {
      const response = await call(`${database}/v1/${name}`, token);
      if (!response.ok && response.status !== 404) throw failure(503, 'Photo permissions are unavailable. Try again later.');
      const previous = response.ok ? await response.json() : null;
      const reset = !previous || Date.now() - Date.parse(previous.fields?.windowStart?.timestampValue) >= 86400000;
      const count = reset ? 1 : Number(previous.fields?.count?.integerValue) + 1;
      if (!Number.isInteger(count) || count > FEED_PHOTO_DAILY_LIMIT) throw failure(429, 'You have reached 20 photo upload attempts in 24 hours. Text posts are still available.');
      const write = {
        update: { name, fields: { count: { integerValue: String(count) }, ...(reset ? {} : { windowStart: previous.fields.windowStart }) } },
        currentDocument: previous ? { updateTime: previous.updateTime } : { exists: false },
        ...(reset ? { updateTransforms: [{ fieldPath: 'windowStart', setToServerValue: 'REQUEST_TIME' }] } : {}),
      };
      const result = await call(`${database}/v1/${documents}:commit`, token, { method: 'POST', body: JSON.stringify({ writes: [write] }) });
      if (result.ok) return;
      if ([409, 412].includes(result.status)) continue;
      throw failure(503, 'Photo permissions are unavailable. Try again later.');
    }
    throw failure(429, 'Another photo request is active. Wait a moment and retry.');
  }

  return async function handler(req, res) {
    const send = (status, data) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(data)); };
    if (req.method === 'GET') return send(200, { enabled: configured, cloudName: cloud, maxBytes: FEED_PHOTO_BYTES });
    if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return send(405, { error: 'Method not allowed.' }); }
    try {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) throw failure(403, 'Use CampusVibe to share photos.');
      if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) throw failure(415, 'Use a JSON photo request.');
      const token = /^Bearer ([^\s]+)$/.exec(req.headers.authorization || '')?.[1];
      if (!token) throw failure(401, 'Sign in to share photos.');
      const identityResponse = await call(`${identity}/v1/accounts:lookup?key=${firebaseKey}`, null, { method: 'POST', body: JSON.stringify({ idToken: token }) });
      if (!identityResponse.ok) throw failure(401, 'Your sign-in expired. Sign in again.');
      const user = (await identityResponse.json()).users?.[0];
      if (!user || user.disabled || !user.providerUserInfo?.length || !/^[A-Za-z0-9_-]{1,128}$/.test(user.localId)) throw failure(403, 'Sign in with a CampusVibe account to share photos.');
      if (user.emailVerified !== true) throw failure(403, 'Verify your email before sharing photos.');
      if (!configured) throw failure(503, 'Photo sharing is not configured yet. Text posts are still available.');
      const body = await readBody(req);
      const itemId = suggestion ? body?.suggestionId : body?.postId;
      if (!body || !(suggestion ? ['upload', 'discard'] : ['upload', 'delete', 'discard']).includes(body.action)
        || !(suggestion ? validSuggestionId(itemId) && /^[A-Za-z0-9]{20}$/.test(body.photoId) : /^[A-Za-z0-9]{20}$/.test(itemId))) throw failure(400, 'Invalid photo request.');
      const uid = user.localId, publicId = suggestion ? `campusvibe-suggestions/${itemId}/${body.photoId}` : `campusvibe-feed/${uid}/${itemId}`;
      if (suggestion) {
        const response = await call(`${database}/v1/${documents}/campusSuggestionPhotos/${body.photoId}`, token);
        if (!response.ok) throw failure(403, 'Cannot verify ownership of this poster.');
        const claim = (await response.json()).fields;
        if (claim?.uid?.stringValue !== uid || claim.suggestionId?.stringValue !== itemId
          || claim.status?.stringValue !== (body.action === 'upload' ? 'active' : 'discarded')) throw failure(403, 'Cannot change this poster.');
      }
      const post = await readPost(itemId, token);
      if (!suggestion && post && post.authorId?.stringValue !== uid) throw failure(403, 'Only the post author can change its photo.');
      if (body.action === 'upload') {
        if (post) throw failure(409, suggestion ? 'This suggestion was already sent. Its poster cannot be replaced.' : 'This post already exists. Reload the feed before retrying.');
        if (typeof body.image !== 'string' || !/^data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/]+={0,2}$/.test(body.image)) throw failure(400, 'Choose a prepared JPG photo.');
        const bytes = Buffer.from(body.image.slice(23), 'base64');
        if (!bytes.length || bytes.length > FEED_PHOTO_BYTES) throw failure(413, 'The prepared photo exceeds 300 KB.');
        await consumeUpload(uid, token);
        const result = await media.uploader.upload(body.image, { ...options, public_id: publicId, resource_type: 'image', type: 'upload', overwrite: false, allowed_formats: ['jpg'], format: 'jpg', transformation: [{ width: FEED_PHOTO_EDGE, height: FEED_PHOTO_EDGE, crop: 'limit', quality: 'auto:eco' }] });
        const photo = { ...(suggestion ? { id: body.photoId } : {}), publicId: result.public_id, src: result.secure_url, width: result.width, height: result.height };
        if (!(suggestion ? validSuggestionPoster(photo, itemId) : validFeedPhoto(photo, uid, itemId))) {
          await media.uploader.destroy(publicId, { ...options, resource_type: 'image', invalidate: true });
          throw failure(502, 'The photo could not be prepared. Choose another image.');
        }
        return send(200, { photo });
      }
      if (body.action === 'discard' && post) throw failure(409, suggestion ? 'This poster belongs to a submitted suggestion and was not removed.' : 'The photo belongs to a published post and was not removed.');
      if (body.action === 'delete' && (!post || post.deleting?.booleanValue !== true)) throw failure(409, 'Start deleting the post before removing its photo.');
      const result = await media.uploader.destroy(publicId, { ...options, resource_type: 'image', type: 'upload', invalidate: true });
      if (!['ok', 'not found'].includes(result.result)) throw failure(502, 'Photo cleanup is incomplete. Retry deleting the post.');
      return send(200, { deleted: true });
    } catch (error) {
      return send(error.status || 503, { error: error.status ? error.message : 'The photo service could not complete this request. Please retry.' });
    }
  };
}
