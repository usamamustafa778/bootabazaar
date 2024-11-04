import React, { useEffect } from "react";

export default function ActionDropdown({
  title,
  className,
  button,
  children,
  styleDropdown,
  position,
  dropdown,
  dropdownRef,
  setDropdown,
}) {
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

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="relative text-black dark:text-white/80">
      {dropdown && (
        <div
          ref={dropdownRef}
          className={`flex-col w-fit z-50 items-center absolute top-0 mt-10 bg-white dark:bg-gray-800 rounded-md capitalize shadow-xl ${
            position === "right" ? "left-0" : "left-0"
          } ${styleDropdown}`}
        >
          {children}
          {/* <button className="px-6 absolute top-0 right-0">TrashIcon</button> */}
        </div>
      )}
      <button title={title} onClick={toggleDropdown} className={className}>
        {button}
      </button>
    </div>
  );
}
