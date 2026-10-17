import { addDoc, collection, connectFirestoreEmulator, doc, getDocFromServer, getDocsFromServer, getFirestore, limit, onSnapshot, orderBy, query, runTransaction, serverTimestamp, updateDoc, where, writeBatch } from "firebase/firestore";
import { auth, useEmulators } from "./firebase";

export const db = getFirestore(auth.app);
if (useEmulators) connectFirestoreEmulator(db, "127.0.0.1", Number(import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT) || 8080);

export const FEED_PAGE_SIZE = 50;
const posts = () => collection(db, "campusFeedPosts");

export function feedError(error) {
  const code = error?.code?.replace("firestore/", "");
  if (code === "permission-denied") return "Shared feed access is not available. Firestore permissions may need setup. Your post was not published.";
  if (code === "failed-precondition") return "The shared feed database needs configuration. Please try again after setup.";
  if (code === "unavailable" || code === "deadline-exceeded") return "Cannot reach the shared feed. Check your connection and retry.";
  if (code === "resource-exhausted") return "The shared feed usage limit has been reached. Please try later.";
  return error?.message || "The shared feed could not complete this request. Please retry.";
}

export function account(user) {
  if (!auth.currentUser || auth.currentUser.isAnonymous || auth.currentUser.uid !== user.id) throw new Error("Sign in with your account to use the shared feed.");
  return auth.currentUser.uid;
}

export function validateSharedPost(value) {
  const body = String(value.body || "").trim();
  const college = String(value.college || "").trim();
  if (!college || college.length > 100) throw new Error("Enter a college name of up to 100 characters.");
  if (body.length > 2000) throw new Error("Post text must be 2,000 characters or fewer.");
  if (value.images?.length) throw new Error("Photo uploads are not enabled for the shared feed.");
  let event = null;
  if (value.event) {
    event = Object.fromEntries(["title", "date", "time", "location"].map(key => [key, String(value.event[key] || "").trim()]));
    const date = new Date(`${event.date}T00:00:00Z`);
    if (!event.title || event.title.length > 100 || !event.location || event.location.length > 120 || !/^\d{4}-\d{2}-\d{2}$/.test(event.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== event.date || (event.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time))) throw new Error("Add a valid event name, date, time, and location.");
  }
  if (!body && !event) throw new Error("Add post text or an event before publishing.");
  return { body, college, event };
}

export function watchSharedPosts(user, mine, receive, fail) {
  const uid = account(user);
  const constraints = mine ? [where("authorId", "==", uid), orderBy("createdAt", "desc"), limit(FEED_PAGE_SIZE)] : [orderBy("createdAt", "desc"), limit(FEED_PAGE_SIZE)];
  return onSnapshot(query(posts(), ...constraints), { includeMetadataChanges: true }, snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id, createdAt: item.data().createdAt?.toMillis() || null })), { fromCache: snapshot.metadata.fromCache });
  }, error => fail(feedError(error)));
}

export async function publishSharedPost(user, value) {
  const authorId = account(user);
  const payload = validateSharedPost(value);
  const authorName = user.name.trim().slice(0, 120) || "Student";
  return addDoc(posts(), { ...payload, authorId, authorName, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function editSharedPost(user, post, value) {
  if (account(user) !== post.authorId) throw new Error("Only the author can edit this post.");
  return updateDoc(doc(posts(), post.id), { ...validateSharedPost(value), updatedAt: serverTimestamp() });
}

export async function deleteSharedPost(user, post) {
  if (account(user) !== post.authorId) throw new Error("Only the author can delete this post.");
  const reference = doc(posts(), post.id);
  const exists = await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(reference);
    const uid = account(user);
    if (!snapshot.exists()) return false;
    if (snapshot.data().authorId !== uid) throw new Error('Only the author can delete this post.');
    if (!snapshot.data().deleting) transaction.update(reference, { deleting: true, updatedAt: serverTimestamp() });
    return true;
  }).catch(async error => {
    const snapshot = await getDocFromServer(reference);
    const uid = account(user);
    if (!snapshot.exists()) return false;
    if (snapshot.data().authorId === uid && snapshot.data().deleting === true) return true;
    throw error;
  });
  if (!exists) return;
  try {
    // Freeze child creation before draining every server-confirmed page. Keep the parent for retries.
    for (const [name, size] of [['reactions', 200], ['comments', 100]]) {
      while (true) {
        account(user);
        const page = await getDocsFromServer(query(collection(reference, name), limit(size)));
        if (page.empty) break;
        const batch = writeBatch(db);
        page.docs.forEach(item => batch.delete(item.ref));
        await batch.commit();
      }
    }
    await runTransaction(db, async transaction => {
      const snapshot = await transaction.get(reference);
      if (!snapshot.exists()) return;
      if (snapshot.data().authorId !== account(user)) throw new Error('Only the author can delete this post.');
      transaction.delete(reference);
    });
  } catch (error) {
    account(user);
    if (!(await getDocFromServer(reference)).exists()) return;
    throw new Error('Post deletion is incomplete. Reconnect and retry Delete post to finish removing it.', { cause: error });
  }
}
