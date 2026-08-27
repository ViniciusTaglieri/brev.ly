import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type PaginationProps = {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-1.5 pt-4">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-8 items-center gap-1 rounded-md bg-gray-200 px-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-40"
      >
        <CaretLeft size={14} weight="bold" />
        <span>Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((pageNumber) => {
          const isCurrent = pageNumber === page;

          return (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Ir para a página ${pageNumber}`}
              aria-current={isCurrent ? "page" : undefined}
              disabled={disabled}
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 ${
                isCurrent
                  ? "bg-blue-base text-white shadow-xs"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Próxima página"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-8 items-center gap-1 rounded-md bg-gray-200 px-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-40"
      >
        <span>Próximo</span>
        <CaretRight size={14} weight="bold" />
      </button>
    </nav>
  );
}

