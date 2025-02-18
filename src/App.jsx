import { useReducer } from "react";

import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Main } from "./components/Main/Main.1";

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
  const {
    query,
    searchedResult,
    showFontOptions,
    showBookMarks,
    fontStyle,
    status,
  } = state;

  async function getWord() {
    try {
      dispatch({ type: "cur_status", payload: "loading" });
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      const data = await res.json();

      // FIXING ERROR ISSUE
      if (!res.ok) throw new Error(JSON.stringify(data));

      dispatch({ type: "searchedResult", payload: data[0] });
    } catch (err) {
      const dataErr = JSON.parse(err.message);
      console.log(dataErr);
      dispatch({ type: "Error", payload: dataErr });
    }
  }

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
      <Header
        dispatch={dispatch}
        showFontOptions={showFontOptions}
        showBookMarks={showBookMarks}
        fontStyle={fontStyle}
      />
      <SearchBar query={query} getWord={getWord} dispatch={dispatch} />
      <Main status={status} searchedResult={searchedResult} />
    </div>
  );
}

export function BreakLine({ width = "full", height = "1px", margin = "0 " }) {
  return (
    <div style={{ width, height, margin }} className=" bg-[#e9e9e9]"></div>
  );
}

export function Error() {
  return <h1>Word not found</h1>;
}

export function WordDetails({ searchedResult }) {
  const { word, phonetic } = searchedResult;
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[2rem] lg:text-[4rem] text-[#2d2d2d] font-bold ">
            {word}
          </h1>
          <p className="lg:text-2xl text-purple font-medium">{phonetic}</p>
        </div>
        <img src="/images/icon-play.svg" className="w-12 md:w-[75px]" />
      </div>
    </div>
  );
}
