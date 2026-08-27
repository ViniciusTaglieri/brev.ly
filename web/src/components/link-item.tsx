import { Copy, Trash } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { deleteUrl } from "@/http/delete-url";
import type { UrlItem } from "@/http/get-urls";
import { env } from "@/lib/env";

type LinkItemProps = {
  url: UrlItem;
};

export function LinkItem({ url }: LinkItemProps) {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const shortHref = `${env.frontendUrl}/${url.shortUrl}`;

  const remove = useMutation({
    mutationFn: () => deleteUrl(url.shortUrl),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });

  async function handleCopy() {
    await navigator.clipboard.writeText(shortHref);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <li className="flex items-center justify-between gap-3 border-t border-gray-200 py-3 first:border-t-0">
      <div className="min-w-0 flex-1">
        <a
          href={shortHref}
          className="block truncate text-md text-blue-base hover:text-blue-dark"
          target="_blank"
          rel="noreferrer"
        >
          {new URL(env.frontendUrl).host}/{url.shortUrl}
        </a>
        <p className="truncate text-sm text-gray-500">{url.originalUrl}</p>
      </div>
      <span className="shrink-0 text-sm text-gray-500">
        {url.accessCount} acessos
      </span>
      <div className="flex shrink-0 items-center gap-1">
        <IconButton
          aria-label={copied ? "Copiado" : "Copiar link"}
          onClick={handleCopy}
          title={copied ? "Copiado!" : "Copiar"}
        >
          <Copy size={16} />
        </IconButton>
        <IconButton
          aria-label="Excluir link"
          disabled={remove.isPending}
          onClick={() => remove.mutate()}
        >
          <Trash size={16} />
        </IconButton>
      </div>
    </li>
  );
}
