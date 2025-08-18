// RootLayout.tsx
"use client";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SupabaseProvider } from "@/components/providers";
import "./globals.css";

// Make this layout dynamic to avoid prerender errors with Supabase
export const dynamic = "force-dynamic";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wooventales",
  description: "The home of folktales from around the world",
};

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
