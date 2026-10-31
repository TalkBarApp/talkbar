import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledById: string;
  closeLabel: string;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, labelledById, closeLabel, children }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  // Focus the first focusable field once, when the modal opens.
  // Kept separate from the keydown effect so it does not re-run (and steal
  // focus back to the first field) on every parent re-render.
  useEffect(() => {
    if (!open) return;
    const focusTarget = panelRef.current?.querySelector<HTMLElement>(
      "input, textarea, button:not([data-modal-close])",
    );
    const handle = window.setTimeout(() => focusTarget?.focus(), 50);
    return () => window.clearTimeout(handle);
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6 transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-labelledby={labelledById}
        className={`relative flex w-full max-h-[calc(100dvh-1rem)] flex-col overflow-hidden sm:max-h-[88vh] sm:max-w-md bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-soft transition-all duration-200 ${
          open ? "translate-y-0 sm:scale-100" : "translate-y-4 sm:translate-y-0 sm:scale-95"
        }`}
      >
        <button
          type="button"
          data-modal-close
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
