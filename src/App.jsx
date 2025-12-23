import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import CreateStory from "./pages/CreateStory";
import Profile from "./pages/Profile";
import Stories from "./pages/Stories";

function AnimatedRoutes({ darkMode, onToggleDarkMode }) {
  const location = useLocation();
  const routeKey = location.pathname;

  return (
    <Routes location={location} key={routeKey}>
      {/* Login / signup do not use the sidebar layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Home darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
          </Layout>
        }
      />

      <Route
        path="/search"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Search darkMode={darkMode} />
          </Layout>
        }
      />

      <Route
        path="/reels"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Reels darkMode={darkMode} />
          </Layout>
        }
      />

      <Route
        path="/messages"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Messages darkMode={darkMode} />
          </Layout>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Settings />
          </Layout>
        }
      />

      <Route
        path="/create"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Create darkMode={darkMode} />
          </Layout>
        }
      />

      <Route
        path="/create-story"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <CreateStory darkMode={darkMode} />
          </Layout>
        }
      />

      <Route
        path="/stories"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Stories />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} routeKey={routeKey}>
            <Profile darkMode={darkMode} />
          </Layout>
        }
      />
    </Routes>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <AnimatedRoutes
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    </BrowserRouter>
  );
}
