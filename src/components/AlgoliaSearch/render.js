import React from 'react';
import TextInput from 'src/components/form/TextInput';
import SearchResult from 'src/components/SearchResult';
import './styles.scss';

type AlgoliaSearchProps = {
  searchText: string,
  setSearchText: string => void,

  results: Array<*>,
  onResultClick: any => void,

  searchBarOpen: boolean,
  setSearchBarOpen: boolean => void,
};

export default function AlgoliaSearch({
  searchText,
  setSearchText,

  results,
  onResultClick,

  searchBarOpen,
  setSearchBarOpen,
}: AlgoliaSearchProps) {
  return (
    <div
      className={'searchBar ' + `${searchBarOpen ? 'big' : 'small'}`}
      onClick={() => setSearchBarOpen(true)}
    >
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="formRow">
            <TextInput
              className="search"
              name="search"
              icon="search"
              placeholder="What are you looking for?"
              value={searchText}
              onChange={({ value }) => {
                setSearchText(value);
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="resultsList"
        display-if={results.length > 0 && searchBarOpen}
      >
        {results.map((result, idx) => {
          return (
            <SearchResult
              key={idx}
              {...result}
              onClick={() => onResultClick(result)}
            />
          );
        })};
      </div>
    </div>
  );
}
