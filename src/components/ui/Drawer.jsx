import { useEffect } from "react";

export default function Drawer({ open, onClose, title, children, side = "right" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside
        role="dialog" aria-modal="true" aria-label={title}
        className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-full max-w-md bg-surface border-${side === "left" ? "r" : "l"} border-border shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20" aria-label="Close panel">✕</button>
        </div>
        <div className="h-[calc(100%-65px)] overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}
