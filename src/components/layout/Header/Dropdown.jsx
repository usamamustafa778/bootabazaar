import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import usePermissions from "../../../utils/userPermission";

export default function Dropdown({ title, options, to, permission }) {
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

  const location = useLocation();
  const currentPath = location.pathname;

  const { hasPermission } = usePermissions();

  return (
    <div className="relative text-black dark:text-white/80 z-50">
      {dropdown && (
        <div
          style={{ zIndex: "100" }}
          ref={dropdownRef}
          className="flex-col w-[210px] items-center absolute top-0 right-0 mt-10 p-2 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl shadow-black/25"
        >
          {options?.map(
            (item, index) =>
              hasPermission(item.permission) && (
                <Link
                  to={item.to}
                  key={index}
                  className={`btnDropdown border-gray-100 last:border-none ${
                    currentPath === item.to &&
                    "bg-primary rounded-md text-white hover:bg-primary"
                  }`}
                  onClick={() => setDropdown(false)}
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

      <div
        onClick={() => setDropdown(!dropdown)}
        className={`font-semibold 2xl:text-lg h-14 text-white hover:bg-black/30 transition-all cursor-pointer gap-1 border-b-2 flex items-center px-3 ${
          currentPath.startsWith(to) ? "border-green-500" : "border-transparent"
        }`}
      >
        {title}
        <ChevronDown className="w-4" />
      </div>
    </div>
  );
}
