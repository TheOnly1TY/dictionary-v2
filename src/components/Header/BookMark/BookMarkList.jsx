import { BookMarkedWords } from "./BookMarkedWords";

export function BookMarkList() {
  return (
    <div>
      <BookMarkedWords />
      <button className="float-right p-3 lg:px-6 hover:text-text-secondary cursor-pointer">
        Clear Bookmark
      </button>
    </div>
  );
}
