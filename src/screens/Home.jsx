import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Fingerprint,
  ScanLine,
  ShieldCheck,
  CheckCheck,
  Clock3,
  Zap,
  LockKeyhole,
  Search,
  Plus,
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";
import { cases } from "../data.js";
import { stats, caseScore } from "../game.js";
import { Glyph } from "../components/ui.jsx";
function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit-cross cross-one">+</div>
      <div className="orbit-cross cross-two">+</div>
      <div className="file-back">
        <div className="file-tab">BIZCORP / CONFIDENTIAL</div>
        <div className="file-label">
          HUMAN
          <br />
          INTELLIGENCE<span>CASE FILE № 001—004</span>
        </div>
        <div className="file-barcode" />
      </div>
      <div className="social-proof">
        <div className="post-top">
          <span className="mini-avatar">G</span>
          <span>
            <b>glen.in.the.wild</b>
            <small>Just living my best life.</small>
          </span>
          <span className="post-dots">•••</span>
        </div>
        <div
          className="hero-photo"
          style={{ backgroundImage: `url(${cases[0].posts[1].image})` }}
        >
          <span className="photo-bracket tl" />
          <span className="photo-bracket br" />
          <div className="photo-tag">
            <ScanLine size={14} /> PERSONAL DETAILS DETECTED
          </div>
        </div>
        <div className="social-actions">
          <Heart size={18} />
          <MessageCircle size={18} />
          <ArrowUpRight size={18} />
          <Bookmark size={18} />
        </div>
        <p>
          A birthday to remember. <span>#family</span>
        </p>
      </div>
      <div className="clue-sticker">
        <span className="sticker-dot" /> EVERY POST
        <br />
        <b>TELLS A STORY.</b>
        <svg viewBox="0 0 70 34">
          <path
            d="M4 8C28 2 24 37 57 18M47 15l13 2-7 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="password-ticket">
        <div>
          <LockKeyhole size={14} />
          <span>PASSWORD RECOVERED</span>
          <span className="ticket-light" />
        </div>
        <strong>
          ••••••••<span>35</span>
        </strong>
        <div className="ticket-bottom">
          <span>THE CLUES WERE ALWAYS THERE.</span>
          <ArrowUpRight size={17} />
        </div>
      </div>
      <div className="round-stamp">
        <Fingerprint size={28} />
        <span>
          THINK LIKE A<br />
          DETECTIVE
        </span>
      </div>
      <span className="art-caption">FIG. 01 — THE ANATOMY OF AN OVERSHARE</span>
    </div>
  );
}
function CaseArt({ item }) {
  return (
    <div className={`case-art ${item.color}`} aria-hidden="true">
      <span className="art-code">OS / 00{cases.indexOf(item) + 1}</span>
      <span className="art-cross">+</span>
      <div className="case-art-lines" />
      <Glyph name={item.icon} className="case-glyph" strokeWidth={1.25} />
      <span className="art-person">{item.name.toUpperCase()}</span>
      <span className="art-mini">
        EXHIBIT {String.fromCharCode(65 + cases.indexOf(item))}
      </span>
    </div>
  );
}
export default function Home({ progress, navigate, onHelp }) {
  const [filter, setFilter] = useState("all");
  const { complete, xp } = stats(progress);
  const next = cases.find((c) => !progress.cases[c.id]?.protected) || cases[0];
  const visible = cases.filter(
    (c) =>
      filter === "all" ||
      (filter === "solved"
        ? progress.cases[c.id]?.protected
        : !progress.cases[c.id]?.protected),
  );
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> A DIGITAL DETECTIVE GAME
          </div>
          <h1>
            Your life.
            <br />
            Their <span className="orange">clues.</span>
            <span className="headline-star">✳</span>
          </h1>
          <p className="hero-description">
            A birthday. A favorite band. An innocent photo.
            <br className="desktop-br" /> How much would it take to crack your
            password?
          </p>
          <div className="hero-actions">
            <button
              className="button primary"
              onClick={() =>
                navigate(complete === 4 ? "progress" : "case/" + next.id)
              }
            >
              {complete === 4
                ? "View your field report"
                : Object.keys(progress.cases).length
                  ? "Continue investigating"
                  : "Start investigating"}
              <ArrowUpRight size={21} />
            </button>
            <button className="text-button" onClick={onHelp}>
              <span className="play-circle">▶</span> How to play
            </button>
          </div>
          <div className="hero-meta">
            <span>
              <Clock3 size={14} />
              12 min experience
            </span>
            <span className="meta-divider" />
            <span>
              <ShieldCheck size={14} />
              Real-world skills
            </span>
            <span className="meta-divider" />
            <span>No sign-up</span>
          </div>
        </div>
        <HeroArt />
      </section>
      <div className="ticker">
        <div className="container ticker-inner">
          <span>PUBLIC POSTS.</span>
          <Plus />
          <span>PRIVATE DETAILS.</span>
          <Plus />
          <span>ONE BIG WAKE-UP CALL.</span>
          <span className="ticker-end">
            CONNECT THE DOTS <ArrowUpRight size={19} />
          </span>
        </div>
      </div>
      <section className="case-section container" id="case-files">
        <div className="section-top">
          <div>
            <div className="eyebrow muted">THE INVESTIGATION</div>
            <h2>Four people. No secrets.</h2>
            <p>Step into their feeds. Spot the clues. See what’s at risk.</p>
          </div>
          <div className="case-count">
            <strong>{String(complete).padStart(2, "0")}</strong>
            <span>
              / 04
              <br />
              CASES SOLVED
            </span>
            <div
              className="small-progress"
              style={{ "--progress": `${complete * 25}%` }}
            />
          </div>
        </div>
        <div className="case-toolbar">
          <div className="filter-tabs" aria-label="Filter cases">
            {[
              ["all", "All cases"],
              ["unsolved", "Unsolved"],
              ["solved", "Solved"],
            ].map(([value, label]) => (
              <button
                key={value}
                aria-pressed={filter === value}
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
              >
                {label}
                {value === "all" && <span>4</span>}
              </button>
            ))}
          </div>
          <span className="toolbar-note">
            <span className="live-dot" /> YOUR PROGRESS SAVES AUTOMATICALLY
          </span>
        </div>
        <div className="case-grid">
          {visible.map((item) => {
            const state = progress.cases[item.id];
            return (
              <button
                className={`case-card ${state?.protected ? "is-solved" : ""}`}
                key={item.id}
                onClick={() => navigate("case/" + item.id)}
              >
                <CaseArt item={item} />
                <div className="case-card-content">
                  <div className="case-kicker">
                    <span>CASE 0{cases.indexOf(item) + 1}</span>
                    <span className={`difficulty ${item.level.toLowerCase()}`}>
                      <i />
                      {state?.protected ? "Solved" : item.level}
                    </span>
                  </div>
                  <h3>
                    {item.name}
                    <ArrowUpRight size={22} />
                  </h3>
                  <span className="case-role">{item.role}</span>
                  <p>{item.description}</p>
                  <div className="card-footer">
                    <span>
                      <Clock3 size={13} />
                      {item.minutes} min{" "}
                      <span className="dot-separator">·</span>3 posts
                    </span>
                    <span>
                      {state?.protected ? (
                        <>
                          <CheckCheck size={15} /> {caseScore(state)} XP
                        </>
                      ) : state?.reviewed?.length ? (
                        "Continue case"
                      ) : (
                        "Open case"
                      )}
                      {!state?.protected && <ArrowRight size={15} />}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {!visible.length && (
          <div className="empty-state">
            <Search size={30} />
            <h3>
              {filter === "solved"
                ? "Every detective starts somewhere."
                : "All cases closed. Nice work."}
            </h3>
            <p>
              {filter === "solved"
                ? "Solve your first case to see it here."
                : "Your field report is ready in My progress."}
            </p>
            <button
              className="button secondary"
              onClick={() =>
                filter === "solved" ? setFilter("all") : navigate("progress")
              }
            >
              {filter === "solved" ? "Explore cases" : "View field report"}
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>
      <section className="bottom-banner container">
        <div className="banner-icon">
          <ShieldCheck size={34} strokeWidth={1.5} />
        </div>
        <div>
          <div className="eyebrow">THE REAL MISSION</div>
          <h2>Crack the habit. Protect your world.</h2>
          <p>You’ll leave with a sharper eye—and a stronger defense.</p>
        </div>
        <button className="text-button" onClick={() => navigate("playbook")}>
          Your security playbook <ArrowUpRight size={20} />
        </button>
      </section>
      <div className="container progress-footnote">
        <span>
          <Zap size={14} />
          {xp} XP EARNED
        </span>
        <span>Curiosity is your best tool. No technical skills needed.</span>
      </div>
    </>
  );
}
