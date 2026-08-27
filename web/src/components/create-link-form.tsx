import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveUrl, SaveUrlError } from "@/http/save-url";
import { env } from "@/lib/env";
import {
  createLinkSchema,
  type CreateLinkInput,
} from "@/schemas/create-link";

function frontendPrefix() {
  try {
    const host = new URL(env.frontendUrl).host;
    return `${host}/`;
  } catch {
    return `${env.frontendUrl}/`;
  }
}

export function CreateLinkForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: { originalUrl: "", shortUrl: "" },
  });

  const mutation = useMutation({
    mutationFn: saveUrl,
    onSuccess: async () => {
      reset();
      await queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error) => {
      if (error instanceof SaveUrlError) {
        if (error.status === 409) {
          setError("shortUrl", { message: error.message });
          return;
        }
        if (error.status === 400) {
          setError("shortUrl", { message: error.message });
          return;
        }
      }
      setError("root", { message: "Erro ao salvar. Tente de novo." });
    },
  });

  return (
    <section className="flex w-full flex-col gap-6 rounded-lg bg-white p-6 md:p-8">
      <h2 className="text-lg text-gray-600">Novo link</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((values) => {
          const parsed = createLinkSchema.parse(values);
          return mutation.mutateAsync(parsed);
        })}
      >
        <Input
          label="Link original"
          placeholder="www.exemplo.com.br"
          error={errors.originalUrl?.message}
          {...register("originalUrl")}
        />
        <Input
          label="Link encurtado"
          placeholder="meu-link"
          prefix={frontendPrefix()}
          error={errors.shortUrl?.message}
          {...register("shortUrl")}
        />
        {errors.root?.message ? (
          <p className="text-sm text-danger">{errors.root.message}</p>
        ) : null}
        <Button type="submit" disabled={isSubmitting || mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar link"}
        </Button>
      </form>
    </section>
  );
}
