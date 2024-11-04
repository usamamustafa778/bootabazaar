import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../utils/useDarkMode";
import { menu } from "./Menu";
import useAuth from "../utils/useAuth";
import { ChevronDown, LogOut, User, PackagePlus } from "lucide-react";
import DarkSwitch from "./common/DarkSwitch";
import usePermissions from "../utils/userPermission";

export default function Sidebar({ sidebar, toggleSidebar }) {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (sidebar) toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar, toggleSidebar]);

  const location = useLocation();
  const currentPath = location.pathname;

  const [isDarkMode] = useDarkMode();

  const { logoutUser } = useAuth();
  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const [showChildren, setShowChildren] = useState(null);
  const handleChildren = (index) => {
    setShowChildren(showChildren === index ? null : index);
  };

  const { hasPermission } = usePermissions();

  return (
    <div
      ref={sidebarRef}
      className={`sidebar w-full overflow-x-hidden transition-max-width duration-500 ease-in-out dark:text-white/90 fixed top-0 h-screen flex flex-col justify-between bg-white dark:bg-gray-900 dark:text-white z-50 overflow-y-scroll p-5 ${
        sidebar
          ? "max-w-[350px] shadow-r shadow-black/20 dark:shadow-gray-600/40"
          : "-left-20 max-w-0"
      }`}
    >
      <div>
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl w-full flex items-start gap-3">
          <div className="text-xs text-gray-500 flex-1">
            <p className="bg-gray-200 w-fit px-2 rounded-full">
              {user?.username}
            </p>
            <h4 className="capitalize text-gray-800 dark:text-white mt-2">
              {user?.first_name + " " + user?.last_name}
            </h4>
            <p>{user?.email}</p>
            <p className="text-gray-400 mt-1">#00112</p>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          {hasPermission("add project") && (
            <Link
              to="/new-project"
              onClick={toggleSidebar}
              className={`btnDropdown border-gray-100 ${
                currentPath === "/site-manager/new-site" &&
                "bg-primary rounded-lg text-white hover:bg-primary"
              }`}
            >
              <PackagePlus
                className={`w-4 text-gray-400  ${
                  currentPath === "/new-project" && "text-white"
                }`}
              />
              Create New Project
            </Link>
          )}

          {menu.map((item, index) =>
            item?.children
              ? hasPermission(item.title) && (
                  <div key={index}>
                    <button
                      key={index}
                      to={item.to}
                      onClick={() => handleChildren(index)}
                      className={`btnDropdown border-gray-100 last:border-none justify-between ${
                        currentPath.startsWith(item.to) &&
                        "bg-primary rounded-lg text-white hover:bg-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.Icon && (
                          <item.Icon
                            className={`w-4 text-gray-400  ${
                              currentPath.startsWith(item.to) && "text-white"
                            }`}
                          />
                        )}
                        {item.title}
                      </div>
                      <ChevronDown
                        className={`w-4 transition-all ${
                          showChildren === index && "rotate-180"
                        }`}
                      />
                    </button>
                    {showChildren === index && (
                      <div className="pl-7 mt-1">
                        {item?.children.map(
                          (item, index) =>
                            hasPermission(item.title) && (
                              <Link
                                key={index}
                                to={item.to}
                                onClick={toggleSidebar}
                                className={`btnDropdown py-1 border-gray-100 ${
                                  currentPath === item.to &&
                                  "bg-primary rounded-lg text-white hover:bg-primary"
                                }`}
                              >
                                {item.Icon && (
                                  <item.Icon
                                    className={`w-4 text-gray-400  ${
                                      currentPath === item.to && "text-white"
                                    }`}
                                  />
                                )}
                                {item.title}
                              </Link>
                            )
                        )}
                      </div>
                    )}
                  </div>
                )
              : hasPermission(item.title) && (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={toggleSidebar}
                    className={`btnDropdown border-gray-100 ${
                      currentPath === item.to &&
                      "bg-primary rounded-lg text-white hover:bg-primary"
                    }`}
                  >
                    {item.Icon && (
                      <item.Icon
                        className={`w-4 text-gray-400  ${
                          currentPath === item.to && "text-white"
                        }`}
                      />
                    )}
                    {item.title}
                  </Link>
                )
          )}
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="btnDropdown justify-center text-sm py-1 gap-2 text-red-500 mt-10 dark:text-red-400 bg-red-50 dark:bg-gray-800 border-none rounded-md"
        >
          <LogOut className="w-3" />
          Logout
        </button>
        <Link
          to="/account-settings"
          className="btnDropdown rounded-md justify-center text-sm py-1 gap-2 bg-gray-100 dark:bg-gray-800 border-none mt-2"
        >
          <User className="w-3" />
          Account Settings
        </Link>
        <div className="flex items-center justify-between py-2">
          <p>{isDarkMode ? "Dark" : "Light"} Mode</p>
          <DarkSwitch bgSun="bg-gray-200" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm underline">Privacy Policy</p>
          <p className="text-sm underline">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
}
