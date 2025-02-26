import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreakLine } from "../../../BreakLine";

export function BookMarkedWords({
  bookMarkWords,
  deleteBookMarkWords,
  setShouldFetch,
  dispatch,
}) {
  function newSearch(word) {
    dispatch({ type: "searchedWord", payload: word });
    setShouldFetch(true);
    dispatch({ type: "showBookMarks" });
  }

  return (
    <li className="max-h-[150px] ">
      <div
        className=" flex justify-between items-center py-3 lg:px-6 px-3 hover:bg-[#e1e1e14d] active:bg-[#e1e1e14d] backdrop-blur-lg dark:hover:bg-[#2a2a2a] dark:active:bg-[#2a2a2a] cursor-pointer z-30"
        onClick={() => newSearch(bookMarkWords.word)}
      >
        <h3 className="text-[15px] text-primary-CLR dark:text-white">
          {bookMarkWords.word}
        </h3>
        <button
          className="z-40"
          onClick={(e) => deleteBookMarkWords(bookMarkWords, e)}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-secondary hover:text-red active:text-red z-40 cursor-pointer"
          />
        </button>
      </div>
      <BreakLine />
    </li>
  );
}
