"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";


export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      const typedError = error as { message?: string };
      setMessage(typedError.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Fireflies Animation */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="firefly"></div>
      ))}

      {/* Login Form Card */}
      <div className="login-card">
        <h1 className="text-center text-2xl font-serif text-white tracking-wide mb-4">
          Login to Folktale
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-1 text-sm tracking-wide">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1 text-sm tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <p className="text-white text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/auth/sign-up" className="text-[hsl(var(--chart-1))] hover:underline">
              Sign up
            </Link>
          </p>

          <Link href="/auth/forgot-password" className="text-center text-sm text-[hsl(var(--chart-1))] hover:underline">
            Forgot Password?
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? "Logging you in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="text-white text-center mt-4 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}



