"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering


import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignupPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Check your email to confirm signup.");
  };

  // Generate fireflies positions and animation timing once on mount
  const [fireflies, setFireflies] = useState<{ top: string; left: string; delay: string; duration: string }[]>([]);
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 3}s`,
    }));
    setFireflies(generated);
  }, []);

  return (
<div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[url('/sign-bg.jpeg')] bg-cover bg-center">
      {/* Fireflies */}
      {fireflies.map((fly, i) => (
        <div
          key={i}
          className="firefly z-10"
        />
      ))}

      {/* Sign Up Form */}
      <div className="relative z-20 bg-white/10 backdrop-blur-md border border-purple/80 rounded-2xl shadow-lg p-4 pt-16 max-w-md w-full">
        <h1 className="text-center text-2xl font-serif text-white tracking-wide mb-4">Sign Up to Folktale</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-white mb-1 text-sm tracking-wide">Email</label>
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1 text-sm tracking-wide">Password</label>
            <input
              placeholder="At least 8 characters"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1 text-sm tracking-wide">Repeat Password</label>
            <input
              placeholder="Repeat your password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300"
              required
            />
          </div>

          <p className="text-sm text-center text-white mt-2">
            Already have an account?{" "}
            <a href="/auth/login" className="text-purple-300 hover:underline">
              Log in
            </a>
          </p>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full py-2 mt-2 hover:opacity-90 transition shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="text-white text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}





