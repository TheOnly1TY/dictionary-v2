import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BookMarkIcon({ dispatch }) {
  return (
    <div onClick={() => dispatch({ type: "showBookMarks" })}>
      <FontAwesomeIcon
        icon={faBookmark}
        size="lg"
        className="text-secondary hover:text-purple cursor-pointer"
      />
    </div>
  );
}
