// app/_not-found/page.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}
