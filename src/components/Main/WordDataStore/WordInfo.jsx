import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Notify } from "../Notify";

export function WordInfo({
  searchedResult,
  bookmarkedWords,
  setBookmarkedWords,
}) {
  const { word, phonetic } = searchedResult;

  function toggleBookmark() {
    setBookmarkedWords((bookmarkword) => {
      const isBookmarked = bookmarkword.some((item) => item.word === word);
      if (isBookmarked) {
        <Notify message={"Word remove from your Bookmarks"} />;
        return bookmarkword.filter((item) => item.word !== word);
      } else {
        <Notify message={"Word added to your Bookmarks"} />;
        return [...bookmarkword, { word, checked: true }];
      }
    });
  }
  const isChecked = bookmarkedWords.some((item) => item.word === word);
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[2rem] xs:text-[4rem] text-primary dark:text-white font-bold">
            {word}
          </h1>
          <p className="md:text-2xl text-purple font-medium">{phonetic}</p>
        </div>

        <img src="/images/icon-play.svg" className="w-12 md:w-[75px]" />
      </div>
      <button onClick={() => toggleBookmark()}>
        <FontAwesomeIcon
          icon={isChecked ? faSolidBookmark : faBookmark}
          size="lg"
          className={`transition-transform active:scale-150 absolute right-3.5 md:right-7  hover:text-purple active:text-purple cursor-pointer ${
            isChecked ? "text-purple" : "text-secondary"
          }`}
        />
      </button>
    </>
  );
}
