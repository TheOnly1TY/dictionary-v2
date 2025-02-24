import { BreakLine } from "../../../BreakLine";
import { WordDefinition } from "./WordDefinition";

export function MeaningDetails({ meaningItem }) {
  const { partOfSpeech, definitions, synonyms, antonyms } = meaningItem;
  return (
    <>
      <div className="flex items-center mt-8 md:mt-10">
        <h3 className="text-2xl text-word-primary dark:text-white italic font-bold mr-3 md:mr-6 ">
          {partOfSpeech}
        </h3>
        <BreakLine />
      </div>
      <p className="text-base md:text-xl text-secondary mt-8 mb-6">Meaning</p>
      <ul className="pl-4 list-disc custom-bullet md:ml-10">
        {definitions.map((definition, index) => (
          <WordDefinition key={index} wordDefinition={definition} />
        ))}
      </ul>
      {synonyms.length > 0 && (
        <div className="flex gap-2 break-words break-normal">
          <h3 className="text-base md:text-xl text-secondary mr-2">Synonyms</h3>
          {synonyms.map((synonym, index) => (
            <p
              key={index}
              className="text-base md:text-xl text-purple hover:underline active:underline cursor-pointer"
            >
              {synonym + `${synonyms.length - 1 === index ? "." : ","} `}
            </p>
          ))}
        </div>
      )}
      {antonyms.length > 0 && (
        <div className="flex gap-2">
          <h3 className="text-base md:text-xl text-secondary mr-2">Antonyms</h3>
          {antonyms.map((antonym, index) => (
            <p
              key={index}
              className="text-base md:text-xl text-purple hover:underline cursor-pointer"
            >
              {antonym + `${antonyms.length - 1 === index ? "." : ","} `}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
