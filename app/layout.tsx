import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders"; // the client wrapper

// Base URL for metadata
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Metadata (server-only)
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wooventales",
  description: "The home of folktales from around the world",
};

// Geist font
const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {/* Wrap client functionality here */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

