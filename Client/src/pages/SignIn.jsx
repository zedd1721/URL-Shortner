import React, { useState } from "react";
import { loginUser } from "../api/user.api.js";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const data = await loginUser(form.email, form.password);
      setForm({ email: "", password: "" });
      setSuccess(true);
      // Optionally: redirect or set auth token here
    } catch (e) {
      setError(e.message); // Show backend message!
      setForm({ ...form, password: "" });
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center mt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">
          Login to Your Account
        </h1>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow hover:scale-105 transition-transform duration-150 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {success && (
        <div className="text-green-600 mt-4 font-semibold">
          Login successful!
        </div>
      )}
      <div className="mt-2 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="underline text-indigo-600 hover:text-indigo-800">
          Sign up
        </Link>
      </div>
    </div>
  );
}
