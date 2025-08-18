import Link from "next/link";
import { Button } from "./ui/button";
// Update this import to match the actual export from your server module
import { LogoutButton } from "./logout-button";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function AuthButton() {
  // Create the Supabase client for the server
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
