"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering

import Navbar from "@/components/navbar";

export default function SubmitTalePage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-950 via-purple-900 to-black px-4 py-12">
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-500/20">
          <h1 className="text-3xl font-bold text-purple-300 mb-4 text-center">
            Submit a Tale
          </h1>
          <p className="text-purple-200 text-center mb-6">
            Share your cultural folktale with the world.
          </p>

          <form
            action="https://formspree.io/f/myzppyyk"
            method="POST"
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="w-full rounded-lg p-2 bg-purple-900 text-purple-100 placeholder-purple-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <textarea
              name="text"
              placeholder="Story Text"
              required
              rows={5}
              className="w-full rounded-lg p-2 bg-purple-900 text-purple-100 placeholder-purple-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>

            <input
              type="text"
              name="nation"
              placeholder="Nation"
              className="w-full rounded-lg p-2 bg-purple-900 text-purple-100 placeholder-purple-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="url"
              name="source"
              placeholder="Source Link (optional)"
              className="w-full rounded-lg p-2 bg-purple-900 text-purple-100 placeholder-purple-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Submit Tale
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
