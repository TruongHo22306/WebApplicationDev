import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import bgImage from "../assets/bglogin1.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("authToken", "demo-token");
      navigate("/");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen flex bg-white dark:bg-[#1a1a1a] overflow-hidden">

      {/* LEFT IMAGE PANEL — slide left */}
      <div className="hidden lg:flex w-1/2 relative rounded-r-3xl overflow-hidden animate-slideLeft">
        <img src={bgImage} alt="bg"
          className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />

        <div className="z-10 mt-auto mb-20 ml-10 text-white drop-shadow-2xl animate-fade">
          <h1 className="text-5xl font-light leading-tight">
            Get<br />Everything<br />You want
          </h1>
        </div>
      </div>

      {/* RIGHT FORM PANEL — slide right */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 animate-slideRight">

        <div className="animate-fade">
          <Logo />
        </div>

        <h1 className="text-5xl font-serif mb-3 dark:text-white animate-fade">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-10 dark:text-gray-300 animate-fade">
          Enter your email and password to access your account
        </p>

        <div className="w-full max-w-md animate-fade">

          {/* EMAIL */}
          <label className="font-semibold text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 mb-5 p-3 rounded-lg bg-[#ece8e6] dark:bg-[#2b2b2b]"
          />

          {/* PASSWORD */}
          <label className="font-semibold text-gray-700 dark:text-gray-200">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full mt-1 mb-3 p-3 rounded-lg bg-[#ece8e6] dark:bg-[#2b2b2b] pr-12"
            />

            {/* SHOW/HIDE PASSWORD — giữ nguyên bản bạn thích */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-500 hover:text-black dark:hover:text-white transition"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4-10-7 0-1.042.42-2.23 1.207-3.36M4.23 4.23l15.54 15.54M9.88 9.88a3 3 0 104.24 4.24"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M2.036 12.322C3.423 7.953 7.36 5 12 5c4.637 0 8.573 2.951 9.96 7.316a1.007 1.007 0 010 .678C20.573 16.049 16.637 19 12 19c-4.64 0-8.577-2.953-9.964-7.322z"/>
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* REMEMBER */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <button className="text-sm text-gray-700 hover:underline dark:text-gray-300">
              Forgot Password
            </button>
          </div>

          {/* SIGN IN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-lg transition-all
              ${loading ? "bg-gray-400" : "bg-black dark:bg-white dark:text-black text-white"}
            `}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>

          {/* SIGNUP LINK */}
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
            Don’t have an account?
            <Link to="/signup" className="ml-1 text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
