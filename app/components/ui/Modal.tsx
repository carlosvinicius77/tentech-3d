"use client";
import React, { useEffect, useRef } from "react";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const maxWidths: Record<ModalSize, number> = { sm: 400, md: 560, lg: 760 };

const modalCss = `
  .ui-modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: ui-overlay-in 0.2s ease both;
  }
  @keyframes ui-overlay-in { from { opacity:0 } to { opacity:1 } }
  .ui-modal-card {
    background: var(--white);
    border-radius: 16px;
    width: 100%;
    max-height: 90vh;
    display: flex; flex-direction: column;
    box-shadow: 0 24px 60px rgba(0,0,0,0.3);
    animation: ui-modal-in 0.25s ease both;
    overflow: hidden;
  }
  @keyframes ui-modal-in {
    from { opacity:0; transform:scale(0.9) translateY(16px) }
    to   { opacity:1; transform:scale(1) translateY(0) }
  }
  .ui-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid var(--cultured);
    flex-shrink: 0;
  }
  .ui-modal-title { font-size: 16px; font-weight: 700; color: var(--eerie-black); font-family: var(--font-poppins); }
  .ui-modal-close {
    width: 32px; height: 32px; border-radius: 8px;
    border: none; background: var(--cultured);
    color: var(--onyx); font-size: 18px; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease;
  }
  .ui-modal-close:hover { background: var(--bittersweet); color: var(--white); }
  .ui-modal-body { padding: 24px; overflow-y: auto; flex: 1; }
`;

export function Modal({ open, onClose, title, size = "md", children, hideCloseButton }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <style>{modalCss}</style>
      <div
        className="ui-modal-overlay"
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
      >
        <div
          className="ui-modal-card"
          style={{ maxWidth: maxWidths[size] }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {(title || !hideCloseButton) && (
            <div className="ui-modal-header">
              <span className="ui-modal-title">{title}</span>
              {!hideCloseButton && (
                <button className="ui-modal-close" onClick={onClose} aria-label="Fechar">
                  ✕
                </button>
              )}
            </div>
          )}
          <div className="ui-modal-body">{children}</div>
        </div>
      </div>
    </>
  );
}
