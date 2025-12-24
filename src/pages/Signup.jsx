import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgSU from "../assets/bgSU3.png";

export default function Signup() { //createSUform
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm({ ...form, [k]: v });

  const validate = () => {
    let e = {};
    
    // Email validation
    if (!form.email.trim()) e.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email"; //thõa yêu cầu của Email

    // Simplified Password Validation (matching Login.jsx exactly)
    const isPasswordComplex = /[A-Z]/.test(form.password) && 
                              /[a-z]/.test(form.password) && 
                              /\d/.test(form.password) && 
                              /[^A-Za-z0-9]/.test(form.password);

    if (!form.password) {
      e.password = "Password required";
    } else if (form.password.length < 6) {
      e.password = "At least 6 characters";
    } else if (!isPasswordComplex) {
      e.password = "Needs uppercase, lowercase, number, and special character";
    }

    if (form.confirm !== form.password)
      e.confirm = "Passwords do not match";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // Reset any previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first: form.first,
          last: form.last,
          email: form.email.trim(),
          password: form.password,
          phone: form.phone
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Store the JWT token returned by the backend
        localStorage.setItem("token", data.token);
        setSuccessMessage("Sign up successful! Redirecting to login...");
        
        // Wait briefly so the user can see the success message
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Server-side error (e.g., email already in use)
        setErrors({ server: data.msg || "Registration failed" });
      }
    } catch (err) {
      console.error("Connection error:", err);
      setErrors({ server: "Cannot connect to server. Ensure backend is running on port 5000." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Image background */}
      <div
        className="absolute inset-0 bg-center bg-cover saturate-110 contrast-110 animate-wavy-bg"
        style={{ backgroundImage: `url(${bgSU})`, imageRendering: "auto" }}
      />

      <div className="absolute inset-0 bg-black/0 dark:bg-black/20"></div>

      {/* Signup Card */}
      <div className="signup-card relative z-10 w-[480px] max-w-[90%] 
                      rounded-xl shadow-2xl px-10 py-10 fadeZoom bg-[#8a5a38]/85 backdrop-blur-2xl">

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 dark:text-gray-200 hover:scale-110 transition"
          >
            <svg width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M4 4L22 22M22 4L4 22" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-serif text-center mb-6 dark:text-white">
          Create an account
        </h1>
        {successMessage && (
          <p className="mb-4 rounded-lg bg-green-100 text-green-700 text-sm px-4 py-2 text-center">
            {successMessage}
          </p>
        )}

        <form onSubmit={submit}>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm dark:text-gray-300">First name</label>
              <input className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333]"
                onChange={(e) => update("first", e.target.value)} />
            </div>

            <div className="flex-1">
              <label className="text-sm dark:text-gray-300">Last name</label>
              <input className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333]"
                onChange={(e) => update("last", e.target.value)} />
            </div>
          </div>

          <label className="text-sm dark:text-gray-300">Email</label>
          <input className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333]"
            onChange={(e) => update("email", e.target.value)} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <label className="block mt-3 text-sm dark:text-gray-300">Password</label>
          <input type="password"
            className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333]"
            onChange={(e) => update("password", e.target.value)} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <label className="block mt-3 text-sm dark:text-gray-300">Confirm password</label>
          <input type="password"
            className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333]"
            onChange={(e) => update("confirm", e.target.value)} />
          {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}

          <label className="block mt-3 text-sm dark:text-gray-300">
            Phone number (optional)
          </label>
          <input
            className="w-full p-3 rounded-lg bg-[#f4f4f4] dark:bg-[#333] mb-6"
            onChange={(e) => update("phone", e.target.value)} />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-black dark:bg-white dark:text-black text-white hover:opacity-80 transition"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm dark:text-gray-300">
          Already have an account?
          <Link className="ml-1 text-blue-500 hover:underline" to="/login">Log in</Link>
        </p>

        <p className="text-center mt-6 text-xs text-gray-600 dark:text-gray-400">
          By creating an account, you agree to our <span className="underline">Terms & Service</span>
        </p>
      </div>
    </div>
  );
}
