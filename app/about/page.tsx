"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";


export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section with background video */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/about-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center px-6 ">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              Welcome to Wooven Tales
            </h1>
            <p className="text-xl italic drop-shadow-md">
              Where ancient whispers find new voices ✨
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white text-gray-800 px-6 py-20 font-serif">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Introduction */}
          <section className="text-center">
            <h2 className="text-4xl font-bold text-purple-800 mb-6">
              Our Story
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              At <strong>WooveVen Tales</strong>, we breathe life into the
              ancient. We gather timeless folktales and retell them for the
              dreamers of today — blending the past with the present through
              storytelling, sound, and visuals.
            </p>
          </section>

          {/* Highlights */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "🌍 Global Roots",
                desc: "Stories from every corner — from Zimbabwe to Japan, from myth to legend.",
              },
              {
                title: "📖 Read & Listen",
                desc: "Narrated and written folktales for all moods and moments.",
              },
              {
                title: "🧡 Community Voices",
                desc: "Submit tales from your heritage and become a storyteller.",
              },
              {
                title: "🌟 Always Free",
                desc: "Our digital library is and always will be open to all.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-purple-50 p-6 rounded-xl border border-purple-200 shadow-md"
              >
                <h3 className="text-xl font-semibold text-purple-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </section>

<section className="space-y-24 relative z-10">
  {/* First visual block - Image Left, Text Right */}
  <div className="grid lg:grid-cols-2 gap-10 items-center">
    <div className="clip-image-left w-full h-full">
      <Image
        src="/about1.jpeg"
        alt="Storytelling by the fire"
        width={600}
        height={400}
        className="w-full h-auto object-cover shadow-lg"
      />
    </div>
    <div className="clip-text-right bg-purple-50 p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-purple-800 mb-4">
        Tales Told Around Fires
      </h3>
      <p className="text-gray-700">
        Our ancestors shared wisdom through stories whispered by firelight. We bring that warmth online — through well-crafted tales and immersive narration.
      </p>
    </div>
  </div>

  {/* Second visual block - Text Left, Image Right */}
  <div className="grid lg:grid-cols-2 gap-10 items-center">
    <div className="clip-text-left bg-purple-50 p-8 rounded-lg shadow-md order-2 lg:order-1">
      <h3 className="text-2xl font-bold text-purple-800 mb-4">
        A Global Quilt of Voices
      </h3>
      <p className="text-gray-700">
        From village to village, every culture stitches its own story.
        WooveVen Tales weaves these together into one vibrant, diverse tapestry.
      </p>
    </div>
    <div className="clip-image-right w-full h-full order-1 lg:order-2">
      <Image
        src="/about2.jpeg"
        alt="Global folktale storytelling"
        width={600}
        height={400}
        className="w-full h-auto object-cover shadow-lg"
      />
    </div>
  </div>
</section>

  {/* Call to Action */}
          <section className="bg-purple-100 p-10 rounded-xl text-center shadow-lg">
            <h3 className="text-3xl font-bold text-purple-900 mb-4">
              Want to share a tale from your roots?
            </h3>
            <p className="text-gray-700 mb-6">
              Join our community of storytellers and help us grow this global
              archive.
            </p>
            <button className="bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-900 transition">
              Submit Your Story
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

