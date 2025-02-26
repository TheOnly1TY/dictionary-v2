import { useEffect, useReducer, useState } from "react";
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
