import Sidebar from "../components/Sidebar";

export default function Layout({ children, darkMode, onToggleDarkMode }) {
  return (
    <div className="flex">
      {/* Sidebar luôn luôn hiển thị */}
      <Sidebar />

      {/* Content (page) */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
