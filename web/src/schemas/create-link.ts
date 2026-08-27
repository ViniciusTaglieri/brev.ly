import { z } from "zod";

export const shortUrlPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const RESERVED_SHORT_URLS = new Set(["docs", "exports"]);

function normalizeOriginalUrl(value: string): string {
  const input = value.trim();
  const hasProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(input);
  const candidate = hasProtocol ? input : `https://${input}`;
  try {
    return new URL(candidate).toString();
  } catch {
    return candidate;
  }
}

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, "Informe a URL original")
    .transform(normalizeOriginalUrl)
    .pipe(z.url({ message: "URL inválida" })),
  shortUrl: z
    .string()
    .trim()
    .transform((v) => v.toLowerCase())
    .pipe(
      z
        .string()
        .min(3, "Mínimo de 3 caracteres")
        .max(50, "Máximo de 50 caracteres")
        .regex(shortUrlPattern, "Use apenas letras minúsculas, números e hifens")
        .refine((v) => !RESERVED_SHORT_URLS.has(v), "URL encurtada reservada"),
    ),
});

export type CreateLinkInput = z.input<typeof createLinkSchema>;
export type CreateLinkOutput = z.output<typeof createLinkSchema>;
