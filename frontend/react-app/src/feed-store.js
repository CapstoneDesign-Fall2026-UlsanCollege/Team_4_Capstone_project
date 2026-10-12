const DATABASE = "campus-vibe-feed-demo";
const STORE = "accounts";

export const PEOPLE = [
  {
    id: "maya",
    name: "Maya Chen",
    college: "Seoul Arts College",
    color: "#e47a9d",
    interest: "Music & creative nights",
  },
  {
    id: "leo",
    name: "Leo Park",
    college: "Ulsan College",
    color: "#16aaa0",
    interest: "Code, games & good ideas",
  },
  {
    id: "nora",
    name: "Nora Kim",
    college: "Pusan National University",
    color: "#9270d0",
    interest: "Campus life & photography",
  },
  {
    id: "sam",
    name: "Sam Lee",
    college: "Korea University",
    color: "#deaa55",
    interest: "Sports & new connections",
  },
];

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(
        new Error(
          "Device storage is unavailable. Your posts have not been saved.",
        ),
      );
  });
}

export function createDemoFeed() {
  const now = Date.now();
  return {
    college: "",
    friends: ["maya", "leo"],
    incoming: ["nora"],
    outgoing: [],
    posts: [
      {
        id: "demo-music",
        authorId: "maya",
        authorName: "Maya Chen",
        college: "Seoul Arts College",
        body: "A little music, a few new faces, and the best kind of Friday night. We're putting together an open mic. Who's coming?",
        images: [
          {
            id: "music",
            src: "/assets/feed-music.jpg",
            alt: "An outdoor live music gathering",
          },
        ],
        createdAt: now - 7200000,
        likes: ["leo", "nora"],
        savedBy: [],
        interested: [],
        comments: [
          {
            id: "sample-comment",
            authorId: "leo",
            name: "Leo Park",
            body: "Count me in! I'll bring a friend.",
            createdAt: now - 3600000,
          },
        ],
        event: {
          title: "Friday Open Mic",
          date: "2026-10-16",
          time: "18:30",
          location: "Student courtyard",
        },
      },
      {
        id: "demo-code",
        authorId: "leo",
        authorName: "Leo Park",
        college: "Ulsan College",
        body: "Weekend build session, anyone? Bring the idea you've been putting off. Beginners, designers, and people with a good playlist are all welcome.",
        images: [
          {
            id: "code",
            src: "/assets/event-laptop.jpg",
            alt: "A laptop ready for a campus build session",
          },
        ],
        createdAt: now - 14400000,
        likes: ["maya"],
        savedBy: [],
        interested: [],
        comments: [],
        event: {
          title: "Build Something Saturday",
          date: "2026-10-17",
          time: "14:00",
          location: "Innovation Lab",
        },
      },
      {
        id: "demo-campus",
        authorId: "nora",
        authorName: "Nora Kim",
        college: "Pusan National University",
        body: "Campus looks a little different when you slow down and notice it. Sharing a moment from our afternoon walk. What's your favorite spot at your college?",
        images: [
          {
            id: "campus",
            src: "/assets/campus-dashboard.jpg",
            alt: "A university building and green campus lawn",
          },
        ],
        createdAt: now - 86400000,
        likes: ["maya", "sam"],
        savedBy: [],
        interested: [],
        comments: [],
        event: null,
      },
    ],
  };
}

export async function loadFeed(userId) {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, "readonly");
      const request = transaction.objectStore(STORE).get(userId);
      request.onsuccess = () => resolve(request.result || createDemoFeed());
      request.onerror = () =>
        reject(new Error("Couldn't load your demo feed. Try reloading."));
    });
  } finally {
    db.close();
  }
}

export async function saveFeed(userId, value) {
  const db = await openDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).put(value, userId);
      transaction.oncomplete = resolve;
      transaction.onabort = transaction.onerror = () =>
        reject(
          new Error(
            "Couldn't save to this device. Your changes were not published.",
          ),
        );
    });
  } finally {
    db.close();
  }
}

export async function preparePhoto(file) {
  if (
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
  )
    throw new Error("Choose a JPG, PNG, WebP, or GIF photo.");
  if (file.size > 10 * 1024 * 1024)
    throw new Error("Each photo must be smaller than 10 MB.");
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error(`Couldn't read ${file.name}. Choose another photo.`);
  });
  try {
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas
      .getContext("2d")
      .drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82),
    );
    if (!blob)
      throw new Error("Couldn't prepare this photo. Choose another photo.");
    return { id: crypto.randomUUID(), blob, alt: file.name };
  } finally {
    bitmap.close();
  }
}
