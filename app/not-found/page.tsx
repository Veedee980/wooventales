export const dynamic = "force-dynamic"; // also safe here

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
    </div>
  );
}
