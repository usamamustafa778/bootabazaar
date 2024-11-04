import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import useApi from "../../../utils/useApi";
import toast from "react-hot-toast";

export default function MerchantDropdown() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { request } = useApi();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { merchant_id: merchant, merchants } = user;
  const [changing, setChanging] = useState(false);

  const switchMerchant = useCallback(
    async (merchant) => {
      setChanging(true);
      toast
        .promise(
          request({
            method: "post",
            url: `users/switch_merchant/${merchant._id}`,
          }),
          {
            loading: "Changing merchant...",
            success: <b>Merchant Changed To {merchant.name}!</b>,
            error: (err) => (
              <b>Could not change merchant: {err.response.data.message}</b>
            ),
          }
        )
        .then(() => {
          user.merchant_id = merchant;
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload();
        })
        .finally(() => {
          setChanging(false);
        });
    },
    [request, user]
  );

  return (
    <div className="relative text-black dark:text-white/80 z-50">
      {dropdown && (
        <div
          ref={dropdownRef}
          className="flex-col w-[200px] z-50 items-center absolute top-0 right-0 mt-11 p-2 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl shadow-black/25"
        >
          {merchants?.map((item) => (
            <button
              key={item._id}
              onClick={() => switchMerchant(item)}
              className={`py-2 px-3 border-b last:border-none hover:bg-gray-100 hover:text-black dark:hover:bg-white/10 dark:hover:text-white rounded w-full transition-all text-left ${
                item._id === merchant?._id ? "bg-primary text-white" : ""
              }`}
              disabled={changing}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
      <div
        onClick={() => setDropdown((prev) => !prev)}
        className={`flex items-center font-medium gap-2 rounded px-4 py-2 text-white border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer ${
          dropdown && "bg-white/20"
        }`}
      >
        <p className="whitespace-nowrap">{merchant?.name}</p>
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
