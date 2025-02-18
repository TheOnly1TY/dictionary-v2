export function FontOptionsModal({ dispatch, showFontOptions, fontStyle }) {
  function handleSelectedFont(e) {
    const SelectedFont = e.target.closest("h3").textContent;
    if (!SelectedFont) return fontStyle;
    dispatch({ type: "setFontStyle", payload: SelectedFont });
  }

  return (
    <div
      className="relative flex justify-center items-center mr-4 cursor-pointer"
      onClick={() => dispatch({ type: "showFontOptions" })}
    >
      <div className="flex g-3 flex-row">
        <h3 className="text-lg text-word-primary mr-4 font-bold">
          {fontStyle}
        </h3>
        <img
          src="/images/icon-arrow-down.svg"
          className={` duration-150 ease-in-out ${
            showFontOptions && "rotate-180"
          }`}
        />
      </div>
      {showFontOptions && (
        <div
          className="absolute top-[120%] inline-flex flex-col justify-center min-w-[183px] h-[9.5rem] gap-3 p-4 mr-14 text-lg text-word-primary bg-white font-bold shadow-drop-shadow rounded-2xl z-20"
          onClick={(e) => handleSelectedFont(e)}
        >
          <h3 className="font-sans-serif hover:text-purple">Sans Serif</h3>
          <h3 className="font-Serif hover:text-purple">Serif</h3>
          <h3 className="font-Mono hover:text-purple">Mono</h3>
        </div>
      )}
    </div>
  );
}
