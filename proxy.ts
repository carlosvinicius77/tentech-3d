import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUSPICIOUS_ATTEMPTS = 10;

// In-memory store for rate limiting (resets on cold start — use Redis/KV for production)
const suspiciousIPs = new Map<string, { count: number; firstSeen: number }>();

function getIP(request: NextRequest): string {
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function trackSuspiciousIP(ip: string): boolean {
  const now = Date.now();
  const entry = suspiciousIPs.get(ip);

  if (!entry || now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
    suspiciousIPs.set(ip, { count: 1, firstSeen: now });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_SUSPICIOUS_ATTEMPTS) {
    console.warn(`[SECURITY] Suspicious IP blocked: ${ip} — ${entry.count} attempts`);
    return true;
  }
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getIP(request);

  // Block IPs that have triggered too many unauthorized redirects
  if (trackSuspiciousIP(ip) && (pathname.startsWith("/admin") || pathname.startsWith("/account"))) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  // Protect /account/* — redirect to login if not authenticated
  if (pathname.startsWith("/account")) {
    const sessionCookie =
      request.cookies.get("tentech_session") ??
      request.cookies.get("__Secure-tentech_session");

    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /admin/* — redirect if not admin
  if (pathname.startsWith("/admin")) {
    const sessionCookie =
      request.cookies.get("tentech_session") ??
      request.cookies.get("__Secure-tentech_session");

    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role stored in cookie value (format: "userId:role")
    const [, role] = sessionCookie.value.split(":");
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect /auth/* to /account if already authenticated
  if (pathname.startsWith("/auth")) {
    const sessionCookie =
      request.cookies.get("tentech_session") ??
      request.cookies.get("__Secure-tentech_session");

    if (sessionCookie) {
      const next = request.nextUrl.searchParams.get("next") ?? "/account";
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/auth/:path*",
    // Apply security headers to all pages (exclude static assets)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
