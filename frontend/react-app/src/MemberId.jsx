export default function MemberId({ uid }) {
  return uid && uid !== 'demo' ? <small className="feed-member-id">Member ID: <code>{uid}</code></small> : null;
}
