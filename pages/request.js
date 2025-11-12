import { useState } from "react";

export default function RequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !photo) {
      alert("Please fill name, email, and upload a photo.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("event_date", date);
    formData.append("address", address);
    formData.append("notes", notes);
    formData.append("photo", photo);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Request submitted successfully!");
        setName("");
        setEmail("");
        setDate("");
        setAddress("");
        setNotes("");
        setPhoto(null);
      } else {
        setMessage("❌ " + (data.error || "Upload failed"));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a Portrait</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-3">
          <div className="font-medium">Full Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-3">
          <div className="font-medium">Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-3">
          <div className="font-medium">Event Date (Wedding/Anniversary)</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-3">
          <div className="font-medium">Address</div>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="2"
            className="w-full p-2 border rounded"
          ></textarea>
        </label>

        <label className="block mb-3">
          <div className="font-medium">Upload Photo</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </label>

        <label className="block mb-3">
          <div className="font-medium">Notes for Artist</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {message && (
          <p
            className={`mt-4 font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
