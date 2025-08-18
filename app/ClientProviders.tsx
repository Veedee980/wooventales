"use client";

import { ThemeProvider } from "next-themes";
import { SupabaseProvider } from "@/components/providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseProvider>{children}</SupabaseProvider>
    </ThemeProvider>
  );
}
