import React from 'react';
import './styles.scss';

type Sentence = {
  matchLevel: string,
  value: string,
};

type SearchResultProps = {
  start_time: number,
  _highlightResult: { sentences: Array<Sentence> },
  onClick: any => void,
};

export default function SearchResult({
  onClick,
  _highlightResult,
}: SearchResultProps) {
  const matchedSentences = _highlightResult.sentences.filter(
    ({ matchLevel }) => matchLevel === 'full'
  );

  return (
    <div
      display-if={matchedSentences.length > 0}
      className="searchResult"
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: matchedSentences[0].value }}
    />
  );
}
