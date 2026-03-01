import type { Metadata } from "next";
import { Cinzel, Geist, Geist_Mono } from "next/font/google";
import { MAP_AVATAR_BLINK_TIME } from "@/lib/constants";
import { PrivacyNotice } from "@/app/(components)/(privacy)/PrivacyNotice";
import { QueryProvider } from "@/app/providers";
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
          {children}
          <PrivacyNotice />
        </QueryProvider>
      </body>
    </html>
  );
}
