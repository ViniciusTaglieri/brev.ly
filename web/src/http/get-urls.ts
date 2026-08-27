import { api } from "@/http/client";

export type UrlItem = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
};

type GetUrlsParams = {
  page?: number;
  pageSize?: number;
};

type GetUrlsResponse = {
  urls: UrlItem[];
  total: number;
};

export async function getUrls(params: GetUrlsParams = {}) {
  const { data } = await api.get<GetUrlsResponse>("/", {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  });
  return data;
}
