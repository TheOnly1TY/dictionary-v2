import { useEffect, useState } from "react";

export function Theme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "dark" : "light")}
      className="flex justify-center items-center gap-3"
    >
      <label className="block w-10 h-5 bg-[#757575] dark:bg-purple rounded-full ">
        <div
          className={`absolute w-3.5 h-3.5 bg-white rounded-full m-[3px] ${
            theme === "dark" && "ml-[22px]"
          } duration-500`}
        ></div>
      </label>
      <img src="/images/icon-moon.svg" alt="moon_icon" />
    </div>
  );
}
