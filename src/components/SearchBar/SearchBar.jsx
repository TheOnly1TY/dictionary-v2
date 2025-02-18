export function SearchBar({ query, dispatch, getWord }) {
  function handleSubmit(e) {
    e.preventDefault();
    getWord();
  }
  return (
    <form className="relative my-6 lg:my-10" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for any word..."
        className="w-full h-12 lg:h-16 p-6 text-base lg:text-xl text-[#2d2d2d] bg-[#f4f4f4] focus:outline-none focus:border focus:border-purple font-bold rounded-2xl"
        value={query}
        onChange={(e) =>
          dispatch({ type: "searchedWord", payload: e.target.value })
        }
      />
      <img
        className="absolute top-1/2 right-6 translate-y-[-50%] "
        src="/images/icon-search.svg"
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
}
