"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";
import { Menu, X, User as UserIcon } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Stories", href: "/stories" },
    { name: "Submit A Tale", href: "/submit" },
    { name: "Contact", href: "/contact" },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex justify-center px-4 py-3 bg-[#0a0b1e]/40 backdrop-blur-md shadow-[0_0_30px_rgba(165,105,255,0.2)] z-50">
      <div className="flex items-center justify-between max-w-5xl w-full">

        {/* Logo */}
        <Link
          href="/"
          className="text-violet-300 font-extrabold text-lg tracking-wide hover:text-violet-200 transition drop-shadow-[0_0_6px_rgba(165,105,255,0.4)]"
        >
          WooveVen Tales
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-violet-300 font-medium hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(165,105,255,0.4)]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth/Profile Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-1 rounded-full border border-violet-400 text-violet-300 font-semibold hover:bg-violet-400/20 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-4 py-1 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
 <Link href="/protected">
  {user.user_metadata?.avatar_url ? (
    <Image
      src={user.user_metadata.avatar_url}
      alt="Profile"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full border border-violet-400"
    />
  ) : (
    <UserIcon className="text-violet-300 w-8 h-8" />
  )}
</Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full border border-rose-500 text-rose-400 font-semibold hover:bg-rose-500/20 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-violet-300 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0b1e]/95 backdrop-blur-md shadow-[0_0_30px_rgba(165,105,255,0.2)] p-4 flex flex-col gap-4 text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-violet-200 font-medium hover:text-white transition hover:drop-shadow-[0_0_6px_rgba(165,105,255,0.4)]"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-full border border-violet-400 text-violet-300 font-semibold hover:bg-violet-400/20 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-4 py-2 rounded-full bg-violet-500 text-white font-semibold hover:bg-violet-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2 items-center">
              <Link href="/protected">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border border-violet-400"
                  />
                ) : (
                  <UserIcon className="text-violet-300 w-8 h-8" />
                )}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 rounded-full border border-rose-500 text-rose-400 font-semibold hover:bg-rose-500/20 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
