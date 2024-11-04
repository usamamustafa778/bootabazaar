import React from "react";
import { menu } from "../../Menu";
import Dropdown from "./Dropdown";
import UserDropdown from "./UserDropdown";
import { Link, useLocation } from "react-router-dom";
import usePermissions from "../../../utils/userPermission";
import MerchantDropdown from "./MerchantDropdown";

export default function Header({ toggleSidebar }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const { hasPermission } = usePermissions();

  return (
    <div className="sticky top-0 z-50">
      <div className="flex w-full items-center justify-between h-14 text-white bg-coolGray dark:bg-gray-950 px-6">
        <div className="flex items-center">
          <button type="button" onClick={toggleSidebar}>
            <img src="/logo192.png" alt="" className="h-9 mr-4" />
          </button>

          <div className="hidden lg:flex justify-between items-center">
            {menu?.map((item, index) =>
              item?.children ? (
                hasPermission(item.permission) && (
                  <Dropdown
                    key={index}
                    title={item.title}
                    options={item.children}
                    to={item.to}
                    className={`btnDropdown ${
                      currentPath === item.to &&
                      "bg-gray-200 rounded px-5 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800"
                    }`}
                  />
                )
              ) : item.permission ? (
                hasPermission(item.permission) && (
                  <Link
                    key={index}
                    to={item.to}
                    className={`font-semibold 2xl:text-lg h-14 text-white hover:bg-black/30 transition-all cursor-pointer gap-1 border-b-2 flex items-center px-3 ${
                      currentPath.startsWith(item.to)
                        ? "border-green-500"
                        : "border-transparent"
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              ) : (
                <Link
                  key={index}
                  to={item.to}
                  className={`font-semibold 2xl:text-lg h-14 text-white hover:bg-black/30 transition-all cursor-pointer gap-1 border-b-2 flex items-center px-3 ${
                    currentPath.startsWith(item.to)
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {/* <Link
            to="/new-project"
            className="hidden xl:flex text-sm 2xl:text-base whitespace-nowrap items-center gap-2 font-medium rounded-full bg-primary px-5 py-2"
          >
            <PlusCircle className="h-4 w-4" /> Add New Project
          </Link> */}
          <MerchantDropdown />
          <p className="text-sm 2xl:text-base hidden xl:block">Help</p>
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
