"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<ToastItem, "id">) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastCtx = createContext<ToastContextValue | null>(null);

const typeConfig: Record<ToastType, { icon: string; color: string; bg: string; border: string }> = {
  success: { icon: "✓", color: "hsl(152,51%,35%)", bg: "hsl(152,51%,94%)", border: "hsl(152,51%,52%)" },
  error:   { icon: "✕", color: "hsl(0,80%,40%)", bg: "hsl(0,80%,96%)", border: "var(--bittersweet)" },
  warning: { icon: "⚠", color: "hsl(38,92%,35%)", bg: "hsl(38,92%,94%)", border: "hsl(38,92%,55%)" },
  info:    { icon: "ℹ", color: "hsl(210,80%,40%)", bg: "hsl(210,80%,95%)", border: "hsl(210,80%,55%)" },
};

const toastCss = `
  .ui-toast-container {
    position: fixed; top: 16px; right: 16px; z-index: 9999;
    display: flex; flex-direction: column; gap: 10px;
    pointer-events: none;
  }
  .ui-toast {
    pointer-events: all;
    display: flex; gap: 12px;
    padding: 14px 16px; border-radius: 10px;
    border: 1px solid;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    min-width: 300px; max-width: 380px;
    position: relative; overflow: hidden;
    animation: ui-toast-in 0.3s ease both;
    font-family: var(--font-poppins);
  }
  @keyframes ui-toast-in {
    from { opacity:0; transform: translateX(120%); }
    to   { opacity:1; transform: translateX(0); }
  }
  .ui-toast-icon {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 1px;
    border: 1.5px solid currentColor;
  }
  .ui-toast-body { flex: 1; min-width: 0; }
  .ui-toast-title { font-size: 13px; font-weight: 700; margin-bottom: 2px; line-height: 1.3; }
  .ui-toast-msg { font-size: 12px; line-height: 1.5; opacity: 0.85; }
  .ui-toast-close {
    flex-shrink: 0; border: none; background: none;
    cursor: pointer; font-size: 14px; color: currentColor;
    opacity: 0.5; padding: 0; line-height: 1; align-self: flex-start;
    margin-top: 2px; transition: opacity 0.15s ease;
  }
  .ui-toast-close:hover { opacity: 1; }
  .ui-toast-progress {
    position: absolute; bottom: 0; left: 0; height: 3px;
    background: currentColor; opacity: 0.35;
    animation: ui-toast-progress linear forwards;
    transform-origin: left;
  }
  @keyframes ui-toast-progress { from { width: 100%; } to { width: 0%; } }
`;

function ToastEl({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const cfg = typeConfig[item.type];
  const duration = item.duration ?? 4000;
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => onDismiss(item.id), duration);
    return () => clearTimeout(t);
  }, [item.id, duration, onDismiss]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.animationDuration = `${duration}ms`;
    }
  }, [duration]);

  return (
    <div
      className="ui-toast"
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
    >
      <div className="ui-toast-icon">{cfg.icon}</div>
      <div className="ui-toast-body">
        {item.title && <div className="ui-toast-title">{item.title}</div>}
        <div className="ui-toast-msg">{item.message}</div>
      </div>
      <button className="ui-toast-close" onClick={() => onDismiss(item.id)}>✕</button>
      <div ref={progressRef} className="ui-toast-progress" />
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((opts: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
  }, []);

  const ctx: ToastContextValue = {
    toast: add,
    success: (message, title) => add({ type: "success", message, title }),
    error:   (message, title) => add({ type: "error", message, title }),
    warning: (message, title) => add({ type: "warning", message, title }),
    info:    (message, title) => add({ type: "info", message, title }),
  };

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <style>{toastCss}</style>
      <div className="ui-toast-container">
        {toasts.map((t) => (
          <ToastEl key={t.id} item={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
