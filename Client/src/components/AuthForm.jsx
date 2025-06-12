import React, { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  // type = "login" or "signup"
  const [form, setForm] = useState({
    email: "",
    password: "",
    ...(type === "signup" ? { confirmPassword: "" } : {}),
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (type === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // You can add more validation here
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
    >
      <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">
        {type === "login" ? "Login to Your Account" : "Create a New Account"}
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
          autoComplete={type === "login" ? "current-password" : "new-password"}
          required
          className="w-full px-4 py-2 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      {type === "signup" && (
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
      )}
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow hover:scale-105 transition-transform duration-150"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}
