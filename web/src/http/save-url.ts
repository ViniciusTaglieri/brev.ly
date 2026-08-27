import { api } from "@/http/client";
import { isAxiosError } from "axios";

export type SaveUrlInput = {
  originalUrl: string;
  shortUrl: string;
};

export class SaveUrlError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);
    this.name = "SaveUrlError";
    this.status = status;
  }
}

export async function saveUrl(input: SaveUrlInput) {
  try {
    await api.post("/", input);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const message =
        (error.response.data as { message?: string })?.message ??
        "Não foi possível salvar o link";
      throw new SaveUrlError(message, error.response.status);
    }
    throw error;
  }
}
