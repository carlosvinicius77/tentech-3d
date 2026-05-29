// Removes dangerous HTML tags and attributes to prevent XSS
export function sanitizeHtml(str: string): string {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/<[^>]+>/g, "");
}

// CPF validation using the Receita Federal algorithm
export function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calc = (factor: number) => {
    let sum = 0;
    for (let i = 0; i < factor - 1; i++) {
      sum += Number(digits[i]) * (factor - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder >= 10 ? 0 : remainder;
  };

  return calc(10) === Number(digits[9]) && calc(11) === Number(digits[10]);
}

// "joao.silva@gmail.com" → "j***.s****@gmail.com"
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain || local.length < 2) return email;
  const visible = local[0];
  const masked = "*".repeat(Math.min(local.length - 1, 4));
  return `${visible}${masked}@${domain}`;
}

// "123.456.678-90" → "***.***. 678-90"
export function maskCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return `***.***.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

// "4111111111114242" → "**** **** **** 4242"
export function maskCard(number: string): string {
  const digits = number.replace(/\D/g, "");
  const last4 = digits.slice(-4).padStart(4, "0");
  return `**** **** **** ${last4}`;
}

// Cryptographically random 6-digit OTP
export function generateOTP(): string {
  const array = new Uint32Array(1);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Node.js fallback
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { randomBytes } = require("crypto") as typeof import("crypto");
    array[0] = randomBytes(4).readUInt32BE(0);
  }
  return String(array[0] % 1_000_000).padStart(6, "0");
}

// Minimum 8 chars, 1 uppercase, 1 number, 1 special character
export function isStrongPassword(pass: string): boolean {
  return (
    pass.length >= 8 &&
    /[A-Z]/.test(pass) &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass)
  );
}
