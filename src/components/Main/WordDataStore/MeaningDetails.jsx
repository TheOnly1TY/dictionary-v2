import { BreakLine } from "../../../BreakLine";
import { WordDefinition } from "./WordDefinition";

export function MeaningDetails({ meaningItem }) {
  const { partOfSpeech, definitions, synonyms, antonyms } = meaningItem;
  return (
    <>
      <div className="flex items-center mt-8 lg:mt-10">
        <h3 className="text-2xl italic font-bold mr-6 ">{partOfSpeech}</h3>
        <BreakLine />
      </div>
      <p className="text-[20px] text-[#757575] mt-8 mb-6">Meaning</p>
      <ul className="list-disc custom-bullet lg:ml-10 ">
        {definitions.map((definition, index) => (
          <WordDefinition key={index} wordDefinition={definition} />
        ))}
      </ul>
      {synonyms.length > 0 && (
        <div className="flex gap-3">
          <h3 className="text-[20px] text-[#757575] mr-3">Synonyms</h3>
          {synonyms.map((syn, index) => (
            <p
              key={index}
              className="text-[20px] text-purple hover:underline cursor-pointer"
            >
              {syn + `${synonyms.length - 1 === index ? "." : ","} `}
            </p>
          ))}
        </div>
      )}
      {antonyms.length > 0 && (
        <div className="flex gap-3">
          <h3 className="text-[20px] text-[#757575] mr-3">Antonyms</h3>
          {antonyms.map((syn, index) => (
            <p
              key={index}
              className="text-[20px] text-purple hover:underline cursor-pointer"
            >
              {syn + `${antonyms.length - 1 === index ? "." : ","} `}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
