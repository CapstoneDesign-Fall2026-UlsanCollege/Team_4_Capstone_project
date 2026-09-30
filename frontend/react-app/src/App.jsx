import { useState } from "react";

const events = [
  { day: "02", month: "OCT", kind: "SOCIAL", title: "Freshers' Bonfire Social", place: "Lakeside Lawn", color: "coral" },
  { day: "03", month: "OCT", kind: "ACADEMICS", title: "Research Skills Bootcamp", place: "Library Hall B", color: "blue" },
  { day: "04", month: "OCT", kind: "TECH", title: "Indie Game Showcase", place: "Media Centre", color: "lime" },
];

function Brand({ onClick }) {
  return (
    <button aria-label="CampusVibes home" className="brand" onClick={onClick}>
      <span className="brand-mark" aria-hidden="true">c</span>
      <span>campus<span className="brand-accent">vibes</span></span>
    </button>
  );
}

function Header({ page, navigate }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onClick={() => navigate("landing")} />
        <nav aria-label="Main navigation" className="top-nav">
          {page === "dashboard" ? (
            <>
              <button className="nav-item selected" onClick={() => navigate("dashboard")}>Overview</button>
              <button className="nav-item" onClick={() => navigate("landing")}>Explore</button>
            </>
          ) : (
            <a className="nav-item" href="#how-it-works">How it works</a>
          )}
        </nav>
        <button className="header-action" onClick={() => navigate(page === "dashboard" ? "landing" : "login")}>
          {page === "dashboard" ? "Log out" : "Log in"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </header>
  );
}

function EventPreview({ event }) {
  return (
    <article className={`event-preview ${event.color}`}>
      <div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div>
      <div className="event-info">
        <span className="event-kind">{event.kind}</span>
        <h3>{event.title}</h3>
        <p>{event.place}</p>
      </div>
      <span aria-hidden="true" className="event-arrow">↗</span>
    </article>
  );
}

function Landing({ navigate }) {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> CAMPUS LIFE, IN ONE PLACE</p>
          <h1>Make room<br />for <span>what's happening.</span></h1>
          <p className="hero-lede">Find the gatherings, clubs, and little campus moments you would've missed.</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => navigate("login")}>Step inside <span aria-hidden="true">→</span></button>
            <a className="text-link" href="#upcoming">See what's on</a>
          </div>
          <div className="hero-footnote"><span className="avatar-stack" aria-hidden="true"><i>J</i><i>M</i><i>A</i></span><span>Good things happen between classes.</span></div>
        </div>
        <div aria-label="A preview of campus events" className="hero-art">
          <div className="art-stamp">YOUR<br />CAMPUS<br />CALENDAR</div>
          <div className="art-note note-one"><span className="note-icon">♫</span><span>Open mic<br /><small>TONIGHT · 7:30</small></span></div>
          <div className="art-note note-two"><span className="note-icon">✳</span><span>Find your<br />next thing</span></div>
          <div className="art-sun" />
          <div className="art-ribbon">SHOW UP FOR SOMETHING NEW&nbsp; • &nbsp;SHOW UP FOR SOMETHING NEW&nbsp; • &nbsp;</div>
        </div>
      </section>
      <section className="upcoming-section" id="upcoming">
        <div className="section-heading"><div><p className="eyebrow">A LITTLE LOOK AHEAD</p><h2>Coming up on campus</h2></div><span className="section-count">01 — 03</span></div>
        <div className="event-list">{events.map(event => <EventPreview event={event} key={event.title} />)}</div>
      </section>
      <section className="how-section" id="how-it-works"><span>01 / FIND IT</span><p>Discover something happening around campus, then show up.</p><button className="button button-outline" onClick={() => navigate("login")}>Explore CampusVibes <span aria-hidden="true">→</span></button></section>
    </main>
  );
}

function LoginPreview({ navigate }) {
  function handleSubmit(event) {
    event.preventDefault();
    navigate("dashboard");
  }

  return (
    <main className="auth-layout">
      <div className="auth-side-copy"><p className="eyebrow"><span className="live-dot" /> YOUR CAMPUS STARTS HERE</p><h1>Good to<br />see you <span>again.</span></h1><p>Log in to get back to the people and plans that make campus yours.</p></div>
      <section aria-labelledby="login-title" className="auth-panel">
        <span className="prototype-tag">PROTOTYPE FLOW</span>
        <h2 id="login-title">Welcome back</h2>
        <p className="panel-copy">This screen previews the login path. Authentication will be connected in a follow-up.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Campus email</label>
          <input autoComplete="email" id="email" placeholder="you@campus.edu" required type="email" />
          <label htmlFor="password">Password</label>
          <input autoComplete="current-password" id="password" minLength="8" placeholder="At least 8 characters" required type="password" />
          <button className="button button-dark auth-submit" type="submit">Continue to preview <span aria-hidden="true">→</span></button>
        </form>
        <button className="back-link" onClick={() => navigate("landing")}>← Back to CampusVibes</button>
      </section>
    </main>
  );
}

function DashboardPreview({ navigate }) {
  return (
    <main className="dashboard-shell">
      <div className="dashboard-heading"><div><p className="eyebrow">YOUR CAMPUS, THIS WEEK</p><h1>There’s more<br />out <span>there.</span></h1></div><div className="preview-label"><span className="live-dot" /> DASHBOARD PREVIEW</div></div>
      <div className="dashboard-toolbar"><span>UP NEXT <strong>03 EVENTS</strong></span><button className="button button-dark" onClick={() => navigate("landing")}>Explore campus <span aria-hidden="true">→</span></button></div>
      <div className="dashboard-events">{events.map(event => <EventPreview event={event} key={event.title} />)}</div>
      <p className="dashboard-note">You’re viewing seeded preview events. Real event data and account access will be added in follow-up work.</p>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="app-frame">
      <Header navigate={setPage} page={page} />
      {page === "landing" && <Landing navigate={setPage} />}
      {page === "login" && <LoginPreview navigate={setPage} />}
      {page === "dashboard" && <DashboardPreview navigate={setPage} />}
      <footer className="site-footer"><Brand onClick={() => setPage("landing")} /><span>Find your people. Find your place.</span><span>© CampusVibes · Student project</span></footer>
    </div>
  );
}