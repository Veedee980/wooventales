"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaDownload, FaPlay, FaPause } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { createClient } from "@/lib/supabase/client";

type Story = {
  id: string;
  title: string;
  text: string;
  nation: string;
  source: string;
};

export default function StoryDetailPage() {
  const supabase = createClient();
  const { id } = useParams();
  const router = useRouter();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speechRate, setSpeechRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const wordsPerPage = 200;

  const getPaginatedText = (text: string) => {
    const words = text.split(" ");
    const pages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(" "));
    }
    return pages;
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const count = parseInt(localStorage.getItem("downloadCount") || "0", 10);
    setDownloadCount(count);

    const fetchStory = async () => {
      const { data, error } = await supabase
        .from("folktales")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading story:", error);
        setStory(null);
      } else {
        setStory(data);
      }
      setLoading(false);
    };

    if (id) fetchStory();

    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
      if (synthVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(synthVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [id, supabase, selectedVoice]);

  const handleDownload = () => {
    if (!story) return;
    if (downloadCount >= 10) {
      alert("You have reached the maximum of 10 downloads.");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Title: ${story.title}\nNation: ${story.nation}\nSource: ${story.source}\n\n${story.text}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${story.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem("downloadCount", String(newCount));
  };

  const handlePlayAudio = () => {
    if (!story) return;
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(`${story.title}. ${story.text}`);
      utterance.lang = "en-US";
      utterance.rate = speechRate;
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen text-gray-600">
          Loading story...
        </div>
      </>
    );
  }

  if (!story) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-gray-600 text-center px-4">
          <p>Story not found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const paginatedText = getPaginatedText(story.text);
  const totalPages = paginatedText.length;

  return (
    <>
      <Navbar />
<section className="pt-32 px-4 pb-12 max-w-3xl mx-auto bg-[#fffefc] rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-purple-700 mb-2 text-center">{story.title}</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {story.nation} | Source:{" "}
          <a href={story.source} className="text-blue-600 underline" target="_blank">
            {story.source}
          </a>
        </p>

        {/* Story content as pages */}
        <article className="text-[1.1rem] leading-8 tracking-wide text-gray-800 whitespace-pre-wrap font-serif min-h-[60vh] px-6 py-8 bg-[#fffaf3] border border-gray-300 rounded-lg shadow-md">
          {paginatedText[currentPage]}
        </article>

        {/* Pagination buttons */}
        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={currentPage === 0}
            onClick={handlePrevious}
            className="px-4 py-2 bg-purple-300 text-white rounded-full hover:bg-purple-400 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages - 1}
            onClick={handleNext}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {/* Control buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 items-center">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition"
            title={`Download Tale (${10 - downloadCount} left)`}
          >
            <FaDownload size={20} />
          </button>
          <button
            onClick={handlePlayAudio}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
            title={isSpeaking ? "Pause Audio" : "Play Audio"}
          >
            {isSpeaking ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition"
            title="Back to Stories"
          >
            <MdArrowBack size={20} />
          </button>
        </div>

        {/* Voice selection */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-full md:w-auto"
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <input
            placeholder="Speech Rate (0.5 - 2)"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
            className="w-full md:w-48 accent-purple-600"
          />
          <span className="text-sm text-gray-600">
            Speed: {speechRate.toFixed(1)}x
          </span>
        </div>
      </section>
      <Footer />
    </>
  );
}
