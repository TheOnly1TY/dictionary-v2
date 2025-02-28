import { useEffect, useReducer, useState } from "react";

import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Main } from "./components/Main/Main";
import { useFetch } from "./hooks/useFetch";
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

  const {
    query,
    searchedResult,
    showFontOptions,
    showBookMarks,
    fontStyle,
    status,
  } = state;

  const displayFontStyle = (fontStyle) => {
    if (fontStyle === "Sans Serif") {
      return "font-san-serif";
    }
    if (fontStyle === "Serif") {
      return "font-Serif";
    }
    if (fontStyle === "Mono") {
      return "font-Mono";
    }
  };

  const newSearch = (word) => {
    dispatch({ type: "searchedWord", payload: word });
    setShouldFetch(true);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(bookmarkedWords));
  }, [bookmarkedWords]);

  const { setShouldFetch } = useFetch(query, dispatch);

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
          newSearch={newSearch}
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
        newSearch={newSearch}
        bookmarkedWords={bookmarkedWords}
        setBookmarkedWords={setBookmarkedWords}
        searchedResult={searchedResult}
      />
    </div>
  );
}
