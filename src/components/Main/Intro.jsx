import { Logo } from "../Header/Logo";

export function Intro() {
  return (
    <div className="flex flex-col items-center mt-20">
      <Logo />
      <h2 className="text-2xl text-word-primary dark:text-white font-bold mt-10">
        Welcome to TY Dictionary👋
      </h2>
      <p className="text-base md:text-xl text-secondary text-center mt-5">
        Kindly type any word into the search box to find its full meaning,
        pronunciation, see its transcription, discover similar words, plus more
        helpful details-all in one place.
      </p>
    </div>
  );
}
