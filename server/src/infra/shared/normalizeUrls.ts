export function normalizeOriginalUrl(value: string): string {
  const input = value.trim();

  // Adiciona HTTPS somente quando não existe um protocolo
  const hasProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(input);
  const candidate = hasProtocol ? input : `https://${input}`;

  try {
    // Normaliza host, protocolo, portas padrão e outros componentes
    return new URL(candidate).toString();
  } catch {
    // Mantém um valor inválido para que o Zod gere o erro de validação
    return candidate;
  }
}

export function normalizeShortUrl(value: string): string {
  return value.trim().toLowerCase();
}

export const shortUrlPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const RESERVED_SHORT_URLS = new Set(["docs", "exports"]);

export function isReservedShortUrl(value: string): boolean {
  return RESERVED_SHORT_URLS.has(value);
}

export function isValidShortUrl(value: string): boolean {
  return (
    shortUrlPattern.test(value) && value.length >= 3 && value.length <= 50
  );
}
