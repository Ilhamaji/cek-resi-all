import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const isActive = (path) => {
    // Exact match for root, or active for about
    if (
      path === "/" &&
      (location.pathname === "/" || location.pathname === "/cek-resi-all")
    )
      return true;
    if (path === "/about" && location.pathname === "/about") return true;
    return false;
  };

  return (
    <nav className="w-full py-5 flex items-center justify-between glass-card px-8 my-6 animate-fade-in z-50 relative">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="font-bold text-xl tracking-tight text-slate-800">
          Cek Resi<span className="text-indigo-600"> All</span>
        </div>
      </div>

      <ul className="flex items-center gap-8 font-medium">
        <li>
          <Link
            to={"/"}
            className={`transition-colors duration-200 ${isActive("/") ? "text-indigo-600 font-semibold" : "text-slate-500 hover:text-indigo-600"}`}
          >
            Track
          </Link>
        </li>
        <li>
          <Link
            to={"/about"}
            className={`transition-colors duration-200 ${isActive("/about") ? "text-indigo-600 font-semibold" : "text-slate-500 hover:text-indigo-600"}`}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
