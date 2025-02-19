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
    <ul>
      {bookmarkedWords.map((words) => (
        <BookMarkedWords
          dispatch={dispatch}
          setShouldFetch={setShouldFetch}
          deleteBookMarkWords={deleteBookMarkWords}
          bookMarkWords={words}
          key={words.id}
        />
      ))}
      <button
        className="float-right p-3 lg:px-6 hover:text-red cursor-pointer"
        onClick={() => clearBookMark()}
      >
        Clear Bookmark
      </button>
    </ul>
  );
}
