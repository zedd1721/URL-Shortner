import React, { useState } from "react";
import { registerUser } from "../api/user.api.js";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const data = await registerUser(form.name, form.email, form.password);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccess(true);
    } catch (e) {
      // e.message will be your backend error message
      setError(e.message);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
          Create a New Account
        </h1>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.name}
            onChange={handleChange}
          />
        </div>
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
            autoComplete="new-password"
            required
            className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={form.confirmPassword}
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {success && (
        <div className="text-green-600 mt-4 font-semibold">
          Signup successful! You can now{" "}
          <Link to="/signin" className="underline cursor-pointer">
            log in
          </Link>
          .
        </div>
      )}
    </div>
  );
}
