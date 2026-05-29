"use client";
import React, { useState, useRef, useEffect } from "react";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (key: string) => void;
}

const tabsCss = `
  .ui-tabs { font-family: var(--font-poppins); }
  .ui-tabs-header {
    display: flex; position: relative;
    border-bottom: 2px solid var(--cultured);
    overflow-x: auto; scrollbar-width: none;
  }
  .ui-tabs-header::-webkit-scrollbar { display: none; }
  .ui-tab-btn {
    padding: 10px 20px; font-size: 13px; font-weight: 500;
    color: var(--sonic-silver); white-space: nowrap;
    border: none; background: none; cursor: pointer;
    position: relative; transition: color 0.2s ease;
    font-family: var(--font-poppins); flex-shrink: 0;
    margin-bottom: -2px;
  }
  .ui-tab-btn:hover { color: var(--eerie-black); }
  .ui-tab-btn.active { color: var(--salmon-pink); font-weight: 600; }
  .ui-tab-indicator {
    position: absolute; bottom: 0; height: 2px;
    background: var(--salmon-pink); border-radius: 2px 2px 0 0;
    transition: left 0.25s ease, width 0.25s ease;
    pointer-events: none;
  }
  .ui-tabs-panel { padding-top: 20px; }
`;

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? "");
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = btnRefs.current[active];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [active, tabs]);

  const select = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  const current = tabs.find((t) => t.key === active);

  return (
    <>
      <style>{tabsCss}</style>
      <div className="ui-tabs">
        <div className="ui-tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              ref={(el) => { btnRefs.current[tab.key] = el; }}
              className={`ui-tab-btn${active === tab.key ? " active" : ""}`}
              onClick={() => select(tab.key)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className="ui-tab-indicator"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
        <div className="ui-tabs-panel">{current?.content}</div>
      </div>
    </>
  );
}
