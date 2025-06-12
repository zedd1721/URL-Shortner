import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link
        to="/"
        className="text-2xl font-extrabold text-indigo-700 tracking-wide"
      >
        Shorty<span className="text-purple-600">Link</span>
      </Link>
      <div className="flex gap-6">
        <Link
          to="/"
          className={`hover:text-indigo-700 transition ${
            location.pathname === "/" ? "font-bold underline" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/signin"
          className={`hover:text-indigo-700 transition ${
            location.pathname === "/login" ? "font-bold underline" : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`hover:text-indigo-700 transition ${
            location.pathname === "/signup" ? "font-bold underline" : ""
          }`}
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
