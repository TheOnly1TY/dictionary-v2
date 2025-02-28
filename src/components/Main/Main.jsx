import { MeaningOverview } from "./WordDataStore/MeaningOverview";
import { WordDetails } from "./WordDataStore/WordDetails";
import { WordInfo } from "./WordDataStore/WordInfo";
import { Error } from "./Error";
import { Intro } from "./Intro";
import { Loader } from "./Loader";

export function Main({
  status,
  newSearch,
  searchedResult,
  bookmarkedWords,
  setBookmarkedWords,
}) {
  return (
    <main>
      {status === "idle" && <Intro />}
      {status === "loading" && <Loader />}
      {status === "active" && (
        <WordDetails>
          <WordInfo
            searchedResult={searchedResult}
            bookmarkedWords={bookmarkedWords}
            setBookmarkedWords={setBookmarkedWords}
          />
          <MeaningOverview
            newSearch={newSearch}
            searchedResult={searchedResult}
          />
        </WordDetails>
      )}
      {status === "error" && <Error />}
    </main>
  );
}
