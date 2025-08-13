"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/auth-helpers-nextjs";

export default function EditProfilePage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error.message);
        setLoading(false);
        return;
      }

      const currentUser = session?.user;
      if (!currentUser) {
        setStatus("You need to be logged in.");
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("full_name, avatar_url, bio")
        .eq("id", currentUser.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError.message);
      } else {
        setFullName(profile?.full_name ?? "");
        setAvatarUrl(profile?.avatar_url ?? "");
        setBio(profile?.bio ?? "");
      }

      setLoading(false);
    };

    fetchUserAndProfile();
  }, [ supabase ]);

  const handleUpdateProfile = async () => {
    if (!user) {
      setStatus("No user logged in.");
      return;
    }

    setStatus("Updating...");

    const updates = {
      id: user.id,
      full_name: fullName.trim(),
      avatar_url: avatarUrl.trim(),
      bio: bio.trim(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.error("Update error:", error.message);
      setStatus("Failed to update profile.");
    } else {
      setStatus("Profile updated!");
      setTimeout(() => router.push("/profile"), 1500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6] text-[#2D0D3A]">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5F0E6] flex flex-col items-center pt-20 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-[#522867] mb-4 text-center">Edit Profile</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Avatar URL</label>
            <input
              type="text"
              placeholder="Enter your avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="bg-[#522867] text-white px-4 py-2 rounded-full hover:bg-[#6b3594] transition mt-2"
          >
            Save Changes
          </button>

          {status && (
            <p className="text-center text-sm text-[#522867]">{status}</p>
          )}
        </div>
      </div>
    </section>
  );
}
