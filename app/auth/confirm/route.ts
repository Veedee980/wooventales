import { createServerSupabaseClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const type = searchParams.get("type") as EmailOtpType | null;
  const email = searchParams.get("email") ?? "";
  const next = searchParams.get("next") ?? "/";

  if (!token || !type || !email) {
    redirect(`/auth/error?error=Missing token, type, or email`);
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.verifyOtp({
    type,
    token,
    email, // must include email for these types
  });

  if (!error) {
    redirect(next);
  } else {
    redirect(`/auth/error?error=${error.message}`);
  }
}
