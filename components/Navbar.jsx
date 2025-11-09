import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-4xl mx-auto py-6 px-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-semibold">
        <span className="text-ink">Ethereal</span>
        <span className="ml-2 text-gold">Portraits</span>
      </Link>
      <div className="space-x-4">
        <Link href="/artists" className="text-sm">Artists</Link>
        <Link href="/request" className="text-sm font-medium px-3 py-2 rounded bg-ink text-cream">Request</Link>
      </div>
    </nav>
  );
}
