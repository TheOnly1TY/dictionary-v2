import { useEffect, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

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
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
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
      className={`relative mx-auto w-full lg:max-w-[737px] lg:mt-[2rem] sm:px-0  ${displayFontStyle(
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
        setShouldFetch={setShouldFetch}
        dispatch={dispatch}
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

export function WordInfo({
  searchedResult,
  bookmarkedWords,
  setBookmarkedWords,
}) {
  const { word, phonetic } = searchedResult;

  const addWord = { word, checked: true };
  const toastStyle = {
    className: "custom-toast",
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: false,
    autoClose: 1000,
  };

  function toggleBookmark() {
    setBookmarkedWords((bookmarkword) => {
      if (bookmarkword.some((item) => item.word === addWord.word)) {
        toast.success("Word remove from your Bookmarks", toastStyle);
        [...bookmarkword, { word, checked: false }];
        return bookmarkword.filter((item) => item === false);
      } else {
        toast.success("Word added to your Bookmarks", toastStyle);
        return [...bookmarkword, addWord];
      }
    });
  }
  const isChecked = bookmarkedWords.some((item) => item.checked);
  // const isChecked = bookmarkedWords.map((item) => item.checked);
  console.log(isChecked);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[2rem] lg:text-[4rem] text-[#2d2d2d] font-bold ">
            {word}
          </h1>
          <p className="lg:text-2xl text-purple font-medium">{phonetic}</p>
        </div>
        <img src="/images/icon-play.svg" className="w-12 md:w-[75px]" />
      </div>
      <div onClick={() => toggleBookmark()}>
        <FontAwesomeIcon
          icon={isChecked ? faSolidBookmark : faBookmark}
          size="lg"
          className="absolute right-3.5 lg:right-7 text-text-secondary hover:text-purple cursor-pointer"
        />

        <ToastContainer />
      </div>
    </>
  );
}
