import type { Metadata } from "next";
import { Screen } from "@/app/(components)/Screen";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "House of Froning",
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-iceberg-deep via-iceberg-medium to-iceberg-light font-sans safe-area-inset">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4">
        <h1 className="sr-only">House of Froning</h1>
        <Screen />
      </main>
    </div>
  );
}
