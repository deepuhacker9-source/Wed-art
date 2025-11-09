"use c"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setRequests(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Requests</h1>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="border rounded-lg p-4 shadow">
              <img
                src={req.image_url}
                alt={req.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{req.name}</h2>
              <p className="text-sm text-gray-600">{req.email}</p>
              <p className="mt-1">{req.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
