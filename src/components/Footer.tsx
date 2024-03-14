import ThemeContext from "context/theme-context";
import { useContext } from "react";
import { CiLight, CiDark } from "react-icons/ci";

export default function Footer() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-0 left-0 flex justify-center w-full py-4">
      <button className="text-2xl dark:text-white" onClick={toggleDarkMode}>
        {isDarkMode ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
}
