import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledById: string;
  closeLabel: string;
  children: React.ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Safari does not focus a link or button on click, so the control that opened a
// modal is remembered from the click itself (capture phase, before any handler
// opens the modal). The hidden link that starts a download is skipped.
let lastClick: { control: HTMLElement | null; at: number } | null = null;
let trackingClicks = false;
const rememberClick = (event: MouseEvent) => {
  const control =
    event.target instanceof Element ? event.target.closest<HTMLElement>(FOCUSABLE) : null;
  if (control?.hidden) return;
  lastClick = { control, at: performance.now() };
};

// A modal opened by a click opens within moments of it; anything older was not
// the trigger, so a keyboard or programmatic open uses the focused element.
const CLICK_OPEN_WINDOW_MS = 1000;

// A trigger inside a menu that has since closed (the mobile drawer, whose
// role="dialog" panel drops aria-modal) is offscreen; its toggle gets focus.
const visibleReturnTarget = (control: HTMLElement) => {
  const menu = control.closest<HTMLElement>('[role="dialog"][aria-modal="false"][id]');
  return (menu && document.querySelector<HTMLElement>(`[aria-controls="${menu.id}"]`)) ?? control;
};

const Modal = ({ open, onClose, labelledById, closeLabel, children }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes; Tab and Shift+Tab wrap around inside the panel.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      const outside = !panel.contains(current);
      if (e.shiftKey && (outside || current === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (outside || current === last)) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (trackingClicks) return;
    trackingClicks = true;
    document.addEventListener("click", rememberClick, true);
  }, []);

  // Closing returns focus to whatever opened the modal: the control just
  // clicked, else the focused element (keyboard or programmatic opens).
  useEffect(() => {
    if (!open) return;
    const recent = lastClick && performance.now() - lastClick.at < CLICK_OPEN_WINDOW_MS;
    const clicked = recent && lastClick?.control?.isConnected ? lastClick.control : null;
    lastClick = null;
    const active = document.activeElement;
    const opener =
      clicked ?? (active instanceof HTMLElement && active !== document.body ? active : null);
    return () => {
      if (opener?.isConnected) visibleReturnTarget(opener).focus({ preventScroll: true });
    };
  }, [open]);

  // Focus the control marked `data-autofocus`, else the first field, once, when
  // the modal opens. Kept separate from the keydown effect so it does not
  // re-run (and steal focus back to the first field) on every parent re-render.
  useEffect(() => {
    if (!open) return;
    const focusTarget =
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
      panelRef.current?.querySelector<HTMLElement>(
        "input, textarea, button:not([data-modal-close])",
      );
    const handle = window.setTimeout(() => focusTarget?.focus(), 50);
    return () => window.clearTimeout(handle);
  }, [open]);

  return (
    <div
      // A closed modal stays mounted for its fade; `inert` keeps its fields and
      // links out of keyboard focus and screen readers.
      inert={!open}
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
