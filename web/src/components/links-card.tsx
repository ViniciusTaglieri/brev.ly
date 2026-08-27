import { DownloadSimple, Spinner } from "@phosphor-icons/react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LinkItem } from "@/components/link-item";
import { LinksEmpty } from "@/components/links-empty";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { exportUrls } from "@/http/export-urls";
import { getUrls } from "@/http/get-urls";

const PAGE_SIZE = 4;

export function LinksCard() {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["urls", page, PAGE_SIZE],
    queryFn: () => getUrls({ page, pageSize: PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });

  const exportMutation = useMutation({
    mutationFn: exportUrls,
    onSuccess: ({ reportUrl }) => {
      window.open(reportUrl, "_blank", "noopener,noreferrer");
    },
  });

  const urls = query.data?.urls ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (query.data && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, query.data]);

  return (
    <section className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 md:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg text-gray-600">Meus links</h2>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-auto"
          disabled={
            exportMutation.isPending || query.isLoading || total === 0
          }
          onClick={() => exportMutation.mutate()}
        >
          {exportMutation.isPending ? (
            <Spinner size={16} className="animate-spin" />
          ) : (
            <DownloadSimple size={16} />
          )}
          Baixar CSV
        </Button>
      </div>

      {exportMutation.isError ? (
        <p className="text-sm text-danger">Falha ao exportar CSV.</p>
      ) : null}

      {query.isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size={24} className="animate-spin text-gray-400" />
        </div>
      ) : urls.length === 0 ? (
        <LinksEmpty />
      ) : (
        <>
          <ul className="max-h-96 overflow-y-auto">
            {urls.map((url) => (
              <LinkItem key={url.id} url={url} />
            ))}
          </ul>
          <Pagination
            page={page}
            total={total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            disabled={query.isFetching}
          />
        </>
      )}
    </section>
  );
}

