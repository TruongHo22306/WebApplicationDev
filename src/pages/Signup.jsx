import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white border rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link className="text-blue-500 font-semibold ml-1" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
