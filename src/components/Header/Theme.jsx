import { useState } from "react";

export function Theme() {
  const [theme, setTheme] = useState(false);

  theme
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");

  return (
    <div
      onClick={() => setTheme(!theme)}
      className="flex justify-center items-center gap-3"
    >
      <label className="block w-10 h-5 bg-secondary dark:bg-purple rounded-full">
        <div
          className={`absolute w-3.5 h-3.5 bg-white rounded-full m-[3px] ${
            theme && "ml-[22px]"
          } duration-500`}
        ></div>
      </label>
      <img src="/images/icon-moon.svg" alt="moon_icon" />
    </div>
  );
}
