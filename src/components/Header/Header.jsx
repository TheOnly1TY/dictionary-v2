import { BreakLine } from "../../BreakLine";
import { Logo } from "./Logo";
import { Theme } from "./Theme";
// import { FontSelector } from "./FontSelector";
// import { BookMark } from "../Header/BookMark/BookMark";

export function Header({ children }) {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <div className="flex justify-center items-center">
        {children}
        <BreakLine width="1px" height="32px" margin="0 1rem" />
        <Theme />
      </div>
    </header>
  );
}
