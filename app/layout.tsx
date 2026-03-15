import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { MAP_AVATAR_BLINK_TIME } from "@/lib/constants";
import { CookieBanner } from "@/app/(components)/(privacy)/CookieBanner";
import { PrivacyNotice } from "@/app/(components)/(privacy)/PrivacyNotice";
import { OnboardingProvider, QueryProvider } from "@/app/providers";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House of Froning",
  description: "Who is Sean Froning?",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          {
            "--avatar-blink-time": `${MAP_AVATAR_BLINK_TIME}ms`,
          } as React.CSSProperties
        }
      >
        <QueryProvider>
          <OnboardingProvider>
            {children}
            <Toaster position="top-center" />
            <CookieBanner />
            <PrivacyNotice />
          </OnboardingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
