import { BreakLine } from "../../App";
import { Logo } from "./Logo";
import { Theme } from "./Theme";
import { FontSelector } from "./FontSelector";
import { BookMark } from "../Header/BookMark/BookMark";

export function Header({
  dispatch,
  showFontOptions,
  showBookMarks,
  fontStyle,
}) {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <div className="flex justify-center items-center">
        <FontSelector
          dispatch={dispatch}
          showFontOptions={showFontOptions}
          fontStyle={fontStyle}
        />
        <BookMark dispatch={dispatch} showBookMarks={showBookMarks} />

        <BreakLine width="1px" height="32px" margin="0 1rem" />

        <Theme />
      </div>
    </div>
  );
}
