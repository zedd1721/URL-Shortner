import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api";
import { getUserUrls } from "../api/user.api";
import { motion } from "framer-motion";

export default function UrlShortenerWithList() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const queryClient = useQueryClient();

  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // React Query for user URLs
  const {
    data: urls,
    isLoading,
    isError,
    error: urlError,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getUserUrls,
    enabled: isAuthenticated,
    refetchInterval: 30000,
    staleTime: 0,
  });

  // Handle form submission to create short URL
  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!/^https?:\/\/.+\..+/.test(originalUrl)) {
      setError("Please enter a valid URL (starting with http:// or https://)");
      setLoading(false);
      return;
    }

    try {
      const url = isAuthenticated
        ? await createShortUrl(originalUrl, slug)
        : await createShortUrl(originalUrl);

      if (url && url.shortUrl) {
        setShortUrl(url.shortUrl);
        queryClient.invalidateQueries({ queryKey: ["userUrls"] }); // Refresh the list!
      } else if (typeof url === "string") {
        setShortUrl(url);
        queryClient.invalidateQueries({ queryKey: ["userUrls"] });
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

  const handleCopy = (url, id = null) => {
    setOriginalUrl("");
    setSlug("");
    navigator.clipboard.writeText(url);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-2 pb-10">
      {/* Shortener Form */}
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center mt-10"
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 text-indigo-700">
          URL Shortener
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Paste your long URL below and get a short, easy-to-share link.
          <br />
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
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            disabled={loading}
          />
          {isAuthenticated && (
            <input
              className="rounded-xl px-4 py-3 border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-lg"
              type="text"
              placeholder="Custom URL (optional, e.g. my-awesome-link)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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
                onClick={() => handleCopy(shortUrl)}
                className="ml-2 px-3 py-1 text-xs rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* User URLs Table / List */}
      {isAuthenticated && (
        <div className="w-full max-w-3xl mt-10">
          {/* Loading/Empty/Error States */}
          {isLoading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : isError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
              Error loading your URLs: {urlError.message}
            </div>
          ) : !urls || urls.length === 0 ? (
            <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <p className="text-lg font-medium">No URLs found</p>
              <p className="mt-1">
                You haven't created any shortened URLs yet.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
              <div className="hidden md:block overflow-x-auto h-64">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Original URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Short URL
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {urls
                      .slice()
                      .reverse()
                      .map((url) => (
                        <tr key={url._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <a
                              href={url.full_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-800 hover:underline break-all"
                            >
                              {url.full_url}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`https://url-shortner-t4q8.onrender.com/${url.short_url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 hover:underline break-all"
                            >
                              {`localhost:5000/${url.short_url}`}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {url.clicks}{" "}
                              {url.clicks === 1 ? "click" : "clicks"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() =>
                                handleCopy(
                                  `https://url-shortner-t4q8.onrender.com/${url.short_url}`,
                                  url._id
                                )
                              }
                              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                                copiedId === url._id
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                            >
                              {copiedId === url._id ? "Copied!" : "Copy URL"}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4 p-4">
                {urls
                  .slice()
                  .reverse()
                  .map((url) => (
                    <div
                      key={url._id}
                      className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2"
                    >
                      <div>
                        <span className="text-xs text-gray-500">
                          Original URL:
                        </span>
                        <a
                          href={url.full_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-gray-800 font-medium break-all"
                        >
                          {url.full_url}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">
                          Short URL:
                        </span>
                        <a
                          href={`https://url-shortner-t4q8.onrender.com/${url.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 font-medium break-all"
                        >
                          {`localhost:5000/${url.short_url}`}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Clicks:</span>
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(
                            `https://url-shortner-t4q8.onrender.com/${url.short_url}`,
                            url._id
                          )
                        }
                        className={`mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                          copiedId === url._id
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
                      >
                        {copiedId === url._id ? "Copied!" : "Copy URL"}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
      <footer className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} ShortyLink. All rights reserved.
      </footer>
    </div>
  );
}
