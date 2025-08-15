"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section with background image */}
      <section className="relative min-h-screen bg-black text-purple-100 flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/contact-hero.jpeg"
            alt="Folktale themed background"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>

        {/* Contact Card */}
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-purple-500/30 animate-float-medium">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-center text-purple-200 text-sm mb-8">
            Do you know a story that must be told? Want to contribute,
            collaborate, or just say hi? We’d love to hear from you ✨
          </p>

          {/* Contact Form with Formspree */}
          <form
            action="https://formspree.io/f/mvgqqnbp "
            method="POST"
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="px-4 py-3 rounded-lg bg-black/40 border border-purple-600/30 text-purple-200 placeholder-purple-400 focus:outline-none focus:border-purple-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="px-4 py-3 rounded-lg bg-black/40 border border-purple-600/30 text-purple-200 placeholder-purple-400 focus:outline-none focus:border-purple-400 transition"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message..."
              required
              className="px-4 py-3 rounded-lg bg-black/40 border border-purple-600/30 text-purple-200 placeholder-purple-400 focus:outline-none focus:border-purple-400 transition"
            />
            {/* Optional: Redirect to Thank You page */}
            <input
              type="hidden"
              name="_next"
              value="https://your-site.com/thank-you"
            />
            <button
              type="submit"
              className="mt-2 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold transition shadow-md"
            >
              ✉️ Send Message
            </button>
          </form>

          {/* Alternative Contact */}
          <div className="mt-8 text-center text-sm text-purple-300">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:woovetales@example.com"
              className="underline hover:text-pink-300"
            >
              woovetales@example.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
