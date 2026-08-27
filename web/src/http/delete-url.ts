import { api } from "@/http/client";

export async function deleteUrl(shortUrl: string) {
  await api.delete(`/${encodeURIComponent(shortUrl)}`);
}
