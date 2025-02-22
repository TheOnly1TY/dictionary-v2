export function WordDefinition({ wordDefinition }) {
    const { definition, example } = wordDefinition;
    return (
      <li className="mb-6">
        <span className="text-lg text-[#2d2d2d] leading-6 ">{definition}</span>
        {example && (
          <p className="text-[18px] text-[#757575] mt-[13px]">{`"${example}"`}</p>
        )}
      </li>
    );
  }
  