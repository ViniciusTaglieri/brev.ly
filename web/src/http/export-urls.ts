import { api } from "@/http/client";

export async function exportUrls() {
  const { data } = await api.post<{ reportUrl: string }>("/exports");
  return data;
}
