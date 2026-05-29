"use client";

import Link from "next/link";
import FormField from "@/app/components/FormField";
import { useLoginForm } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const {
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    rememberMe, setRememberMe,
    errors, loading,
    handleSubmit, clearError,
  } = useLoginForm();

  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Left panel */}
        <aside className="auth-panel">
          <div className="auth-panel-logo">
            TenTech <span>3D</span>
          </div>
          <p className="auth-panel-tagline">Impressão 3D personalizada ao seu alcance</p>

          <div className="auth-panel-illustration">
            <div className="auth-panel-icon">🖨️</div>
          </div>

          <ul className="auth-panel-bullets">
            <li className="auth-panel-bullet">
              <div className="auth-bullet-icon">⚡</div>
              <div className="auth-bullet-text">
                <span className="auth-bullet-title">Impressão Rápida</span>
                <span className="auth-bullet-desc">Entrega expressa em até 24h para SP</span>
              </div>
            </li>
            <li className="auth-panel-bullet">
              <div className="auth-bullet-icon">🔒</div>
              <div className="auth-bullet-text">
                <span className="auth-bullet-title">Pagamento Seguro</span>
                <span className="auth-bullet-desc">Dados protegidos com criptografia SSL</span>
              </div>
            </li>
            <li className="auth-panel-bullet">
              <div className="auth-bullet-icon">🎧</div>
              <div className="auth-bullet-text">
                <span className="auth-bullet-title">Suporte Especializado</span>
                <span className="auth-bullet-desc">Time técnico pronto para te ajudar</span>
              </div>
            </li>
          </ul>
        </aside>

        {/* Right: form */}
        <main className="auth-form-col">
          <div className="auth-form-card">
            <h1 className="auth-form-title">Bem-vindo de volta!</h1>
            <p className="auth-form-subtitle">Entre na sua conta TenTech 3D</p>

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                label="E-mail"
                id="email"
                type="email"
                value={email}
                onChange={(v) => { setEmail(v); clearError("email"); }}
                placeholder="seu@email.com"
                autoComplete="email"
                error={errors.email}
                required
              />

              <FormField
                label="Senha"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(v) => { setPassword(v); clearError("password"); }}
                placeholder="Sua senha"
                autoComplete="current-password"
                error={errors.password}
                required
                rightElement={
                  <button
                    type="button"
                    className="ff-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                }
              />

              <div className="auth-form-row">
                <label className="auth-checkbox-group">
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-checkbox-label">Lembrar de mim</span>
                </label>
                <Link href="/auth/forgot-password" className="auth-link-pink">
                  Esqueci minha senha →
                </Link>
              </div>

              <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <span className="auth-btn-spinner" /> : null}
                {loading ? "Entrando…" : "Entrar"}
              </button>
            </form>

            <div className="auth-divider">ou continue com</div>

            <div className="auth-social-btns">
              <button type="button" className="auth-social-btn auth-social-btn--google">
                <span>🇬</span> Google
              </button>
              <button type="button" className="auth-social-btn auth-social-btn--facebook">
                <span style={{ fontWeight: 700 }}>f</span> Facebook
              </button>
            </div>

            <p className="auth-bottom-link">
              Não tem conta?
              <Link href="/auth/register">Cadastre-se</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
