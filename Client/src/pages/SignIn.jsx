import React, { useState } from "react";
import { loginUser } from "../api/user.api.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice.js";


export default function SignIn() {
  const [copied, setCopied] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state)=> state.auth);
  const dispatch = useDispatch();


   const sampleEmail = "demo@test.com";
  const samplePassword = "demo123";

  function handleCopy(value, type) {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(""), 1500);
  }


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
      dispatch(login(data.user))
      navigate({to: '/dashboard'})
      setForm({ email: "", password: "" });
      setSuccess(true);
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

        <div className="mt-4 p-3 rounded-xl border border-indigo-100 bg-indigo-50 text-sm text-gray-700 shadow flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Sample Email:</span>
            <span className="bg-white rounded px-2 py-1">{sampleEmail}</span>
            <button
              type="button"
              onClick={() => handleCopy(sampleEmail, "email")}
              className={`ml-2 px-2 py-1 rounded text-xs ${
                copied === "email"
                  ? "bg-green-500 text-white"
                  : "bg-indigo-200 text-indigo-700 hover:bg-indigo-300"
              } transition`}
            >
              {copied === "email" ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Password:</span>
            <span className="bg-white rounded px-2 py-1">{samplePassword}</span>
            <button
              type="button"
              onClick={() => handleCopy(samplePassword, "password")}
              className={`ml-2 px-2 py-1 rounded text-xs ${
                copied === "password"
                  ? "bg-green-500 text-white"
                  : "bg-indigo-200 text-indigo-700 hover:bg-indigo-300"
              } transition`}
            >
              {copied === "password" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        
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
