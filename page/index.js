import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 tracking-tight">
          Ethereal Portraits
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mb-8">
          Commission stunning hand-painted portraits for weddings and anniversaries,
          made by India’s best artists and delivered to your door.
        </p>
        <Link href="/request">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            Request a Portrait
          </button>
        </Link>
      </main>
    </>
  );
}
