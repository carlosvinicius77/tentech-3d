"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPasswordStrength } from "@/app/hooks/useAuth";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const strength = getPasswordStrength(password);

  useEffect(() => {
    if (!success) return;
    if (countdown <= 0) { router.push("/auth/login"); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [success, countdown, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!password || password.length < 8) errs.password = "Mínimo 8 caracteres";
    if (password !== confirm) errs.confirm = "Senhas não conferem";
    if (!token) errs.token = "Token inválido ou expirado";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
  }

  return (
    <div className="auth-centered-page">
      <div className="auth-card-center">
        {!success ? (
          <>
            <div className="auth-card-icon auth-card-icon--lock">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="18" width="24" height="18" rx="4" stroke="#FF6B9D" strokeWidth="2.5"/>
                <path d="M13 18v-6a7 7 0 0114 0v6" stroke="#FF6B9D" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="20" cy="27" r="2.5" fill="#FF6B9D"/>
              </svg>
            </div>
            <h1 className="auth-card-title">Redefinir senha</h1>
            <p className="auth-card-subtitle">Crie uma nova senha segura para sua conta</p>

            {errors.token && (
              <div className="auth-alert auth-alert--error">{errors.token}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="ff-group">
                <label className="ff-label">Nova Senha</label>
                <div className="ff-input-wrap">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password:""})); }}
                    placeholder="Mínimo 8 caracteres"
                    className={`ff-input${errors.password ? " ff-input--error" : ""}`}
                  />
                  <button type="button" className="ff-eye-btn" onClick={() => setShowPwd(!showPwd)}>
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <span className="ff-error">{errors.password}</span>}

                {password && (
                  <div className="pwd-strength">
                    <div className="pwd-strength-bar">
                      {[1,2,3].map(i => (
                        <div
                          key={i}
                          className="pwd-strength-seg"
                          style={{ background: i <= strength.score ? strength.color : "#e0e0e0" }}
                        />
                      ))}
                    </div>
                    <span className="pwd-strength-label" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                    <div className="pwd-rules">
                      <span className={password.length >= 8 ? "rule-ok" : "rule-fail"}>✓ 8+ caracteres</span>
                      <span className={/[A-Z]/.test(password) ? "rule-ok" : "rule-fail"}>✓ Maiúscula</span>
                      <span className={/[0-9]/.test(password) ? "rule-ok" : "rule-fail"}>✓ Número</span>
                      <span className={/[^A-Za-z0-9]/.test(password) ? "rule-ok" : "rule-fail"}>✓ Símbolo</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="ff-group">
                <label className="ff-label">Confirmar Nova Senha</label>
                <div className="ff-input-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={e => { setConfirm(e.target.value); setErrors(p => ({...p, confirm:""})); }}
                    placeholder="Repita a nova senha"
                    className={`ff-input${errors.confirm ? " ff-input--error" : ""}`}
                  />
                  <button type="button" className="ff-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
                {confirm && !errors.confirm && password === confirm && (
                  <span style={{ color: "#22c55e", fontSize: 12, marginTop: 4, display: "block" }}>✓ Senhas conferem</span>
                )}
                {errors.confirm && <span className="ff-error">{errors.confirm}</span>}
              </div>

              <button type="submit" className="auth-btn-primary" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? <span className="auth-btn-spinner" /> : null}
                {loading ? "Salvando…" : "Redefinir Senha"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Link href="/auth/login" className="auth-link-pink">← Voltar para o login</Link>
            </div>
          </>
        ) : (
          <div className="auth-success-state">
            <div className="auth-success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#22c55e" strokeWidth="3" className="auth-check-circle"/>
                <path d="M20 32l9 9 15-16" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="auth-check-path"/>
              </svg>
            </div>
            <h2 className="auth-card-title" style={{ color: "#22c55e" }}>Senha redefinida!</h2>
            <p className="auth-card-subtitle">Sua senha foi alterada com sucesso.</p>
            <p className="auth-card-subtitle" style={{ marginTop: 8 }}>
              Redirecionando para o login em <strong>{countdown}s</strong>…
            </p>
            <Link href="/auth/login" className="auth-btn-primary" style={{ display: "block", marginTop: 24, textAlign: "center" }}>
              Ir para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
