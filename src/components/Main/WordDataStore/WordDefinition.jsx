export function WordDefinition({ wordDefinition }) {
  const { definition, example } = wordDefinition;
  return (
    <li className="mb-6">
      <span className="text-[15px] md:text-lg text-word-primary dark:text-white leading-6">
        {definition}
      </span>
      {example && (
        <p className="text-base md:text-lg text-secondary mt-[13px]">
          {example}
        </p>
      )}
    </li>
  );
}
