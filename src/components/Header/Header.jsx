import { BreakLine } from "../../BreakLine";
import { Logo } from "./Logo";
import { Theme } from "./Theme";

export function Header({ children }) {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <div className="flex justify-center items-center">
        {children}
        <BreakLine width="1px" height="2rem" margin="0 1rem" />
        <Theme />
      </div>
    </header>
  );
}
