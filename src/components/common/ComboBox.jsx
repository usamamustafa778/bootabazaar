import { ChevronDown } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const ComboBox = ({
  label,
  options,
  optionPadding,
  selectedOption,
  setSelectedOption,
  placeholder,
  className,
  optionsListHeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = options
    ?.filter((option) =>
      option.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    ?.sort((a, b) => a.name.localeCompare(b.name));

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleFocus = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  const handleIconClick = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      inputRef.current.focus();
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayValue =
    searchTerm.length > 0
      ? searchTerm
      : selectedOption
      ? selectedOption.name
      : "";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <label className="inputLabel mb-1">{label}</label>}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            className="inputField"
            placeholder={placeholder}
            value={displayValue}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <ChevronDown
            className="w-5 text-gray-500 absolute top-0 right-0 my-2 mx-4 cursor-pointer"
            onClick={handleIconClick}
          />
        </div>
        {isOpen && (
          <div
            className={`absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto sm:text-sm ${
              optionsListHeight ? optionsListHeight : "max-h-60"
            }`}
          >
            {filteredOptions.map((option) => (
              <p
                key={option._id}
                className={`cursor-pointer select-none relative border-b dark:border-white/20 last:border-none transition-all hover:bg-primary hover:text-white ${
                  option.name === displayValue && "bg-primary text-white"
                } ${optionPadding ? optionPadding : "py-2 pl-3 pr-9"}`}
                onMouseDown={() => handleSelect(option)}
              >
                <span className="font-normal block truncate">
                  {option.name}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
