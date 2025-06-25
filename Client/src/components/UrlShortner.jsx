import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, setStyle } from "framer-motion";
import { createShortUrl } from "../api/shortUrl.api";

export default function UrlShortner() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    // Basic URL validation
    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
      setError("Please enter a valid URL (starting with http:// or https://)");
      setLoading(false);
      return;
    }

    try {
      // If authenticated, send customUrl too
      const url = isAuthenticated
        ? await createShortUrl(originalUrl, slug)
        : await createShortUrl(originalUrl);

      if (url && url.shortUrl) {
        setShortUrl(url.shortUrl); // Assuming API returns {shortUrl: "..."}
      } else if (typeof url === "string") {
        setShortUrl(url); // fallback for old API
      } else {
        setError("Failed to shorten link.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to connect to server."
      );
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-2">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 text-indigo-700">URL Shortener</h1>
        <p className="text-gray-500 mb-6 text-center">
          Paste your long URL below and get a short, easy-to-share link.<br />
          {isAuthenticated
            ? "You can also choose a custom alias!"
            : "No login required!"}
        </p>
        <form onSubmit={handleShorten} className="w-full flex flex-col gap-4">
          <input
            className="rounded-xl px-4 py-3 border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all text-lg"
            type="url"
            placeholder="Paste your long URL here..."
            value={originalUrl}
            onChange={e => setOriginalUrl(e.target.value)}
            required
            disabled={loading}
          />
          {/* Show custom url input only if user is authenticated */}
          {isAuthenticated && (
            <input
              className="rounded-xl px-4 py-3 border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-lg"
              type="text"
              placeholder="Custom URL (optional, e.g. my-awesome-link)"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              disabled={loading}
              maxLength={32}
            />
          )}
          <button
            className={`w-full py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow hover:scale-105 transition-transform duration-150
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"}
            `}
            type="submit"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {error && (
          <motion.div
            className="text-red-600 mt-3 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {shortUrl && (
          <motion.div
            className="mt-8 w-full bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 flex flex-col items-center shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gray-500 text-xs mb-1">Shortened Link:</span>
            <div className="flex items-center gap-2 w-full">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 font-bold break-all hover:underline transition"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 px-3 py-1 text-xs rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <footer className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} ShortyLink. All rights reserved.
      </footer>
    </div>
  );
}
