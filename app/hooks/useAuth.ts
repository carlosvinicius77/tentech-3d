"use client";
import { useState, useCallback } from "react";

export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { score, label: "Fraca", color: "#ff3b30" };
  if (score <= 2) return { score, label: "Média", color: "#ff9f0a" };
  return { score, label: "Forte", color: "#34c759" };
}

function validateEmail(v: string) {
  if (!v) return "E-mail é obrigatório";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "E-mail inválido";
  return "";
}

function validatePassword(v: string) {
  if (!v) return "Senha é obrigatória";
  if (v.length < 8) return "Mínimo 8 caracteres";
  return "";
}

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs: Record<string, string> = {};
      const ee = validateEmail(email);
      if (ee) errs.email = ee;
      const pe = validatePassword(password);
      if (pe) errs.password = pe;
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
        document.cookie = `tentech_session=demo_user:customer; path=/; max-age=${maxAge}; SameSite=Lax`;
        window.location.href = "/account";
      }, 1200);
    },
    [email, password, rememberMe]
  );

  const clearError = useCallback((field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  return { email, setEmail, password, setPassword, showPassword, setShowPassword, rememberMe, setRememberMe, errors, loading, handleSubmit, clearError };
}

export function useRegisterForm() {
  const [fields, setFields] = useState({
    name: "", email: "", cpf: "", phone: "", password: "", confirmPassword: "",
    acceptTerms: false, acceptNews: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = useCallback((key: string, value: string | boolean) => {
    setFields((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs: Record<string, string> = {};
      if (!fields.name.trim()) errs.name = "Nome é obrigatório";
      const ee = validateEmail(fields.email);
      if (ee) errs.email = ee;
      const digits = fields.cpf.replace(/\D/g, "");
      if (digits.length !== 11) errs.cpf = "CPF inválido";
      if (fields.phone.replace(/\D/g, "").length < 10) errs.phone = "Telefone inválido";
      const pe = validatePassword(fields.password);
      if (pe) errs.password = pe;
      if (fields.password !== fields.confirmPassword) errs.confirmPassword = "Senhas não conferem";
      if (!fields.acceptTerms) errs.acceptTerms = "Aceite os termos para continuar";
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    },
    [fields]
  );

  const strength = getPasswordStrength(fields.password);

  return { fields, set, showPassword, setShowPassword, showConfirm, setShowConfirm, errors, loading, strength, handleSubmit };
}

export function useForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const ee = validateEmail(email);
      if (ee) { setError(ee); return; }
      setError("");
      setLoading(true);
      setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
    },
    [email]
  );

  return { email, setEmail, error, loading, submitted, handleSubmit };
}
