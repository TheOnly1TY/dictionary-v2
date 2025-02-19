export function Error() {
  return (
    <div className="flex flex-col justify-center items-center text-center mt-20">
      <img src="/images/emoji.png" className="mb-8" alt="sad_emoji" />
      <h2 className="text-[20px] text-[#2d2d2d] font-bold mb-5">
        No Definitions Found
      </h2>
      <p className="text-[18px] text-[#757575]">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
}
