"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://campus-earache-schematic.ngrok-free.dev/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

 return (
  <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <div className="w-full max-w-4xl">

      <div className="bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-5xl font-bold text-slate-900 text-center">
          PDF Summarizer
        </h1>

        <p className="text-center text-slate-600 mt-3 mb-8">
          Upload a PDF and get an AI-generated summary instantly.
        </p>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6">
          <input
            type="file"
            accept=".pdf"
            className="w-full text-slate-700"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

          <button
            onClick={uploadPDF}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Generating Summary..." : "Summarize PDF"}
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Summary
          </h2>

          <div className="bg-slate-50 border rounded-xl p-5 min-h-[250px]">
            <p className="text-slate-900 whitespace-pre-wrap leading-7">
              {summary || "Your AI-generated summary will appear here."}
            </p>
          </div>
        </div>

      </div>
    </div>
  </main>
);
}