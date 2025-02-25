import { useEffect, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
// import { ToastContainer, toast } from "react-toastify";

import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Main } from "./components/Main/Main";
import { Error } from "./components/Main/Error";
import { FontSelector } from "./components/Header/FontSelector";
import { BookMark } from "./components/Header/BookMark/BookMark";

const initialState = {
  query: "",
  searchedResult: [],
  showFontOptions: false,
  fontStyle: "Sans Serif",
  showBookMarks: false,

  // idle, loading, active, error
  status: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "showFontOptions":
      return { ...state, showFontOptions: !state.showFontOptions };
    case "setFontStyle":
      return { ...state, fontStyle: action.payload };
    case "showBookMarks":
      return { ...state, showBookMarks: !state.showBookMarks };
    case "searchedWord":
      return { ...state, query: action.payload };

    case "searchedResult":
      return {
        ...state,
        searchedResult: action.payload,
        status: "active",
      };

    case "cur_status":
      return { ...state, status: action.payload };
    case "Error":
      return { ...state, status: "error", searchedResult: action.payload };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bookmarkedWords, setBookmarkedWords] = useState(() => {
    const savedBookmark = localStorage.getItem("items");
    return savedBookmark ? JSON.parse(savedBookmark) : [];
  });
  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    query,
    searchedResult,
    showFontOptions,
    showBookMarks,
    fontStyle,
    status,
  } = state;

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(bookmarkedWords));
  }, [bookmarkedWords]);

  useEffect(() => {
    async function getWord() {
      try {
        dispatch({ type: "cur_status", payload: "loading" });
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error("definition not found");

        dispatch({ type: "searchedResult", payload: data[0] });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "cur_status", payload: "error" });
      }
    }

    if (shouldFetch) {
      getWord();
      setShouldFetch(false);
    }
  }, [shouldFetch, query]);

  function displayFontStyle(fontStyle) {
    if (fontStyle === "Sans Serif") {
      return "font-san-serif";
    }
    if (fontStyle === "Serif") {
      return "font-Serif";
    }
    if (fontStyle === "Mono") {
      return "font-Mono";
    }
  }

  return (
    <div
      className={`relative mx-auto w-full xs:max-w-[689px] xss:max-w-[489px] lg:max-w-[737px] xss:mt-[2rem] sm:px-0  ${displayFontStyle(
        fontStyle
      )}`}
    >
      <Header>
        <FontSelector
          dispatch={dispatch}
          showFontOptions={showFontOptions}
          fontStyle={fontStyle}
        />
        <BookMark
          dispatch={dispatch}
          showBookMarks={showBookMarks}
          setShouldFetch={setShouldFetch}
          bookmarkedWords={bookmarkedWords}
          setBookmarkedWords={setBookmarkedWords}
        />
      </Header>

      <SearchBar
        query={query}
        dispatch={dispatch}
        setShouldFetch={setShouldFetch}
      />
      <Main
        status={status}
        bookmarkedWords={bookmarkedWords}
        setBookmarkedWords={setBookmarkedWords}
        searchedResult={searchedResult}
      />
    </div>
  );
}

function Notify({ message }) {
  return <div className="text-white">{message}</div>;
}
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
