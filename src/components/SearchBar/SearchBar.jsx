import { useState } from "react";

export function SearchBar({ query, dispatch, setShouldFetch }) {
  const [emptyQuery, setEmptyQuery] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    query === "" ? setEmptyQuery(true) : setShouldFetch(true);
  }
  return (
    <div>
      <form className="relative mt-6 md:mt-10" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for any word..."
          className={`w-full h-12 md:h-16 p-6 text-base md:text-xl text-primary-CLR dark:text-white bg-[#f4f4f4] dark:bg-[#1f1f1f] focus:outline-none font-bold rounded-2xl ${
            emptyQuery
              ? "border border-red"
              : "focus:border focus:border-purple"
          }`}
          value={query}
          onChange={(e) => {
            setEmptyQuery(false);
            dispatch({ type: "searchedWord", payload: e.target.value });
          }}
          onFocus={(e) => e.target.select()}
        />
        <img
          className="absolute top-1/2 right-6 translate-y-[-50%] cursor-pointer"
          src="/images/icon-search.svg"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      {emptyQuery && (
        <p className="text-red text-base md:text-xl">
          Whoops, cant be empty...
        </p>
      )}
    </div>
  );
}
