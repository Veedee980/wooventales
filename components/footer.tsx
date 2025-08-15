"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering


import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#522867] text-[#F9E4B8] pt-12 pb-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">WooveVen Tales ✨</h2>
          <p className="text-sm leading-6">
            A magical world of African folktales brought to life. Discover,
            read, and listen to timeless stories passed down through
            generations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline hover:text-white">Home</Link></li>
            <li><Link href="/explore" className="hover:underline hover:text-white">Explore Tales</Link></li>
            <li><Link href="/submit" className="hover:underline hover:text-white">Submit Your Story</Link></li>
            <li><Link href="/about" className="hover:underline hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <form className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F9E4B8] text-[#522867] px-4 py-2 rounded-md hover:bg-white font-semibold"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 text-xl justify-start">
            <a href="#" aria-label="Instagram" className="hover:text-white">📷</a>
            <a href="#" aria-label="Twitter" className="hover:text-white">🐦</a>
            <a href="#" aria-label="YouTube" className="hover:text-white">▶️</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-[#F9E4B880] pt-4 text-center text-sm">
        © 2025 WooveVen Tales. All rights reserved.
      </div>
    </footer>
  );
}
