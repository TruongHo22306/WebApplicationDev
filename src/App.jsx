import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Stories from "./pages/Stories";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* LOGIN / SIGNUP không cần sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* TẤT CẢ PAGE KHÁC ĐỀU NẰM TRONG LAYOUT */}
        <Route
          path="/"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Home darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Search darkMode={darkMode} />
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

        <Route
          path="/messages"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Messages darkMode={darkMode} />
            </Layout>
          }
        />
          <Route path="/settings" element={<Settings />} />   

        <Route
          path="/create"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Create darkMode={darkMode} />
            </Layout>
          }
        />

        <Route
          path="/stories"
          element={
            <Layout darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)}>
              <Stories />
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

      </Routes>
    </BrowserRouter>
  );
}
