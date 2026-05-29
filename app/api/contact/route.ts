import { NextRequest } from "next/server";
import { sanitizeHtml } from "@/lib/security";

// In-memory rate limiter: max 3 submissions per hour per IP
// For production, replace with Redis/Vercel KV
const rateLimitMap = new Map<string, { count: number; firstSeen: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000;

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.firstSeen > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstSeen: now });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  if (isRateLimited(ip)) {
    console.warn(`[CONTACT] Rate limit exceeded for IP: ${ip}`);
    return Response.json(
      { error: "Você já enviou muitas mensagens. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const name = sanitizeHtml(String(body.name ?? "")).trim();
  const email = sanitizeHtml(String(body.email ?? "")).trim();
  const subject = sanitizeHtml(String(body.subject ?? "")).trim();
  const message = sanitizeHtml(String(body.message ?? "")).trim();

  // Server-side validation
  if (!name || name.length < 2) {
    return Response.json({ error: "Nome inválido." }, { status: 422 });
  }
  if (!validateEmail(email)) {
    return Response.json({ error: "E-mail inválido." }, { status: 422 });
  }
  if (!subject || subject.length < 3) {
    return Response.json({ error: "Assunto muito curto." }, { status: 422 });
  }
  if (!message || message.length < 10) {
    return Response.json({ error: "Mensagem muito curta (mínimo 10 caracteres)." }, { status: 422 });
  }
  if (message.length > 2000) {
    return Response.json({ error: "Mensagem muito longa (máximo 2000 caracteres)." }, { status: 422 });
  }

  // Send email via Resend (configure RESEND_API_KEY in .env.local)
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contato@tentech3d.com.br",
          to: ["carlinhos12332100@gmail.com"],
          reply_to: email,
          subject: `[Contato TenTech 3D] ${subject}`,
          html: `
            <h2>Nova mensagem de contato</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <hr/>
            <p><strong>Mensagem:</strong></p>
            <p style="white-space:pre-wrap">${message}</p>
            <hr/>
            <small>IP: ${ip} · ${new Date().toISOString()}</small>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("[CONTACT] Resend error:", err);
        return Response.json({ error: "Falha ao enviar mensagem. Tente novamente." }, { status: 500 });
      }
    } catch (err) {
      console.error("[CONTACT] Fetch error:", err);
      return Response.json({ error: "Erro interno. Tente novamente." }, { status: 500 });
    }
  } else {
    // Dev mode: log to console
    console.log("[CONTACT] New message (configure RESEND_API_KEY to send emails):", {
      name, email, subject, message, ip,
    });
  }

  return Response.json({ success: true, message: "Mensagem enviada com sucesso!" });
}
