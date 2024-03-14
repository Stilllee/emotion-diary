import ThemeContext from "context/theme-context";
import { useContext, useEffect, useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";

export default function Footer() {
  /*   const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isDarkMode) {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
    }

    return () => {
      body?.classList.remove("dark");
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }; */

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-0 left-0 flex justify-center w-full py-4">
      <button className="text-2xl dark:text-white" onClick={toggleDarkMode}>
        {isDarkMode ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
}
