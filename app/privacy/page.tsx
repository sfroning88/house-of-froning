import { readFile } from "fs/promises";
import { join } from "path";

export default async function PrivacyPage() {
  const filePath = join(process.cwd(), "app/privacy/PRIVACY.md");
  const content = await readFile(filePath, "utf-8");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-iceberg-deep via-iceberg-medium to-iceberg-light font-sans safe-area-inset">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4">
        <div className="max-w-3xl w-full bg-white border-4 border-slate-400 p-6 shadow-lg">
          <div className="whitespace-pre-wrap text-sm">{content}</div>
        </div>
      </main>
    </div>
  );
}
