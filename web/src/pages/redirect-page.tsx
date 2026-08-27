import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOriginalUrl, UrlNotFoundError } from "@/http/get-original-url";
import { NotFoundPage } from "@/pages/not-found-page";

const REDIRECT_DELAY_MS = 1500;

export function RedirectPage() {
  const { "url-encurtada": shortUrl = "" } = useParams();

  const query = useQuery({
    queryKey: ["original-url", shortUrl],
    queryFn: () => getOriginalUrl(shortUrl),
    enabled: Boolean(shortUrl),
    retry: false,
  });

  const originalUrl = query.data?.originalUrl;

  useEffect(() => {
    if (!originalUrl) return;

    const timer = window.setTimeout(() => {
      window.location.href = originalUrl;
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [originalUrl]);

  if (query.isError && query.error instanceof UrlNotFoundError) {
    return <NotFoundPage />;
  }

  if (query.isError) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-gray-200 p-6">
        <p className="text-md text-danger">Não foi possível redirecionar.</p>
        <Link to="/" className="text-md text-blue-base hover:text-blue-dark">
          Voltar ao início
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gray-200 p-6">
      <img src="/Logo.svg" alt="brev.ly" className="h-6" />
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-lg bg-white p-8 text-center">
        <h1 className="text-xl text-gray-600">Redirecionando...</h1>
        <p className="text-sm text-gray-500">
          O link será aberto automaticamente em alguns instantes.
          {originalUrl ? (
            <>
              {" "}
              <a
                href={originalUrl}
                className="text-blue-base hover:text-blue-dark"
              >
                Não foi redirecionado? Acesse aqui
              </a>
            </>
          ) : null}
        </p>
      </div>
    </main>
  );
}
