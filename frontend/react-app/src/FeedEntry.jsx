import DemoFeed from "./Feed";
import { lazy, Suspense } from "react";
const SharedFeed = lazy(() => import("./SharedFeed"));

export default function FeedEntry({ user }) {
  return user.id === "demo" ? <DemoFeed user={user} /> : <Suspense fallback={<p className="feed-loading" role="status">Loading the shared feed...</p>}><SharedFeed key={user.id} user={user} /></Suspense>;
}
