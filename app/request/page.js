"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  async function submitRequest(e) {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !photoUrl) {
      alert("Please provide name, email and a photo URL (you can upload to any image host).");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("requests")
      .insert([{
        name, email, event_date: date || null, notes, photo_url: photoUrl, status: "submitted", created_at: new Date()
      }]);

    setLoading(false);
    if (error) {
      console.error(error);
      alert("Failed to submit. Try again.");
    } else {
      setSuccess(true);
      setName(""); setEmail(""); setDate(""); setNotes(""); setPhotoUrl("");
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Request a Portrait</h1>
      <form onSubmit={submitRequest} className="bg-white p-6 rounded shadow-sm max-w-2xl">
        <label className="block mb-3">
          <div className="text-sm font-medium">Full name</div>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>

        <label className="block mb-3">
          <div className="text-sm font-medium">Email</div>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>

        <label className="block mb-3">
          <div className="text-sm font-medium">Event date (wedding/anniversary)</div>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </label>

        <label className="block mb-3">
          <div className="text-sm font-medium">Photo URL (temporary)</div>
          <input value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} placeholder="https://..." className="mt-1 w-full p-2 border rounded" />
          <div className="text-xs text-gray-500 mt-1">Tip: upload the photo to imgur or any image host and paste the link here for now.</div>
        </label>

        <label className="block mb-4">
          <div className="text-sm font-medium">Notes for artist</div>
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="mt-1 w-full p-2 border rounded" rows="4" />
        </label>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-ink text-cream rounded">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
          <div className="text-sm text-gray-600">Price starts at ₹4,999 • 7 day delivery</div>
        </div>

        {success && <div className="mt-4 text-green-600">Request submitted — we will contact you within 24 hours.</div>}
      </form>
    </section>
  );
  }
