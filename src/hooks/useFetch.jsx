import { useState, useEffect } from "react";

import { Error } from "../components/Main/Error";

export function useFetch(query, dispatch) {
  const [shouldFetch, setShouldFetch] = useState(false);

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
  }, [shouldFetch, dispatch, query]);
  return { setShouldFetch };
}
