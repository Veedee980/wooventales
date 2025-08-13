'use client'

import React from 'react'
import Image from 'next/image'

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
    culture: "New Zealand (Maori legend)",
    description: "A woman weaves a cloak from enchanted feathers. When worn, it lets her vanish into the wind, escaping an unwanted fate.",
    image: "/woman.png",
  },
  {
    title: "A Festival Turned Strange",
    culture: "Brazil",
    description: "During carnival, a boy finds a mask that reveals people’s true emotions. What begins as fun reveals secrets no one wants to be seen.",
    image: "/mask.png",
  },
];

export default function FeaturedTales() {
  return (
    <section className="py-12 bg-[hsl(var(--background))] relative overflow-hidden">
      <h2 className="text-center text-3xl font-semibold text-[hsl(var(--foreground))] mb-8 tracking-wide">
        Featured Tales
      </h2>

      <div className="flex gap-6 overflow-x-auto px-4 pb-6 snap-x snap-mandatory scroll-smooth">
        {tales.map((tale, index) => (
          <div
            key={index}
            className="min-w-[280px] max-w-[300px] bg-[#F9E4B8] rounded-xl shadow-md flex-shrink-0 snap-center hover:scale-105 transition-transform duration-300 border border-[hsl(var(--border))]"
          >
            <div className="p-4 flex flex-col items-center text-center">
              <Image
                src={tale.image}
                alt={tale.title}
                width={96}
                height={96}
                className="w-24 h-24 object-contain mb-4 "
              />
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                {tale.title}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                {tale.culture}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">
                {tale.description}
              </p>
              <a
                href="#"
                className="text-purple-800 font-semibold hover:underline text-sm"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
