"use client";
import React, { useState, useRef } from "react";

type MaskType = "phone" | "cpf" | "cep" | "card";

function applyMask(value: string, mask: MaskType): string {
  const digits = value.replace(/\D/g, "");
  switch (mask) {
    case "phone": {
      if (digits.length <= 10) {
        return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
      }
      return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
    case "cpf":
      return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4").trim().replace(/-$/, "").replace(/\.$/, "");
    case "cep":
      return digits.replace(/^(\d{5})(\d{0,3})/, "$1-$2").trim().replace(/-$/, "");
    case "card":
      return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    default:
      return value;
  }
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  mask?: MaskType;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const inputCss = `
  .ui-input-root { display: flex; flex-direction: column; gap: 5px; font-family: var(--font-poppins); }
  .ui-input-label { font-size: 13px; font-weight: 500; color: var(--eerie-black); }
  .ui-input-wrap {
    display: flex; align-items: center;
    border: 1.5px solid #ddd; border-radius: 8px;
    background: var(--white); overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .ui-input-wrap:focus-within { border-color: var(--salmon-pink); box-shadow: 0 0 0 3px hsl(353,100%,92%); }
  .ui-input-wrap.error { border-color: var(--bittersweet); }
  .ui-input-wrap.error:focus-within { box-shadow: 0 0 0 3px hsl(0,100%,92%); }
  .ui-input-field {
    flex: 1; min-width: 0; padding: 10px 12px;
    font-size: 13px; color: var(--onyx);
    background: transparent; border: none; outline: none;
    font-family: var(--font-poppins);
  }
  .ui-input-addon {
    padding: 0 10px; color: var(--sonic-silver); font-size: 16px;
    display: flex; align-items: center; flex-shrink: 0;
  }
  .ui-input-hint { font-size: 11px; color: var(--sonic-silver); }
  .ui-input-error { font-size: 11px; color: var(--bittersweet); }
`;

export function Input({
  label,
  error,
  hint,
  mask,
  leftAddon,
  rightAddon,
  onChange,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const [internal, setInternal] = useState(
    mask ? applyMask(String(defaultValue ?? ""), mask) : String(defaultValue ?? "")
  );
  const controlled = value !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = mask ? applyMask(raw, mask) : raw;
    if (!controlled) setInternal(masked);
    if (onChange) {
      const synth = Object.assign({}, e, { target: Object.assign({}, e.target, { value: masked }) });
      onChange(synth as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <style>{inputCss}</style>
      <div className="ui-input-root">
        {label && <label className="ui-input-label">{label}</label>}
        <div className={`ui-input-wrap${error ? " error" : ""}`}>
          {leftAddon && <span className="ui-input-addon">{leftAddon}</span>}
          <input
            className="ui-input-field"
            value={controlled ? (mask ? applyMask(String(value), mask) : value) : internal}
            onChange={handleChange}
            {...props}
          />
          {rightAddon && <span className="ui-input-addon">{rightAddon}</span>}
        </div>
        {error && <span className="ui-input-error">{error}</span>}
        {!error && hint && <span className="ui-input-hint">{hint}</span>}
      </div>
    </>
  );
}

interface PasswordInputProps extends Omit<InputProps, "type"> {}

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      rightAddon={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--sonic-silver)", padding: 0, lineHeight: 1 }}
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? "🙈" : "👁️"}
        </button>
      }
    />
  );
}

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function FormField({ children, label, error, hint, required }: FormFieldProps) {
  return (
    <>
      <style>{inputCss}</style>
      <div className="ui-input-root">
        {label && (
          <label className="ui-input-label">
            {label}
            {required && <span style={{ color: "var(--bittersweet)", marginLeft: 2 }}>*</span>}
          </label>
        )}
        {children}
        {error && <span className="ui-input-error">{error}</span>}
        {!error && hint && <span className="ui-input-hint">{hint}</span>}
      </div>
    </>
  );
}
