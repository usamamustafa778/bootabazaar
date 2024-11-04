import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../utils/useDarkMode";

const DarkSwitch = ({ className, bgSun }) => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    <div
      className={`flex items-center justify-center border rounded-full p-[3px] border-gray-300 dark:border-white/20 gap-1 cursor-pointer ${className}`}
    >
      <Sun
        onClick={toggleDarkMode}
        className={`w-6 p-1 ${
          !isDarkMode && `${bgSun || "bg-white/30"} rounded-full`
        }`}
      />
      <Moon
        onClick={toggleDarkMode}
        className={`w-6 p-1 ${
          isDarkMode && "bg-white/30 rounded-full text-white"
        }`}
      />
    </div>
  );
};

export default DarkSwitch;
