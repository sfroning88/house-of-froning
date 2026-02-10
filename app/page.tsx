import { RotatingBaby } from "@/app/(components)/RotatingBaby";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-iceberg-deep via-iceberg-medium to-iceberg-light font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <RotatingBaby />
      </main>
    </div>
  );
}
