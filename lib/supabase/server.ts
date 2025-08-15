// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { createClient as createBrowserClient } from "@supabase/supabase-js";

// Detect if we can use `next/headers` (App Router server environment)
let cookiesFn: (() => Promise<unknown>) | null;
try {
  // This import will fail in Pages Router
  cookiesFn = (await import("next/headers")).cookies;
} catch {
  cookiesFn = null;
}

export async function createClient() {
  if (cookiesFn) {
    // App Router (Server Component)
    const cookieStore = await cookiesFn() as { get: (name: string) => { value?: string } | undefined };
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
  } else {
    // Pages Router or non-server environment — fallback to browser client
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
}
