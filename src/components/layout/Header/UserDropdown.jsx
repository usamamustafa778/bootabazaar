import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../utils/useAuth";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import DarkSwitch from "../../common/DarkSwitch";
import { useDarkMode } from "../../../utils/useDarkMode";

export default function UserDropdown({ merchants }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { logoutUser } = useAuth();
  const handleLogout = () => {
    logoutUser();
    setDropdown(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const [isDarkMode] = useDarkMode();

  return (
    <div className="relative text-black dark:text-white/80 z-50">
      {dropdown && (
        <div
          ref={dropdownRef}
          className="flex-col w-[200px] z-50 items-center absolute top-0 right-0 mt-12 p-2 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl shadow-black/25"
        >
          <button className="btnDropdown justify-between py-1">
            <p>{isDarkMode ? "Dark" : "Light"} Mode</p>
            <DarkSwitch bgSun="bg-gray-200" />
          </button>
          <Link to="/account-settings" className="btnDropdown">
            <User className="w-4" />
            Account Settings
          </Link>
          <button
            onClick={handleLogout}
            className="btnDropdown text-red-500 dark:text-red-400 border-none"
          >
            <LogOut className="w-4" />
            Logout
          </button>
        </div>
      )}
      <div
        onClick={() => setDropdown(!dropdown)}
        className={`flex items-center font-medium gap-4 text-white rounded border-white/20 py-1 pl-3 pr-1 hover:bg-white hover:text-black transition-all cursor-pointer ${
          dropdown && "bg-white/20"
        }`}
      >
        {user ? (
          <>
            <p className="whitespace-nowrap capitalize">
              {user?.first_name + " " + user?.last_name}
            </p>
            <p className="uppercase border-2 border-white shadow shadow-black/20 h-9 w-9 flex items-center justify-center rounded-full bg-green-100 text-secondary">
              {user?.first_name.slice(0, 1) + user?.last_name.slice(0, 1)}
            </p>
          </>
        ) : (
          <p className="uppercase border-2 border-white h-9 w-9 flex items-center justify-center rounded-full bg-green-100 text-secondary">
            AA
          </p>
        )}
      </div>
    </div>
  );
}
