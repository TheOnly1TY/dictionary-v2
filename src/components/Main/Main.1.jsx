import { WordDetails, Error } from "../../App";
import { Intro } from "./Intro";
import { Loader } from "./Loader";

export function Main({ status, searchedResult }) {
  return (
    <>
      {status === "idle" && <Intro />}
      {status === "loading" && <Loader />}
      {status === "active" && <WordDetails searchedResult={searchedResult} />}
      {status === "error" && <Error />}
    </>
  );
}
