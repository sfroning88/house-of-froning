import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Cinzel } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { SITE_DESCRIPTION, MAP_AVATAR_BLINK_TIME } from "@/lib/constants";
import { CookieBanner } from "@/app/(components)/(privacy)/CookieBanner";
import {
  MusicProvider,
  OnboardingProvider,
  QueryProvider,
} from "@/app/providers";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seanfroning.tech"),
  title: { default: "House of Froning", template: "%s | House of Froning" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "House of Froning",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "House of Froning",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Froning",
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const PrivacyNotice = dynamic(() =>
  import("./(components)/(privacy)/PrivacyNotice").then((m) => m.PrivacyNotice),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} antialiased`}
        style={
          {
            "--avatar-blink-time": `${MAP_AVATAR_BLINK_TIME}ms`,
          } as React.CSSProperties
        }
      >
        <QueryProvider>
          <MusicProvider>
            <OnboardingProvider>
              {children}
              <Toaster position="top-center" />
              <SpeedInsights />
              <CookieBanner />
              <PrivacyNotice />
            </OnboardingProvider>
          </MusicProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
