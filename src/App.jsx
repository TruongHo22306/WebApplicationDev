import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import SearchPage from "./pages/Search";
import Reels from "./pages/Reels";

import Layout from "./layout/Layout";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN + SIGNUP KHÔNG CÓ SIDEBAR */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* TẤT CẢ PAGE CÒN LẠI ĐỀU CÓ SIDEBAR */}
        <Route
          path="/"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Home
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <SearchPage />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Profile />
            </Layout>
          }
        />

        <Route
        path="/reels"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
            <Reels darkMode={darkMode} />
          </Layout>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}
