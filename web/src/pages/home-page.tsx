import { CreateLinkForm } from "@/components/create-link-form";
import { LinksCard } from "@/components/links-card";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-6 p-4 md:justify-center md:p-8">
      <img
        src="/Logo.svg"
        alt="brev.ly"
        className="h-6 self-center md:self-start"
      />
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-start md:gap-5">
        <div className="w-full md:max-w-sm">
          <CreateLinkForm />
        </div>
        <div className="w-full flex-1">
          <LinksCard />
        </div>
      </div>
    </main>
  );
}
