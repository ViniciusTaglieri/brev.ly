import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gray-200 p-6">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-white p-12 text-center">
        <img src="/404.svg" alt="" className="h-12" />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-gray-600">Link não encontrado</h1>
          <p className="text-sm text-gray-500">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <Link to="/" className="text-blue-base hover:text-blue-dark">
              brev.ly
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
