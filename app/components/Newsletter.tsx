"use client";

export default function Newsletter() {
  return (
    <div className="newsletter">
      <div className="container">
        <h2 className="newsletter-title">📬 Receba Ofertas Exclusivas</h2>
        <p className="newsletter-text">
          Cadastre seu e-mail e ganhe 10% de desconto na primeira compra + novidades semanais sobre impressão 3D.
        </p>
        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Seu melhor e-mail..."
          />
          <button type="submit">Quero Desconto!</button>
        </form>
      </div>
    </div>
  );
}
