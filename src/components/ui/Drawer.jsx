import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Drawer({ open, onClose, title, children, side = "right" }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const restoreRef = useRef(null);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (e) => {
      if (e.key === "Escape") { onCloseRef.current?.(); return; }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  return (
    <div className={cn("fixed inset-0 z-[70] overflow-hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div className={cn("absolute inset-0 bg-foreground/40 transition-opacity duration-500", open ? "opacity-100" : "opacity-0")} onClick={onClose} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label={title}
        className={cn("absolute top-0 flex h-full w-full max-w-md flex-col border-border bg-background shadow-lift transition-[transform,visibility] duration-500 ease-premium", side === "left" ? "left-0 border-r" : "right-0 border-l", open ? "visible translate-x-0" : cn("invisible", side === "left" ? "-translate-x-full" : "translate-x-full"))}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em]">{title}</h2>
          <button ref={closeRef} onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center border border-border transition-colors hover:bg-surface-alt" aria-label={`Close ${title}`}><X size={18} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>
      </aside>
    </div>
  );
}
