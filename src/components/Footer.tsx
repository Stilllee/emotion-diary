import ThemeContext from "context/theme-context";
import { useContext } from "react";
import { CiLight, CiDark } from "react-icons/ci";

export default function Footer() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-0 left-0 flex justify-center w-full py-4 z-10 bg-white dark:bg-mainDark">
      <button
        className="text-2xl dark:text-white transition-all transit hover:scale-110 rounded-full p-1 dark:hover:bg-btnDark hover:bg-btnLight"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
}
