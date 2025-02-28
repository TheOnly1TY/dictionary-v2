import { MeaningDetails } from "./MeaningDetails";
import { BreakLine } from "../../../BreakLine";

export function MeaningOverview({ searchedResult }) {
  const { meanings, sourceUrls } = searchedResult;
  return (
    <div>
      {meanings.map((meaningItem, index) => (
        <MeaningDetails key={index} meaningItem={meaningItem} />
      ))}
      <BreakLine margin="1rem 0" />
      <div className="flex flex-wrap gap-3 mt-6 sm:mb-10">
        <p className="text-sm text-secondary underline">Source</p>
        <div className="flex break-words gap-1">
          <a
            href={sourceUrls}
            className="text-sm text-word-primary dark:text-white underline"
          >
            {sourceUrls}
          </a>
          <img src="/images/icon-new-window.svg" />
        </div>
      </div>
    </div>
  );
}
