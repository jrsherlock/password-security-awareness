import { useEffect, useRef } from "react";
import {
  Fingerprint,
  Eye,
  ScanLine,
  Sparkles,
  ShieldCheck,
  KeyRound,
  X,
} from "lucide-react";

const icons = {
  fingerprint: Fingerprint,
  eye: Eye,
  scan: ScanLine,
  sparkles: Sparkles,
  key: KeyRound,
  shield: ShieldCheck,
};
export const Glyph = ({ name, ...props }) => {
  const Icon = icons[name] || Fingerprint;
  return <Icon {...props} />;
};
export function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      ✳
    </span>
  );
}
export function Modal({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "wide" : ""}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="modal-title"
    >
      <div className="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
