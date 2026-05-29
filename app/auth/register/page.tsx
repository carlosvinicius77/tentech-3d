"use client";

import Link from "next/link";
import FormField from "@/app/components/FormField";
import { useRegisterForm, maskCPF, maskPhone } from "@/app/hooks/useAuth";

export default function RegisterPage() {
  const {
    fields, set,
    showPassword, setShowPassword,
    showConfirm, setShowConfirm,
    errors, loading, strength,
    handleSubmit,
  } = useRegisterForm();

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
            <h1 className="auth-form-title">Criar Conta</h1>
            <p className="auth-form-subtitle">Junte-se à TenTech 3D e comece a imprimir</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="auth-form-cols2">
                <FormField
                  label="Nome completo"
                  id="name"
                  value={fields.name}
                  onChange={(v) => set("name", v)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  error={errors.name}
                  required
                />
                <FormField
                  label="E-mail"
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={(v) => set("email", v)}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  error={errors.email}
                  required
                />
              </div>

              <div className="auth-form-cols2">
                <FormField
                  label="CPF"
                  id="cpf"
                  value={fields.cpf}
                  onChange={(v) => set("cpf", maskCPF(v))}
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  error={errors.cpf}
                  required
                />
                <FormField
                  label="Telefone"
                  id="phone"
                  value={fields.phone}
                  onChange={(v) => set("phone", maskPhone(v))}
                  placeholder="(00) 00000-0000"
                  autoComplete="tel"
                  error={errors.phone}
                  required
                />
              </div>

              <FormField
                label="Senha"
                id="password"
                type={showPassword ? "text" : "password"}
                value={fields.password}
                onChange={(v) => set("password", v)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
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

              {/* Password strength indicator */}
              {fields.password.length > 0 && (
                <div className="pwd-strength">
                  <div className="pwd-strength-bars">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="pwd-strength-bar"
                        style={{ background: n <= strength.score ? strength.color : undefined }}
                      />
                    ))}
                  </div>
                  <div className="pwd-strength-footer" style={{ color: strength.color }}>
                    {strength.label}
                  </div>
                </div>
              )}

              <FormField
                label="Confirmar senha"
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={fields.confirmPassword}
                onChange={(v) => set("confirmPassword", v)}
                placeholder="Repita a senha"
                autoComplete="new-password"
                error={errors.confirmPassword}
                required
                rightElement={
                  <button
                    type="button"
                    className="ff-eye-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                }
              />

              {/* Terms checkbox */}
              <div className="ff-group">
                <label className="auth-checkbox-group" style={{ marginBottom: 4 }}>
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={fields.acceptTerms}
                    onChange={(e) => set("acceptTerms", e.target.checked)}
                  />
                  <span className="auth-checkbox-label">
                    Li e aceito os{" "}
                    <Link href="#" className="auth-link-pink">Termos de Uso</Link>
                    {" "}e a{" "}
                    <Link href="#" className="auth-link-pink">Política de Privacidade</Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="auth-checkbox-error">{errors.acceptTerms}</span>
                )}
              </div>

              {/* News checkbox */}
              <div className="ff-group" style={{ marginBottom: 24 }}>
                <label className="auth-checkbox-group">
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={fields.acceptNews}
                    onChange={(e) => set("acceptNews", e.target.checked)}
                  />
                  <span className="auth-checkbox-label">
                    Quero receber novidades e promoções
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <span className="auth-btn-spinner" /> : null}
                {loading ? "Criando conta…" : "Criar Conta"}
              </button>
            </form>

            <p className="auth-bottom-link">
              Já tem conta?
              <Link href="/auth/login">Entrar</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
