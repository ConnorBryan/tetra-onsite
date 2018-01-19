import Document from './Document';
import Speaker from './Speaker';
import Utterance from './Utterance';

export type HighlightData = {
  document: Document,
  uuid: string,
  creator_id: number,
  creator: Speaker,
  start_time: number,
  end_time: number,
};
export default class Highlight {
  _document: Document; // FIXME
  uuid: string;
  creator: Speaker;
  startTime: number;
  endTime: number;

  constructor(data: HighlightData) {
    this._document = data.document;
    this.uuid = data.uuid;
    this.creator = data.creator;
    this.startTime = data.start_time;
    this.endTime = data.end_time;
  }

  /**
   * Searching for the text of a highlight is expensive. Since we're not passing
   * the text of internal highlights from the server, we need to search over the
   * document and get all words contained in the highlight.
   *
   * Instead of doing all of this work upfront and increaing load time on the
   * transcript page, we pass a reference of the document into each highlight
   * object and lazily compute the highlight text
   */
  getUtterances() {
    if (this._document == null) {
      throw 'Associate highlight with a document before calling `.getUtterances`';
    }

    var highlightUtterances = [];
    for (
      var utteranceIdx = 0;
      utteranceIdx < this._document.utterances.length;
      utteranceIdx++
    ) {
      const utterance = this._document.utterances[utteranceIdx];
      if (!utterance || !utterance.words) continue;

      const highlightUtteranceWords = [];
      let appendWords = false;
      for (
        var utteranceWordIdx = 0;
        utteranceWordIdx < utterance.words.length;
        utteranceWordIdx++
      ) {
        const utteranceWord = utterance.words[utteranceWordIdx];
        if (utteranceWord == null) continue;

        // Toggle the appendWord flag if the current word has timing data
        if (!utteranceWord.isSymbol && utteranceWord.startTime != null) {
          appendWords =
            this.startTime < utteranceWord.startTime &&
            utteranceWord.startTime < this.endTime;
        }

        // Append current word name based on the appendWord flag
        if (appendWords) highlightUtteranceWords.push(utteranceWord);
      }

      if (highlightUtteranceWords.length) {
        const highlightUtteranceWordsData = highlightUtteranceWords.map(word =>
          word.toDict()
        );
        const highlightUtterance = new Utterance({
          index: null,
          words: highlightUtteranceWordsData,
          speaker: utterance.speaker,
          highlightUuid: this.uuid,
        });
        highlightUtterances.push(highlightUtterance);
      }
    }
    return highlightUtterances;
  }
}
