import { useEffect, useReducer } from "react";

import { Header } from "./components/Header/Header";
import { Logo } from "./components/Header/Logo";
import { SearchBar } from "./components/SearchBar/SearchBar";

const initialState = {
  query: "",
  showFontOptions: false,
  fontStyle: "Sans Serif",
  showBookMarks: false,

  // idle, loading, active, error
  status: "active",
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
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, showFontOptions, showBookMarks, fontStyle, status } = state;

  // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

  useEffect(() => {
    async function getWord() {
      try {
        const res = await fetch(
          " https://api.dictionaryapi.dev/api/v2/entries/en/keyboard"
        );
        const data = await res.json;
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getWord();
  }, []);

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
      <SearchBar query={query} dispatch={dispatch} />
      <Main status={status} />
    </div>
  );
}

export function BreakLine({ width = "full", height = "1px", margin = "0 " }) {
  return (
    <div style={{ width, height, margin }} className=" bg-[#e9e9e9]"></div>
  );
}

function Main({ status }) {
  return (
    <>
      {status === "idle" && <Intro />}
      {status === "loading" && <Loader />}
      {status === "active" && <WordDetails />}
    </>
  );
}

function Intro() {
  return (
    <div className="flex flex-col items-center mt-15">
      <Logo />
      <h2 className="text-2xl text-[#2d2d2d] font-bold mt-10">
        Welcome to TY Dictionary👋
      </h2>
      <p className="text-base lg:text-xl text-[#757575] text-center mt-5">
        Kindly type any word into the search box to find its full meaning,
        pronunciation, see its transcription, discover similar words, plus more
        helpful details-all in one place.
      </p>
    </div>
  );
}

function Loader() {
  return <div className="spinner"></div>;
}

function WordDetails() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[2rem] lg:text-[4rem] text-[#2d2d2d] font-bold ">
            booking
          </h1>
          <p className="lg:text-2xl text-purple font-medium">/ˈbʊkɪŋ/</p>
        </div>
        <img src="/images/icon-play.svg" className="w-12 md:w-[75px]" />
      </div>
    </div>
  );
}
