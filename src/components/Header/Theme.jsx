export function Theme() {
  return (
    <div className="flex justify-center items-center gap-3">
      <label className="block w-10 h-5 bg-[#757575] dark:bg-purple rounded-full ">
        <input type="checkbox" className="hidden" />
        <div className="absolute w-3.5 h-3.5 bg-white rounded-full m-[3px] duration-75"></div>
      </label>
      <img src="/images/icon-moon.svg" alt="moon_icon" />
    </div>
  );
}
