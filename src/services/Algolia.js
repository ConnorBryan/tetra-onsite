import algoliasearch from 'algoliasearch/lite';

const getRequestIdx = (function() {
  let nextRequestIdx = 0;
  return () => nextRequestIdx++;
})();

class IndexClient {
  client: any;
  index: any;
  activeRequests: { [key: string]: number };

  constructor(index: string, key: string) {
    this.client = algoliasearch('LDSERUCMS9', key);
    this.index = this.client.initIndex(index);
    this.activeRequests = {};
  }

  search(searchKey: string, searchText: string) {
    const requestIdx = getRequestIdx();
    this.activeRequests[searchKey] = requestIdx;

    return new Promise((resolve, reject) => {
      this.index
        .search(searchText)
        .then(response => {
          if (requestIdx === this.activeRequests[searchKey]) resolve(response);
        })
        .catch(error => {
          if (requestIdx === this.activeRequests[searchKey]) reject(error);
        });
    });
  }
}

export function getAlgoliaIndex(index: string, key: string) {
  return new IndexClient(index, key);
}
