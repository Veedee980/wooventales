"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 py-20 font-serif max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">Welcome to Wooven Tales</h1>
        <p className="text-xl italic text-center mb-16">
          Where ancient whispers find new voices ✨
        </p>

        <section className="grid sm:grid-cols-2 gap-10 mb-16">
          <div>
            <Image src="/about1.jpeg" alt="Storytelling" width={600} height={400} className="rounded-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Tales Told Around Fires</h2>
            <p>Our ancestors shared wisdom through stories whispered by firelight. We bring that warmth online through well-crafted tales and immersive narration.</p>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">A Global Quilt of Voices</h2>
            <p>From village to village, every culture stitches its own story. WooveVen Tales weaves these together into one vibrant, diverse tapestry.</p>
          </div>
          <div>
            <Image src="/about2.jpeg" alt="Global Folktales" width={600} height={400} className="rounded-lg" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
