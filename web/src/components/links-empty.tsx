import { Link as LinkIcon } from "@phosphor-icons/react";

export function LinksEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <LinkIcon size={32} className="text-gray-400" />
      <p className="text-center text-xs uppercase text-gray-400">
        Ainda não existem links cadastrados
      </p>
    </div>
  );
}
