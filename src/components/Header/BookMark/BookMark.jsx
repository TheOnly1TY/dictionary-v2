import { BookMarkList } from "./BookMarkList";
import { BookMarkModal } from "./BookMarkModal";
import { BookMarkIcon } from "./BookMarkIcon";

export function BookMark({ dispatch, showBookMarks }) {
  return (
    <div>
      <BookMarkIcon dispatch={dispatch} />

      {showBookMarks && (
        <BookMarkModal>
          <h2 className="text-xl text-word-primary font-bold p-3 lg:px-6">
            Bookmarked Words
          </h2>
          {showBookMarks ? <BookMarkList /> : <EmptyBookMark />}
        </BookMarkModal>
      )}
    </div>
  );
}

function EmptyBookMark() {
  return <p className="text-center my-8">📂No bookmarked words yet.</p>;
}
