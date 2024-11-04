import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../../Sidebar";
import { useDarkMode } from "../../../utils/useDarkMode";
import { Toaster } from "react-hot-toast";

export default function LayoutBase({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-lightGray"
      }`}
    >
      <Toaster />
      <Header
        sidebar={sidebar}
        darkToggle={isDarkMode}
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
      />
      <Sidebar sidebar={sidebar} toggleSidebar={toggleSidebar} />
      <div className="dark:text-white dark:bg-gray-900">{children}</div>
    </div>
  );
}
