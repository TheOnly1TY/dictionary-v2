import { BookMarkedWords } from "./BookMarkedWords";

export function BookMarkList({
  dispatch,
  bookmarkedWords,
  setBookmarkedWords,
  setShouldFetch,
}) {
  function clearBookMark() {
    setBookmarkedWords([]);
  }
  function deleteBookMarkWords(selectedword, e) {
    e.stopPropagation();
    setBookmarkedWords(
      bookmarkedWords.filter((bookedword) => selectedword !== bookedword)
    );
  }

  return (
    <div>
      <ul className="max-h-[90px] lg:max-h-[100px] overflow-y-scroll scroll-color">
        {bookmarkedWords.map((words, index) => (
          <BookMarkedWords
            dispatch={dispatch}
            setShouldFetch={setShouldFetch}
            deleteBookMarkWords={deleteBookMarkWords}
            bookMarkWords={words}
            key={index}
          />
        ))}
      </ul>
      <button
        className="text-primary-CLR dark:text-white hover:text-red active:text-red float-right p-3 lg:px-6 cursor-pointer"
        onClick={() => clearBookMark()}
      >
        Clear Bookmark
      </button>
    </div>
  );
}
