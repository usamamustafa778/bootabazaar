import { ChevronUp } from "lucide-react";
import { useEffect, useRef } from "react";

const Dropdown = ({ title, options, className, isOpen, setIsOpen, index }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the dropdown is open and if the click is outside the dropdown
      if (
        isOpen === index &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(null); // Close the dropdown
      }
    }

    // Only attach the event listener if the dropdown is open
    if (isOpen === index) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (isOpen === index) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isOpen, index, setIsOpen]); // Add dependencies here

  return (
    <div ref={dropdownRef}>
      {title && (
        <button
          title={title}
          className={`flex items-center gap-1 font-medium ${className}`}
          onClick={() => setIsOpen(isOpen === index ? null : index)} // Toggle dropdown on click
        >
          {title}
          <ChevronUp
            className={`w-3 transition-all ${
              isOpen === index ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      )}

      <div className="relative">
        <div
          className={`bg-white dark:bg-gray-700 p-3 mt-4 flex flex-col shadow-lg absolute top-0 left-0 z-10 w-48 text-sm transition-opacity ${
            isOpen === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ visibility: isOpen === index ? "visible" : "hidden" }} // Corrected visibility check
        >
          {options?.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className="p-2 hover:bg-gray-100 transition-all border-b border-gray-100 last:border-b-0 hover:text-black cursor-pointer text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
