import { WordDetails } from "./WordDataStore/WordDetails";
import { Error } from "./Error";
import { Intro } from "./Intro";
import { Loader } from "./Loader";

export function Main({
  status,
  searchedResult,
  bookmarkedWords,
  setBookmarkedWords,
}) {
  return (
    <main>
      {status === "idle" && <Intro />}
      {status === "loading" && <Loader />}
      {status === "active" && (
        <WordDetails
          bookmarkedWords={bookmarkedWords}
          setBookmarkedWords={setBookmarkedWords}
          searchedResult={searchedResult}
        />
      )}
      {status === "error" && <Error />}
    </main>
  );
}
