import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreakLine } from "../../../App";

export function BookMarkedWords() {
  return (
    <div className="max-h-[150px] overflow-y-auto">
      <div className=" flex justify-between items-center py-3 lg:px-6 px-3 hover:bg-gray-300 cursor-pointer">
        <h3 className="text-[15px]">keyboard</h3>
        <FontAwesomeIcon icon={faXmark} className="text-text-secondary" />
      </div>
      <BreakLine />
    </div>
  );
}
