import { ArrowLeft, ExternalLink } from "lucide-react";
import { cases, playbook } from "../data.js";
import { Glyph } from "../components/ui.jsx";
export default function Playbook({ navigate }) {
  return (
    <main className="container inner-page">
      <div className="eyebrow">TAKE THE LEARNING WITH YOU</div>
      <h1>
        Your security
        <br />
        <span className="orange">playbook.</span>
      </h1>
      <p className="page-lead">Four small habits. A much stronger defense.</p>
      <div className="playbook-grid">
        {playbook.map((p, i) => (
          <article key={p.title} className="playbook-card">
            <div className={`playbook-symbol ${cases[i].color}`}>
              <Glyph name={p.icon} size={33} strokeWidth={1.5} />
              <span>0{i + 1}</span>
            </div>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="resource-panel">
        <div>
          <span className="eyebrow">MAKE YOUR NEXT MOVE</span>
          <h2>Start with your email.</h2>
          <p>
            It often holds the keys to your other accounts. Give it a unique
            password and enable MFA today.
          </p>
        </div>
        <a
          className="button secondary"
          href="https://www.cisa.gov/secure-our-world"
          target="_blank"
          rel="noreferrer"
        >
          Explore CISA resources <ExternalLink size={17} />
        </a>
      </div>
      <button className="text-button" onClick={() => navigate("home")}>
        <ArrowLeft size={17} /> Back to the investigation
      </button>
    </main>
  );
}
