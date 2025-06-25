import React from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { logoutUser } from "../api/user.api.js";
import md5 from "md5";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const userObj = useSelector((state) => state.auth.user);
  const user = userObj?.user;

  // Use gravatar (avatar based on email, fallback to generic icon)
  const gravatarUrl = user?.email
    ? `https://www.gravatar.com/avatar/${md5(
        user.email.trim().toLowerCase()
      )}?d=identicon`
    : "https://www.gravatar.com/avatar/?d=mp";

  // Show minimal navbar on /dashboard (and subroutes) if authenticated
  const isDashboard = location.pathname.startsWith("/dashboard");

  if (isAuthenticated && isDashboard) {
    return (
      <nav className="flex items-center justify-between bg-white shadow px-6 py-3">
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-700 tracking-wide"
        >
          Shorty<span className="text-purple-600">Link</span>
        </Link>
        <div className="flex items-center gap-4">
          <img
            src={gravatarUrl}
            alt="User Gravatar"
            className="h-10 w-10 rounded-full border"
          />
          <span className="font-semibold text-indigo-700">
            {user.name || "User"}
          </span>
          <button
            onClick={async () => {
              await logoutUser(); // 1. Backend logout
              dispatch(logout()); // 2. Frontend Redux logout
              navigate({to: "/signin"});
            }}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  // Otherwise, show public navbar
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
            location.pathname === "/login" || location.pathname === "/signin"
              ? "font-bold underline"
              : ""
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
