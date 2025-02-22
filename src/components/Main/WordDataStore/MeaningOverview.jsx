import { MeaningDetails } from "./MeaningDetails";
import { BreakLine } from "../../../BreakLine";

export function MeaningOverview({ searchedResult }) {
  const { meanings, sourceUrls } = searchedResult;
  return (
    <div>
      {meanings.map((meaningItem, index) => (
        <MeaningDetails key={index} meaningItem={meaningItem} />
      ))}
      <BreakLine />
      <div className="flex gap-3 mt-6">
        <p className="text-[14px] text-[#757575] underline">Source</p>
        <div className="flex gap-1">
          <a href={sourceUrls} className="text-[14px] text-[#2d2d2d] underline">
            {sourceUrls}
          </a>
          <img src="/images/icon-new-window.svg" />
        </div>
      </div>
    </div>
  );
}
