import Speaker from './Speaker';
import Word from './Word';
import type { WordData } from './Word';

export type UtteranceData = {
  index: ?number,
  speaker_id?: number,
  speaker: ?Speaker,
  words: Array<WordData>,
  highlightUuid?: string,
  magicHighlightUuid?: string,
};
export default class Utterance {
  _index: ?number;
  speaker: ?Speaker;
  words: Array<Word>;
  startTime: ?number;
  endTime: ?number;
  highlightUuid: ?string;
  magicHighlightUuid: ?string;

  constructor({ words: wordsData, ...data }: UtteranceData) {
    this._index = data.index;
    this.speaker = data.speaker;
    this.words = wordsData.map((wordData, index) => {
      const word = new Word({
        index,
        utterance_index: this._index,
        ...wordData,
      });

      const wordEndTime = word.getEndTime();
      if (word.startTime != null && wordEndTime != null) {
        this.startTime =
          this.startTime != null
            ? Math.min(word.startTime, this.startTime)
            : word.startTime;
        this.endTime =
          this.endTime != null
            ? Math.max(wordEndTime, this.endTime)
            : wordEndTime;
      }

      return word;
    });
    this.highlightUuid = data.highlightUuid;
    this.magicHighlightUuid = data.magicHighlightUuid;
  }

  getSpeakerName() {
    return this.speaker && this.speaker.name ? this.speaker.name : 'Unknown';
  }

  getSpeakerIsMeName(name: string) {
    const speakerName = this.getSpeakerName();
    return speakerName === name ? 'You' : speakerName;
  }
}
