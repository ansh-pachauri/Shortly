"use client";
import { useState } from "react";
import axios from "axios";

type urlData = {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
};

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [url, setUrl] = useState<urlData[]>([]);

  const handleSubmit = async () => {
    if (!inputUrl) {
      alert("Please enter a URL");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3001/", { url: inputUrl });
      const newUrlData: urlData = {
        originalUrl: response.data.originalUrl,
        shortUrl: response.data.shortUrl,
        createdAt: new Date().toLocaleString(),
      };

      setUrl((prev) => [...prev, newUrlData]);
      setInputUrl("");
    } catch (error) {
      console.error("Error submitting URL:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">Shortly</h1>
        <p className="text-center text-gray-500 mb-8">Shorten your URLs in one click!</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter your URL"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Shorten
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Shortened URLs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Original URL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Shortened URL</th>
                  <th className="px-4 py-2 text-left text-gray-600">Created At</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {url.map((u, key) => (
                  <tr key={key} className="border-t">
                    <td className="px-4 py-2 break-all text-blue-700">{u.originalUrl}</td>
                    <td className="px-4 py-2">
                      <a
                        href={u.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 underline hover:text-purple-800"
                      >
                        {u.shortUrl}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-gray-500">{u.createdAt}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => navigator.clipboard.writeText(u.shortUrl)}
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}
                {url.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                      No URLs shortened yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


