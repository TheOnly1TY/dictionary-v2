import { WordInfo } from "../../../App";
import { MeaningOverview } from "./MeaningOverview";

export function WordDetails({
  searchedResult,
  bookmarkedWords,
  deleteBookMarkWords,
  setBookmarkedWords,
}) {
  return (
    <div className=" mt-10">
      <WordInfo
        searchedResult={searchedResult}
        bookmarkedWords={bookmarkedWords}
        deleteBookMarkWords={deleteBookMarkWords}
        setBookmarkedWords={setBookmarkedWords}
      />
      <MeaningOverview searchedResult={searchedResult} />
    </div>
  );
}
