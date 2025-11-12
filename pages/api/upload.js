import formidable from "formidable";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: { bodyParser: false },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to parse form data" });
    }

    try {
      const { name, email, event_date, address, notes } = fields;
      const file = files.photo;
      if (!file) return res.status(400).json({ error: "No photo uploaded" });

      const fileBuffer = fs.readFileSync(file.filepath);
      const filename = `${Date.now()}_${file.originalFilename}`;
      const filepath = `uploads/${filename}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("requests")
        .upload(filepath, fileBuffer, { contentType: file.mimetype });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from("requests").getPublicUrl(uploadData.path);
      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("requests").insert([
        {
          name,
          email,
          address,
          event_date,
          notes,
          photo_path: uploadData.path,
          photo_url: publicUrl,
          file_type: file.mimetype,
          file_size: file.size,
          status: "submitted",
        },
      ]);

      if (insertError) throw insertError;

      return res.status(200).json({ success: true, message: "Uploaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
}
