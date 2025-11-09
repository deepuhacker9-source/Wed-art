import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Ethereal Portraits",
  description: "Premium wedding & anniversary portraits - hyper realistic, framed & delivered."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-4xl mx-auto px-4 py-8">{children}</main>
          <footer className="border-t mt-12 py-6 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Ethereal Portraits — luxury portrait gifts.
          </footer>
        </div>
      </body>
    </html>
  );
}￼Enter
