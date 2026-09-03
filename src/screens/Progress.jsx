import {
  Fingerprint,
  CheckCheck,
  Download,
  Zap,
  ChevronRight,
  Target,
} from "lucide-react";
import { cases } from "../data.js";
import { stats, caseScore } from "../game.js";
import { Glyph } from "../components/ui.jsx";
export default function Progress({ progress, navigate }) {
  const { complete, xp } = stats(progress);
  const all = complete === 4;
  const exportReport = () => {
    const report = [
      "# OVERSHARED — Learning field report",
      `Exported: ${new Date().toLocaleDateString()}`,
      `Cases completed: ${complete}/4`,
      `Experience points: ${xp}/1200`,
      "",
      "This is a local practice record, not a verified certification.",
      "",
      ...cases.flatMap((c) => [
        `## ${c.name}: ${progress.cases[c.id]?.protected ? "Completed" : "Not completed"}`,
        `XP: ${caseScore(progress.cases[c.id])}`,
        c.action,
        "",
      ]),
      "## Next action",
      "Choose one account to secure with a unique password and MFA.",
      "",
      "Source: https://www.cisa.gov/secure-our-world",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([report], { type: "text/markdown" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "overshared-field-report.md";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <main className="container inner-page">
      <div className="eyebrow">YOUR INVESTIGATOR PROFILE</div>
      <h1>
        A sharper eye.
        <br />
        <span className="orange">A safer you.</span>
      </h1>
      <p className="page-lead">
        Every connection counts. Here’s your investigation so far.
      </p>
      <div className="profile-grid">
        <section className="rank-card">
          <div className="rank-symbol">
            <Fingerprint size={65} strokeWidth={1.2} />
          </div>
          <div className="eyebrow">CURRENT RANK</div>
          <h2>
            {all
              ? "Digital Defender"
              : complete >= 2
                ? "Clue Connector"
                : complete
                  ? "Sharp Observer"
                  : "Fresh Eyes"}
          </h2>
          <p>
            {all
              ? "All four cases closed. Take your new habits into the real world."
              : "Keep investigating to earn your Digital Defender badge."}
          </p>
          <div className="rank-progress">
            <i style={{ width: `${complete * 25}%` }} />
          </div>
          <span>{complete} OF 4 CASES COMPLETED</span>
          <div className="xp-total">
            <Zap size={22} />
            <strong>{xp}</strong>
            <span>/ 1,200 XP</span>
          </div>
        </section>
        <section className="report-cases">
          <h2>Your case record</h2>
          {cases.map((c, i) => (
            <button
              className="report-row"
              key={c.id}
              onClick={() => navigate("case/" + c.id)}
            >
              <span className={`report-icon ${c.color}`}>
                <Glyph name={c.icon} size={22} />
              </span>
              <span>
                <small>CASE 0{i + 1}</small>
                <strong>
                  {c.name} <span>· {c.role}</span>
                </strong>
              </span>
              <span>
                {progress.cases[c.id]?.protected ? (
                  <>
                    <CheckCheck size={17} />
                    {caseScore(progress.cases[c.id])} XP
                  </>
                ) : progress.cases[c.id]?.reviewed.length ? (
                  "In progress"
                ) : (
                  "Not started"
                )}
                <ChevronRight size={17} />
              </span>
            </button>
          ))}
          <div className="report-export">
            <p>Keep a record of what you’ve learned.</p>
            <button className="button secondary" onClick={exportReport}>
              Download field report <Download size={16} />
            </button>
          </div>
        </section>
      </div>
      <section className="scoring-note">
        <Target size={24} />
        <div>
          <h3>Learning comes first.</h3>
          <p>
            Each case starts at 300 XP. Extra password attempts cost 15 XP;
            hints cost 25 XP; extra protection attempts cost 20 XP. Completed
            cases always earn at least 100 XP. No timer, no lives lost. Your
            progress stays on this device.
          </p>
        </div>
      </section>
    </main>
  );
}
