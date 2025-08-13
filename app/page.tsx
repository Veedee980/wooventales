"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const tales = [
  {
    title: "The Dragon's Gift",
    culture: "Ancient China",
    description: "A humble farmer’s kindness to a wounded dragon leads to an unexpected reward that changes his village forever.",
    image: "/dragon.png",
  },
  {
    title: "The Moon Maiden",
    culture: "Japanese Folklore",
    description: "A celestial being descends to Earth, bringing magic and mystery to a quiet mountain village.",
    image: "/moon.png",
  },
  {
    title: "The Eagle's Wisdom",
    culture: "Native American",
    description: "A young warrior learns the secrets of the skies from an ancient eagle spirit.",
    image: "/eagle.png",
  },
  {
    title: "Outsmarting The Hungry Tiger",
    culture: "India",
    description: "A fox escapes danger by using his wit to fool a tiger into thinking he’s the king of the forest.",
    image: "/tiger.png",
  },
  {
    title: "A Dance Of Disappearance",
    culture: "Maori Legend",
    description: "A woman weaves a cloak from enchanted feathers, letting her vanish into the wind, escaping an unwanted fate.",
    image: "/woman.png",
  },
  {
    title: "A Festival Turned Strange",
    culture: "Brazil",
    description: "During carnival, a boy finds a mask that reveals people’s true emotions, uncovering secrets no one wants seen.",
    image: "/mask.png",
  },
];

export default function Home() {
  return (
    <main className="w-full text-[#522867] bg-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow">
            WoovenTales
          </h1>
          <p className="text-lg md:text-2xl text-white mb-6 drop-shadow">
            Preserving timeless folktales for a new generation.
          </p>
          <Link
            href="/stories"
            className="inline-block bg-[#F9E4B8] text-[#522867] font-semibold px-6 py-3 rounded-full hover:bg-[#f3dca3] transition"
          >
            Explore Stories
          </Link>
        </motion.div>
      </section>

      {/* ABOUT / MISSION */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <Image
            src="/mission.png"
            alt="Mission Illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg mx-auto md:mx-0"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          <p className="text-lg text-gray-700">
            We preserve and share folktales from around the world, making them accessible through immersive digital storytelling, ensuring cultures, lessons, and imaginations are passed down for generations.
          </p>
          <Link
            href="/stories"
            className="inline-block mt-4 px-6 py-3 bg-[#522867] text-[#F9E4B8] rounded-full font-semibold hover:bg-[#3e1e52] transition"
          >
            Read Our Stories
          </Link>
        </motion.div>
      </section>

      {/* FEATURED TALES */}
      <section className="py-16 px-6 md:px-16 bg-[#F9E4B8]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Featured Tales
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tales.map((tale, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <Image
                src={tale.image}
                alt={tale.title}
                width={200}
                height={150}
                className="rounded-lg mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{tale.title}</h3>
              <p className="text-sm italic text-gray-500">{tale.culture}</p>
              <p className="text-sm text-gray-700 mt-2 mb-4">{tale.description}</p>
              <Link
                href="/stories"
                className="text-[#522867] font-semibold hover:underline text-sm"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
{/* ABOUT / MISSION */}
<section className="py-16 px-6 md:px-16 max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-10">
  {/* Text + Button on the LEFT */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex-1 space-y-4 order-2 md:order-1"
  >
    <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
    <p className="text-lg text-gray-700">
      Become part of WooveVen Tales and help us preserve the worlds folktales. Share your own stories, connect with other culture enthusiasts, and contribute to our growing library.
    </p>
    <Link
      href="/submit"
      className="inline-block mt-4 px-6 py-3 bg-[#522867] text-[#F9E4B8] rounded-full font-semibold hover:bg-[#3e1e52] transition"
    >
      Share Your Story
    </Link>
  </motion.div>

  {/* Image on the RIGHT */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex-1 order-1 md:order-2"
  >
    <Image
      src="/community.jpg"
      alt="Community Illustration"
      width={500}
      height={400}
      className="rounded-xl shadow-lg mx-auto md:mx-0"
    />
  </motion.div>
</section>


      {/* NEWSLETTER */}
      <section className="py-16 px-6 md:px-16 bg-[#F9E4B8] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Stay Connected
        </motion.h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for new stories, cultural insights, and updates on WooveVen Tales.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full border border-[#522867] focus:outline-none focus:ring-2 focus:ring-[#522867] w-full"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#522867] text-[#F9E4B8] rounded-full font-semibold hover:bg-[#3e1e52] transition"
          >
            Subscribe
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
 








