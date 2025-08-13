"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

type Favorite = {
  story_id: string;
  stories: {
    title: string;
    image_url: string;
  }[];
};

export default function ProtectedPage() {
  const supabase = createClientComponentClient();
  const [ , setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("story_id, stories(title, image_url)")
          .eq("user_id", user.id); // Make sure you're only getting current user's favorites

        if (error) throw error;

        if (data) {
          setFavorites(data as Favorite[]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndFavorites();
  }, [supabase, router]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-violet-300">Loading favorites...</p>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 text-white bg-[#0a0b1e] font-['Orbitron']">
      <h1 className="text-3xl font-bold mb-6 text-violet-300">
        Your Favorite Stories ✨
      </h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.story_id}
              className="border border-violet-500 rounded-md p-4 bg-[#1c1e3a] hover:shadow-[0_0_10px_rgba(165,105,255,0.3)] transition"
            >
              {fav.stories.map((story, index) => (
                <div key={index}>
                  <Image
                    src={story.image_url}
                    alt={story.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h2 className="text-xl font-semibold">{story.title}</h2>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
