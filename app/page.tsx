import type { Metadata } from "next";
import { Screen } from "@/app/(components)/Screen";

export const metadata: Metadata = {
  title: "House of Froning",
  description:
    "Sean Froning's personal portfolio — explore towns, trainer card, music, books, and more on an interactive Pokémon HeartGold-style map.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-iceberg-deep via-iceberg-medium to-iceberg-light font-sans safe-area-inset">
      <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4">
        <Screen />
      </main>
    </div>
  );
}
