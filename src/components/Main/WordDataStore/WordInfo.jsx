import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faSolidBookmark } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export function WordInfo({
  searchedResult,
  bookmarkedWords,
  setBookmarkedWords,
}) {
  let toastShown = false;
  const { word, phonetics } = searchedResult;
  const { text, audio } = phonetics[0] || [];
  const audioRef = useRef(new Audio(audio));

  const toastStyle = {
    className: "custom-toast",
    position: "top-center",
    hideProgressBar: true,
    closeOnClick: false,
    autoClose: 200,
    closeButton: false,
  };

  function toggleBookmark() {
    setBookmarkedWords((bookmarkword) => {
      const isBookmarked = bookmarkword.some((item) => item.word === word);
      if (isBookmarked) {
        if (!toastShown) {
          toast.success("Word removed from Bookmarks", toastStyle);
          toastShown = true;
        }
        return bookmarkword.filter((item) => item.word !== word);
      } else {
        if (!toastShown) {
          toast.success("Word added to Bookmarks", toastStyle);
          toastShown = true;
        }
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
          {text && (
            <p className="md:text-2xl text-purple font-medium">{text}</p>
          )}
        </div>
        {audio && (
          <button className="playbox" onClick={() => audioRef.current.play()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75"
              className="w-12 md:w-[75px]"
            >
              <g fillRule="evenodd">
                <circle
                  cx="37.5"
                  cy="37.5"
                  r="37.5"
                  fill="#a445ed"
                  fillOpacity=".25"
                />
                <path d="M29 27v21l21-10.5z" fill="#a445ed" />
              </g>
            </svg>
          </button>
        )}
      </div>
      <button onClick={() => toggleBookmark()}>
        <FontAwesomeIcon
          icon={isChecked ? faSolidBookmark : faBookmark}
          size="lg"
          className={`transition-transform active:scale-150 absolute right-3.5 md:right-7 hover:text-purple active:text-purple cursor-pointer ${
            isChecked ? "text-purple" : "text-secondary"
          }`}
        />
      </button>
      <ToastContainer />
    </>
  );
}
