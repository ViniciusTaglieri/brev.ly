import { isAxiosError } from "axios";
import { api } from "@/http/client";

export class UrlNotFoundError extends Error {
  constructor(message = "URL não encontrada") {
    super(message);
    this.name = "UrlNotFoundError";
  }
}

export async function getOriginalUrl(shortUrl: string) {
  try {
    const { data } = await api.get<{ originalUrl: string }>(
      `/${encodeURIComponent(shortUrl)}`,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      throw new UrlNotFoundError(
        (error.response.data as { message?: string })?.message,
      );
    }
    throw error;
  }
}
