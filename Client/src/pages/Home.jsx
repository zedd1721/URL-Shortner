import UrlShortner from "../components/UrlShortner";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import heroSvg from "../assets/heroSVG.svg";
import { useState, useEffect } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1500); // show after 1.5s
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative flex flex-col items-center px-3">
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-[90%] p-6 md:p-8 text-center relative animate-fade-in">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              ⏳ Please Hold On
            </h2>
            <p className="text-gray-700 mb-4 text-base md:text-lg">
              This app is hosted on a free server. After being inactive, it
              takes around <strong>10–20 seconds</strong> to wake up.
              <br />
              <br />
              Kindly wait a few moments before using the features.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              We appreciate your patience!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Continue to Site
            </button>
          </div>
        </div>
      )}

      {/* Hero Section with SVG illustration */}
      <motion.div
        className="max-w-3xl text-center mt-12 mb-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-3 flex items-center justify-center gap-2">
              Simplify Your Links, Instantly{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              ShortyLink helps you turn long, ugly URLs into short, shareable
              links.
              <br />
              <span className="block mt-1 text-indigo-600 font-medium">
                No login needed for basic shortening.
              </span>
              <br />
              Keep your links clean and easy—whether for social media, business,
              or personal use!
            </p>
          </div>
          <img
            src={heroSvg}
            alt="URL Shortening"
            className="w-64 object-contain hidden md:block"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* URL Shortener */}
      <UrlShortner />

      {/* How It Works */}
      <div className="mt-16 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">🔗</span>
            <span className="font-semibold">1. Paste your long URL</span>
          </div>
          <div className="h-10 w-10 text-3xl md:rotate-0 rotate-90">➡️</div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">⚡</span>
            <span className="font-semibold">2. Click “Shorten URL”</span>
          </div>
          <div className="h-10 w-10 text-3xl md:rotate-0 rotate-90">➡️</div>
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">📋</span>
            <span className="font-semibold">
              3. Copy & share your short link!
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 mb-10 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          Why ShortyLink?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🚫</div>
            <div className="font-bold mb-1">No Account Needed</div>
            <div className="text-gray-500">
              Shorten links instantly—no sign up or login required.
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="font-bold mb-1">Track Your Links</div>
            <div className="text-gray-500">
              Sign up to manage, edit, or track your short links.
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-bold mb-1">Safe & Reliable</div>
            <div className="text-gray-500">
              Your links are always secure and available.
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials or Stats */}
      <div className="bg-indigo-50 rounded-xl shadow-inner py-8 px-6 text-center max-w-3xl w-full mb-16">
        <div className="text-xl text-indigo-700 font-bold mb-2">
          Trusted by 1,000+ users
        </div>
        <div className="text-gray-500 mb-2">"Super easy and fast to use!"</div>
        <div className="text-gray-500 mb-2">
          "No login needed. Just what I wanted."
        </div>
        <div className="text-gray-400 text-sm">– Real ShortyLink Users</div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-6 mt-auto text-center text-gray-500">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span>
            &copy; {new Date().getFullYear()} ShortyLink. All rights reserved.
          </span>
          <Link to="/" className="mx-2 hover:text-indigo-700">
            Home
          </Link>
          <Link to="/login" className="mx-2 hover:text-indigo-700">
            Login
          </Link>
          <Link to="/signup" className="mx-2 hover:text-indigo-700">
            Signup
          </Link>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-indigo-700 text-xl">
            🐦
          </a>
          <a href="#" className="hover:text-indigo-700 text-xl">
            💼
          </a>
          <a href="#" className="hover:text-indigo-700 text-xl">
            📧
          </a>
        </div>
      </footer>
    </div>
  );
}
