import { compose, withHandlers, withProps, withState } from 'recompose';
import onClickOutside from 'react-onclickoutside';
import { getAlgoliaIndex } from 'src/services/Algolia';
import AlgoliaSearchRender from './render';

const DOCUMENT_SEARCH_KEY = 'documentNotes';

export default compose(
  withState('algoliaIndex', 'setAlgoliaIndex', ({ searchKey }) =>
    getAlgoliaIndex(CONFIG.ALGOLIA_UTTERANCES_INDEX, searchKey)
  ),
  withState('searchText', 'setSearchText', ''),
  withState('results', 'setResults', []),
  withProps(({ algoliaIndex, setSearchText, setResults }) => ({
    // override setSearchText
    setSearchText: searchText => {
      setSearchText(searchText);

      if (searchText.length > 0) {
        algoliaIndex
          .search(DOCUMENT_SEARCH_KEY, searchText)
          .then(({ hits }) => setResults(hits));
      } else {
        setResults([]);
      }
    },
  })),
  // Grow and shrink on click
  withState('searchBarOpen', 'setSearchBarOpen', false),
  withProps(({ searchBarOpen, setSearchBarOpen }) => ({
    setSearchBarOpen: shouldSearchBarOpen => {
      // Track the length of a search session
      if (!searchBarOpen && shouldSearchBarOpen) {
        window.mixpanel.time_event('Search Session');
      } else if (searchBarOpen && !shouldSearchBarOpen) {
        window.mixpanel.track('Search Session');
      }

      setSearchBarOpen(shouldSearchBarOpen);
    },
  })),
  withHandlers({
    handleClickOutside: ({ setSearchBarOpen }) => () => {
      setSearchBarOpen(false);
    },
  }),
  onClickOutside
)(AlgoliaSearchRender);
