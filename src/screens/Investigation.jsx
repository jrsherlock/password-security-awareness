import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ScanLine,
  ShieldCheck,
  KeyRound,
  Check,
  CheckCheck,
  CircleHelp,
  Search,
  Plus,
  BookOpen,
  Info,
} from "lucide-react";
import { cases } from "../data.js";
import { checkAnswer, caseScore } from "../game.js";
import { Glyph, Modal } from "../components/ui.jsx";
export default function Investigation({
  item,
  state,
  update,
  navigate,
  playSound,
}) {
  const [postIndex, setPostIndex] = useState(null);
  const [observation, setObservation] = useState(null);
  const [postFeedback, setPostFeedback] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [choice, setChoice] = useState(null);
  const [protectionFeedback, setProtectionFeedback] = useState("");
  const [zoom, setZoom] = useState(false);
  const completeClues = item.clues.filter((c) =>
    state.reviewed.includes(c.post),
  );
  const ready = state.reviewed.length === 3;
  const post = postIndex !== null ? item.posts[postIndex] : null;
  const openPost = (i) => {
    setPostIndex(i);
    setObservation(null);
    setPostFeedback("");
    setZoom(false);
  };
  const submitObservation = () => {
    if (observation === post.correct) {
      if (!state.reviewed.includes(postIndex))
        update({ reviewed: [...state.reviewed, postIndex] });
      setPostFeedback("correct");
      playSound();
    } else setPostFeedback("wrong");
  };
  const submitPassword = (e) => {
    e.preventDefault();
    if (!answer.trim() || !ready) return;
    const correct = checkAnswer(answer, item.answer);
    update({
      attempts: state.attempts + 1,
      ...(correct ? { cracked: true } : {}),
    });
    setFeedback(correct ? "correct" : "wrong");
    if (correct) playSound();
  };
  const submitProtection = () => {
    if (choice === null) return;
    const correct = choice === item.correct;
    update({
      protectionAttempts: state.protectionAttempts + 1,
      ...(correct ? { protected: true } : {}),
    });
    setProtectionFeedback(correct ? "correct" : "wrong");
    if (correct) playSound();
  };
  const next = cases[cases.indexOf(item) + 1];
  useEffect(() => {
    if (state.protected) {
      document
        .querySelector(".case-complete h2")
        ?.focus({ preventScroll: true });
    } else if (state.cracked) {
      document.querySelector(".protection-section")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      document.querySelector(".assessment h3")?.focus({ preventScroll: true });
    }
  }, [state.cracked, state.protected]);
  return (
    <main className="container investigation">
      <button className="back-link" onClick={() => navigate("home")}>
        <ArrowLeft size={17} /> Back to case files
      </button>
      <div className="case-page-header">
        <div>
          <div className="eyebrow">
            CASE 0{cases.indexOf(item) + 1} <span className="slash">/</span>{" "}
            {item.tag}
          </div>
          <h1>{item.title}</h1>
          <p>{item.intro}</p>
        </div>
        <span className={`case-status ${state.protected ? "done" : ""}`}>
          {state.protected ? <ShieldCheck size={17} /> : <Search size={17} />}{" "}
          {state.protected ? "Case closed" : "Investigation open"}
        </span>
      </div>
      <div className="step-track">
        <span className={ready ? "done" : "current"}>
          <b>{ready ? <Check size={13} /> : "1"}</b>Collect evidence
        </span>
        <div />
        <span className={state.cracked ? "done" : ready ? "current" : ""}>
          <b>{state.cracked ? <Check size={13} /> : "2"}</b>Connect the clues
        </span>
        <div />
        <span
          className={state.protected ? "done" : state.cracked ? "current" : ""}
        >
          <b>{state.protected ? <Check size={13} /> : "3"}</b>Protect the
          account
        </span>
      </div>
      {!state.protected ? (
        <div className="investigation-grid">
          <section className="evidence-section">
            <div className="subsection-header">
              <h2>The public feed</h2>
              <span>{state.reviewed.length} / 3 REVIEWED</span>
            </div>
            <p className="section-description">
              Open each post. Look closely. Decide what matters.
            </p>
            <div className="evidence-grid">
              {item.posts.map((p, i) => (
                <button
                  key={p.title}
                  className={`evidence-card ${state.reviewed.includes(i) ? "reviewed" : ""}`}
                  onClick={() => openPost(i)}
                >
                  <div className="evidence-image">
                    <img src={p.image} alt="" />
                    <span className="evidence-index">0{i + 1}</span>
                    <span className="evidence-open">
                      <Search size={19} />
                    </span>
                  </div>
                  <div className="evidence-card-copy">
                    <span>
                      {p.platform}{" "}
                      {state.reviewed.includes(i) && <CheckCheck size={16} />}
                    </span>
                    <h3>{p.title}</h3>
                    <small>
                      {state.reviewed.includes(i)
                        ? "Evidence reviewed"
                        : "Inspect post"}
                      <ArrowUpRight size={15} />
                    </small>
                  </div>
                </button>
              ))}
            </div>
            <div className="simulation-note">
              <Info size={16} />
              <p>
                A fictional, archived training scenario. All answers come from
                these posts. Only use the simulated credentials in this game.
              </p>
            </div>
            <div className="learning-tip">
              <span className="eyebrow">DETECTIVE’S NOTE</span>
              <h3>Look beyond the caption.</h3>
              <p>
                Comments, hashtags, and the background of a photo can say just
                as much as the post itself.
              </p>
              <ScanLine size={42} strokeWidth={1} />
            </div>
          </section>
          <aside className="notebook">
            <div className="notebook-heading">
              <BookOpen size={20} />
              <h2>Your evidence board</h2>
              <span>0{cases.indexOf(item) + 1}</span>
            </div>
            <div className="hint-box">
              <span className="eyebrow">EXPOSED PASSWORD HINT</span>
              <p>“{item.hint}”</p>
            </div>
            <div className="clue-list">
              {item.clues.map((c) => (
                <div
                  key={c.id}
                  className={state.reviewed.includes(c.post) ? "collected" : ""}
                >
                  <span className="clue-checkbox">
                    {state.reviewed.includes(c.post) ? (
                      <Check size={13} />
                    ) : (
                      <Plus size={13} />
                    )}
                  </span>
                  <span>
                    <small>{c.label}</small>
                    <strong>
                      {state.reviewed.includes(c.post)
                        ? c.value
                        : "Not found yet"}
                    </strong>
                  </span>
                </div>
              ))}
            </div>
            <div className="clue-progress">
              <span>
                {completeClues.length} OF {item.clues.length} CLUES CONNECTED
              </span>
              <div>
                <i
                  style={{
                    width: `${(completeClues.length / item.clues.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            {!state.cracked ? (
              <form className="password-form" onSubmit={submitPassword}>
                <label htmlFor="password-guess">Connect the clues</label>
                <p>
                  {ready
                    ? item.format
                    : "Review all three posts to unlock the password puzzle."}
                </p>
                <div className="answer-input">
                  <KeyRound size={17} />
                  <input
                    id="password-guess"
                    name="fictional-password-guess"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setFeedback("");
                    }}
                    disabled={!ready}
                    placeholder="Enter the fictional password"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                </div>
                <button
                  className="button primary"
                  disabled={!ready || !answer.trim()}
                  type="submit"
                >
                  Test password <ArrowRight size={18} />
                </button>
                {feedback === "wrong" && (
                  <p className="feedback wrong" role="status">
                    Not quite. Follow the hint’s order and use the exact details
                    from your evidence board. Try again.
                  </p>
                )}
                <button
                  type="button"
                  className="hint-button"
                  disabled={state.hints >= 2}
                  onClick={() => update({ hints: state.hints + 1 })}
                >
                  <CircleHelp size={15} />
                  {state.hints >= 2 ? "All hints revealed" : "Need a nudge?"}
                  <span>−25 XP</span>
                </button>
                {state.hints > 0 && (
                  <p className="hint-reveal">
                    {state.hints === 1
                      ? "Each part of the exposed hint corresponds to a clue on your board. Keep that same order."
                      : `For this simulation, join: ${item.clues.map((c) => c.value).join(" + ")}.`}
                  </p>
                )}
              </form>
            ) : (
              <div className="cracked-block">
                <span className="success-label">
                  <CheckCheck size={18} /> PASSWORD RECOVERED
                </span>
                <code>{item.answer}</code>
                <p>
                  The secret was in plain sight. Now put that insight to work.
                </p>
              </div>
            )}
          </aside>
          {state.cracked && (
            <section className="protection-section">
              <div className="protection-intro">
                <span className="eyebrow">
                  <ShieldCheck size={15} /> THE REAL WIN
                </span>
                <h2>{item.lesson}</h2>
                <p>{item.takeaway}</p>
              </div>
              <div className="assessment">
                <h3 tabIndex={-1}>{item.question}</h3>
                <fieldset>
                  <legend className="sr-only">
                    Choose the strongest protective action
                  </legend>
                  {item.options.map((option, i) => (
                    <label
                      key={option}
                      className={`option ${choice === i ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="protection"
                        checked={choice === i}
                        onChange={() => {
                          setChoice(i);
                          setProtectionFeedback("");
                        }}
                      />
                      <span className="option-letter">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
                {protectionFeedback === "wrong" && (
                  <p className="feedback wrong" role="status">
                    {item.wrong}
                  </p>
                )}
                <button
                  className="button primary"
                  disabled={choice === null}
                  onClick={submitProtection}
                >
                  Protect the account <ShieldCheck size={18} />
                </button>
              </div>
            </section>
          )}
        </div>
      ) : (
        <section className="case-complete">
          <div className="completion-stamp">
            <ShieldCheck size={52} strokeWidth={1.25} />
          </div>
          <div className="eyebrow">CASE CLOSED. LESSON LEARNED.</div>
          <h2 tabIndex={-1}>Nice work, detective.</h2>
          <p className="completion-lesson">{item.lesson}</p>
          <p>{item.action}</p>
          <div className="completion-stats">
            <div>
              <strong>+{caseScore(state)}</strong>
              <span>XP EARNED</span>
            </div>
            <div>
              <strong>{state.reviewed.length}/3</strong>
              <span>POSTS REVIEWED</span>
            </div>
            <div>
              <strong>{state.attempts}</strong>
              <span>
                PASSWORD {state.attempts === 1 ? "ATTEMPT" : "ATTEMPTS"}
              </span>
            </div>
          </div>
          <div className="completion-actions">
            <button
              className="button primary"
              onClick={() => navigate(next ? "case/" + next.id : "progress")}
            >
              {next ? "Next case: " + next.name : "View my field report"}
              <ArrowRight size={19} />
            </button>
            <button className="text-button" onClick={() => navigate("home")}>
              All case files
            </button>
          </div>
          <button
            className="hint-button review-case"
            onClick={() => {
              setPostIndex(0);
              setObservation(null);
              setPostFeedback("");
            }}
          >
            Revisit the evidence <Search size={15} />
          </button>
        </section>
      )}
      {post && (
        <Modal
          wide
          title={`Evidence 0${postIndex + 1} · ${item.name}`}
          onClose={() => setPostIndex(null)}
        >
          <div className="evidence-modal-body">
            <div className={`source-post ${zoom ? "zoomed" : ""}`}>
              <button className="zoom-button" onClick={() => setZoom(!zoom)}>
                {zoom ? "Fit image" : "Enlarge image"}
                <Search size={15} />
              </button>
              <img
                src={post.image}
                alt={`${post.platform} post. Full accessible transcript follows.`}
              />
            </div>
            <div className="post-analysis">
              <div className="eyebrow">{post.platform} / ARCHIVED POST</div>
              <h3>{post.title}</h3>
              <details className="transcript" open>
                <summary>Read post transcript</summary>
                <p>{post.text}</p>
              </details>
              <h4>What does this post reveal?</h4>
              <fieldset>
                <legend className="sr-only">
                  Choose the relevant observation
                </legend>
                {post.observations.map((option, i) => (
                  <label
                    className={`option ${observation === i ? "selected" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="observation"
                      checked={observation === i}
                      onChange={() => {
                        setObservation(i);
                        setPostFeedback("");
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
              {postFeedback === "correct" ? (
                <div className="feedback correct" role="status">
                  <strong>
                    <Check size={17} />{" "}
                    {post.clueIds.length
                      ? "Clue added to your board"
                      : "Distraction ruled out"}
                  </strong>
                  <p>{post.explanation}</p>
                </div>
              ) : postFeedback === "wrong" ? (
                <p className="feedback wrong" role="status">
                  Take another look at the transcript and the password hint.
                  Separate what the post shows from what you’re assuming.
                </p>
              ) : null}
              {postFeedback === "correct" ? (
                <button
                  className="button primary"
                  onClick={() =>
                    postIndex < 2 ? openPost(postIndex + 1) : setPostIndex(null)
                  }
                >
                  {postIndex < 2 ? "Next post" : "Back to evidence board"}
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  className="button primary"
                  disabled={observation === null}
                  onClick={submitObservation}
                >
                  Log observation <Plus size={17} />
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
