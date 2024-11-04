import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function ListBox({
  label,
  name,
  options,
  selectedOption,
  setSelectedOption,
  placeholder,
  error,
  inputStyle,
  optionsStyle,
  className,
}) {
  const sortedOptions = options?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="inputLabel mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <Listbox.Button
          className={`inputField text-left flex items-center justify-between ${inputStyle} ${
            error ? "border-red-300" : ""
          }`}
        >
          {selectedOption?.name || (
              <span className="text-gray-400 dark:text-gray-300">
                {placeholder}
              </span>
            ) || (
              <span className="text-gray-400 dark:text-gray-500">select</span>
            )}
          <ChevronDown className="w-4" />
        </Listbox.Button>
        <Listbox.Options
          className={`absolute top-0 bg-white dark:bg-gray-900 dark:border-white/20 py-1 w-full border rounded-md z-50 shadow-xl ${
            optionsStyle ? optionsStyle : "mt-16"
          } ${sortedOptions?.length > 3 && "h-36 overflow-y-scroll"}`}
        >
          {sortedOptions?.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              disabled={option?.unavailable}
              className={`py-1 px-3 text-sm border-b last:border-none dark:border-white/20 dark:hover:bg-gray-800 hover:bg-gray-200 transition-all cursor-pointer ${
                selectedOption?._id === option._id &&
                "bg-primary text-white hover:bg-primary"
              }`}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
