"use client";

import Link from "next/link";
import FormField from "@/app/components/FormField";
import { useForgotPasswordForm } from "@/app/hooks/useAuth";

export default function ForgotPasswordPage() {
  const { email, setEmail, error, loading, submitted, handleSubmit } =
    useForgotPasswordForm();

  return (
    <div className="auth-center-page">
      <div className="auth-center-card">
        {submitted ? (
          /* Success state */
          <>
            <div className="auth-success-icon">✅</div>
            <h1 className="auth-center-title">E-mail enviado!</h1>
            <p className="auth-center-desc">
              Enviamos um link de recuperação para <strong>{email}</strong>.
              Verifique sua caixa de entrada e também a pasta de spam.
            </p>
            <Link href="/auth/login" className="auth-btn-primary" style={{ textDecoration: "none", display: "flex", marginBottom: 0 }}>
              Voltar ao login
            </Link>
          </>
        ) : (
          /* Default state */
          <>
            <span className="auth-center-icon">✉️</span>
            <h1 className="auth-center-title">Recuperar senha</h1>
            <p className="auth-center-desc">
              Digite o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                label="E-mail"
                id="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="seu@email.com"
                autoComplete="email"
                error={error}
                required
              />

              <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <span className="auth-btn-spinner" /> : null}
                {loading ? "Enviando…" : "Enviar link de recuperação"}
              </button>
            </form>

            <Link href="/auth/login" className="auth-back-link">
              ← Voltar ao login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
