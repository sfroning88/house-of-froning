import { Screen } from "@/app/(components)/Screen";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-iceberg-deep via-iceberg-medium to-iceberg-light font-sans safe-area-inset">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4">
        <Screen />
      </main>
    </div>
  );
}
