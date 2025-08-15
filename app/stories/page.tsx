"use client";

export const dynamic = 'force-dynamic'; // disables static prerendering

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/lib/supabase/client";

type Story = {
  id: string;
  title: string;
  text: string;
  nation: string;
  source: string;
};

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNation, setSelectedNation] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folktales")
        .select("*")
        .order("title", { ascending: true });

      if (error) {
        console.error("Error fetching folktales:", error);
      } else {
        setStories(data);
        setFilteredStories(data);
      }
      setLoading(false);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    let updated = stories;
    if (searchTerm.trim() !== "") {
      updated = updated.filter((story) =>
        (story.title + story.text).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedNation !== "All") {
      updated = updated.filter(
        (story) => story.nation.toLowerCase() === selectedNation.toLowerCase()
      );
    }
    setFilteredStories(updated);
    setVisibleCount(12);
  }, [searchTerm, selectedNation, stories]);

  const nations = Array.from(new Set(stories.map((s) => s.nation))).sort();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/story-bg.jpg"
          width={1920}
          height={1080}
          alt="WooveVen Tales Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Discover Wooven Folktales
          </h1>
          <p className="text-white mt-3 max-w-xl mx-auto drop-shadow">
            Timeless folktales from cultures around the world.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-[#F9F7F2] px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search folktales..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <select
            value={selectedNation}
            onChange={(e) => setSelectedNation(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          > 
            <option value="All">All Nations</option>
            {nations.map((nation, idx) => (
              <option key={idx} value={nation}>
                {nation.charAt(0).toUpperCase() + nation.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 bg-[#F9F7F2] px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-full text-gray-600">Loading stories...</p>
          ) : filteredStories.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">No stories found.</p>
          ) : (
            filteredStories.slice(0, visibleCount).map((story) => (
              <div
                key={story.id}
                onClick={() => router.push(`/stories/${story.id}`)}
                className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer transition-transform hover:-translate-y-1 p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{story.title}</h2>
                  <span className="text-sm text-purple-600">{story.nation}</span>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                    {story.text?.slice(0, 200)}...
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
<button
  onClick={async (e) => {
    e.stopPropagation();

    // Prevent multiple clicks if needed
    if (e.currentTarget.disabled) return;
    e.currentTarget.disabled = true;

    const supabase = createClient();

    if (!story?.id) {
      alert("Invalid story ID.");
      e.currentTarget.disabled = false;
      return;
    }

    // Get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Please log in to favorite a story.");
      console.error("Auth error:", userError);
      e.currentTarget.disabled = false;
      return;
    }

    console.log("🟣 USER ID:", user.id);
    console.log("🟢 STORY ID:", story.id);

    // Insert favorite
    const { error: insertError } = await supabase.from("favorites").insert([
      {
        user_id: user.id,
        story_id: story.id,
      },
    ]);

    if (insertError) {
      console.error("❌ Insert error:", JSON.stringify(insertError, null, 2));
      alert(`Something went wrong: ${insertError.message || "Try again."}`);
    } else {
      alert(`✅ Added "${story.title}" to your favorites!`);
    }

    e.currentTarget.disabled = false;
  }}
  className="p-2 rounded-full hover:bg-purple-100 transition"
>
  favorite
  <HeartIcon className="h-5 w-5 text-pink-500" />
</button>




                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Bookmarked ${story.title}!`);
                    }}
                    className="p-2 rounded-full hover:bg-purple-100 transition"
                  > add to bookmarks
                    <BookmarkIcon className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {visibleCount < filteredStories.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(visibleCount + 12)}
              className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
}

