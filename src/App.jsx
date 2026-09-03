import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  Check,
  CircleHelp,
  Download,
  Volume2,
  VolumeX,
  RotateCcw,
  Clock3,
  Zap,
  Trophy,
  BookOpen,
  WifiOff,
  ExternalLink,
} from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { cases } from "./data.js";
import {
  emptyCase,
  emptyProgress,
  readProgress,
  stats,
  STORAGE_KEY,
} from "./game.js";
import { Mark, Modal } from "./components/ui.jsx";
import Home from "./screens/Home.jsx";
import Investigation from "./screens/Investigation.jsx";
import Playbook from "./screens/Playbook.jsx";
import Progress from "./screens/Progress.jsx";

const routeFromHash = () => {
  const hash = window.location.hash.slice(1);
  return /^(case\/(glen|shanti|kyle|lance)|playbook|progress)$/.test(hash)
    ? hash
    : "home";
};
export default function App() {
  const [route, setRoute] = useState(routeFromHash);
  const [progress, setProgress] = useState(() => {
    try {
      return readProgress(window.localStorage);
    } catch {
      return emptyProgress();
    }
  });
  const [modal, setModal] = useState(null);
  const [storageError, setStorageError] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches,
  );
  const [online, setOnline] = useState(navigator.onLine);
  const audio = useRef(null);
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();
  const navigate = (target) => {
    window.location.hash = target === "home" ? "" : target;
    setRoute(target);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  useEffect(() => {
    const change = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    const install = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const didInstall = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    const connection = () => setOnline(navigator.onLine);
    window.addEventListener("beforeinstallprompt", install);
    window.addEventListener("appinstalled", didInstall);
    window.addEventListener("online", connection);
    window.addEventListener("offline", connection);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("beforeinstallprompt", install);
      window.removeEventListener("appinstalled", didInstall);
      window.removeEventListener("online", connection);
      window.removeEventListener("offline", connection);
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);
  useEffect(() => {
    const titles = {
      home: "A digital detective game",
      playbook: "Your security playbook",
      progress: "Your field report",
    };
    document.title = `OVERSHARED — ${titles[route] || "Case file: " + route.split("/")[1]}`;
    const main = document.querySelector("h1");
    if (main) {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
  }, [route]);
  const updateCase = (id, patch) =>
    setProgress((p) => ({
      ...p,
      cases: {
        ...p.cases,
        [id]: { ...(p.cases[id] || emptyCase()), ...patch },
      },
    }));
  const playSound = () => {
    if (!progress.sound) return;
    try {
      audio.current ||= new (
        window.AudioContext || window.webkitAudioContext
      )();
      const ctx = audio.current;
      ctx.resume();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(660, ctx.currentTime);
      oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.23);
    } catch {}
  };
  const install = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") setInstallPrompt(null);
    } else setModal("install");
  };
  const active = cases.find((c) => route === "case/" + c.id);
  const { xp } = stats(progress);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("h1")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <button
            className="brand"
            onClick={() => navigate("home")}
            aria-label="Overshared home"
          >
            <Mark />
            OVERSHARED<span className="brand-period">.</span>
          </button>
          <nav className="desktop-nav" aria-label="Main navigation">
            <button
              className={route === "home" || active ? "active" : ""}
              onClick={() => navigate("home")}
            >
              Case files
            </button>
            <button
              className={route === "playbook" ? "active" : ""}
              onClick={() => navigate("playbook")}
            >
              The playbook
            </button>
            <button
              className={route === "progress" ? "active" : ""}
              onClick={() => navigate("progress")}
            >
              My progress
            </button>
          </nav>
          <div className="header-actions">
            <button
              className="xp-badge"
              onClick={() => navigate("progress")}
              aria-label={`${xp} experience points. View progress`}
            >
              <Zap size={15} />
              {xp} XP
            </button>
            <span className="header-divider" />
            <button
              className="icon-button sound-button"
              onClick={() => setProgress((p) => ({ ...p, sound: !p.sound }))}
              aria-label={progress.sound ? "Mute sound" : "Enable sound"}
            >
              {progress.sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              className="icon-button"
              onClick={() => setModal("help")}
              aria-label="How to play"
            >
              <CircleHelp size={19} />
            </button>
          </div>
        </div>
      </header>
      {!online && (
        <div className="connection-banner">
          <WifiOff size={14} />
          {offlineReady
            ? "You’re offline. Your investigation can continue."
            : "You’re offline. Previously loaded content may still be available."}
        </div>
      )}
      {storageError && (
        <div role="status" className="connection-banner">
          Progress can’t be saved in this browser. Keep this tab open to
          continue.
        </div>
      )}
      {needRefresh && (
        <div className="connection-banner">
          A fresh edition is ready.
          <button onClick={() => updateServiceWorker(true)}>Update game</button>
        </div>
      )}
      <div id="main-content">
        {route === "home" ? (
          <main>
            <Home
              progress={progress}
              navigate={navigate}
              onHelp={() => setModal("help")}
            />
          </main>
        ) : route === "playbook" ? (
          <Playbook navigate={navigate} />
        ) : route === "progress" ? (
          <Progress progress={progress} navigate={navigate} />
        ) : active ? (
          <Investigation
            key={active.id}
            item={active}
            state={progress.cases[active.id] || emptyCase()}
            update={(patch) => updateCase(active.id, patch)}
            navigate={navigate}
            playSound={playSound}
          />
        ) : null}
      </div>
      <footer className="site-footer container">
        <div>
          <button
            className="brand footer-brand"
            onClick={() => navigate("home")}
          >
            <Mark />
            OVERSHARED.
          </button>
          <span>A little awareness changes everything.</span>
        </div>
        <div className="footer-links">
          <span className="fiction-label">A FICTIONAL TRAINING EXPERIENCE</span>
          <button onClick={() => setModal("about")}>About</button>
          <button onClick={install}>
            <Download size={14} />
            {installed ? "App installed" : "Install game"}
          </button>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <button
          className={route === "home" || active ? "active" : ""}
          onClick={() => navigate("home")}
        >
          <Fingerprint size={22} />
          Case files
        </button>
        <button
          className={route === "playbook" ? "active" : ""}
          onClick={() => navigate("playbook")}
        >
          <BookOpen size={22} />
          Playbook
        </button>
        <button
          className={route === "progress" ? "active" : ""}
          onClick={() => navigate("progress")}
        >
          <Trophy size={22} />
          My progress
        </button>
      </nav>
      {modal === "help" && (
        <Modal
          title="A little curiosity goes a long way."
          onClose={() => setModal(null)}
        >
          <div className="modal-content">
            <p className="modal-lead">
              You’re reviewing a fictional exposure at BizCorp. Four employees.
              Twelve public posts. What can you uncover?
            </p>
            <ol className="howto-list">
              <li>
                <span>01</span>
                <div>
                  <h3>Look closer.</h3>
                  <p>
                    Inspect the posts and log the details that match the exposed
                    password hint.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Connect the dots.</h3>
                  <p>
                    Use your evidence board to assemble the fictional password.
                    Hints are here if you need them.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Make it matter.</h3>
                  <p>
                    Choose the strongest protective action to close each case
                    and earn XP.
                  </p>
                </div>
              </li>
            </ol>
            <div className="help-note">
              <Clock3 size={19} />
              <span>
                About 12 minutes. No countdown. Pick any case.
                <br />
                Your progress saves on this device.
              </span>
            </div>
            <button
              className="button primary"
              onClick={() => {
                setModal(null);
                navigate(
                  "case/" +
                    (
                      cases.find((c) => !progress.cases[c.id]?.protected) ||
                      cases[0]
                    ).id,
                );
              }}
            >
              Let’s investigate <ArrowRight size={18} />
            </button>
          </div>
        </Modal>
      )}
      {modal === "install" && (
        <Modal
          title={
            installed
              ? "Your game is installed."
              : "A pocket-sized investigation."
          }
          onClose={() => setModal(null)}
        >
          <div className="modal-content">
            <div className="install-icon">
              <Fingerprint size={45} />
            </div>
            <p className="modal-lead">
              Add OVERSHARED to your home screen for an app-like experience.
            </p>
            <ol className="install-steps">
              <li>
                <b>iPhone or iPad:</b> open in Safari, tap Share, then Add to
                Home Screen.
              </li>
              <li>
                <b>Android:</b> open the browser menu and choose Install app or
                Add to Home screen.
              </li>
              <li>
                <b>Desktop:</b> use the install icon in your browser’s address
                bar, if available.
              </li>
            </ol>
            <p className="help-note">
              <ShieldCheck size={20} />
              {offlineReady
                ? "Your game is cached and ready for offline play."
                : "Open the game online once and wait for the offline files to finish saving."}
            </p>
            <button className="button primary" onClick={() => setModal(null)}>
              Got it <Check size={17} />
            </button>
          </div>
        </Modal>
      )}
      {modal === "about" && (
        <Modal
          title="Awareness, through experience."
          onClose={() => setModal(null)}
        >
          <div className="modal-content">
            <p>
              OVERSHARED is a self-paced password security game adapted from J.
              R. Sherlock’s Password Security Awareness project. The original
              characters and social-post artwork are retained; the investigation
              and learning experience have been rebuilt.
            </p>
            <p>
              All case credentials are fictional and checked locally. The game
              never asks for a real password. Progress and sound preferences are
              stored only in this browser; there is no account, analytics, or
              server submission.
            </p>
            <p>
              Case timestamps are part of an archived story, not current facts.
              Password guesses ignore capitalization and common separators to
              keep the focus on learning. Real passwords are usually
              case-sensitive.
            </p>
            <div className="about-links">
              <a
                href="https://github.com/jrsherlock/password-security-awareness"
                target="_blank"
                rel="noreferrer"
              >
                Original project <ExternalLink size={15} />
              </a>
              <a
                href="https://www.cisa.gov/secure-our-world"
                target="_blank"
                rel="noreferrer"
              >
                Security guidance: CISA <ExternalLink size={15} />
              </a>
            </div>
            <button className="reset-button" onClick={() => setModal("reset")}>
              <RotateCcw size={16} />
              Reset my learning progress
            </button>
          </div>
        </Modal>
      )}
      {modal === "reset" && (
        <Modal
          title="Start a fresh investigation?"
          onClose={() => setModal(null)}
        >
          <div className="modal-content">
            <p>
              This clears all case progress and XP saved on this device. You can
              download your field report from My progress first.
            </p>
            <div className="modal-actions">
              <button
                className="button secondary"
                onClick={() => setModal(null)}
              >
                Keep my progress
              </button>
              <button
                className="button primary"
                onClick={() => {
                  setProgress(emptyProgress());
                  setModal(null);
                  navigate("home");
                }}
              >
                Reset progress <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
