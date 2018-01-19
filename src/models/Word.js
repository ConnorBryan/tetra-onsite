export type WordData = {
  index?: ?number,
  utterance_index?: ?number,
  name: string,
  start_time?: ?number,
  duration?: ?number,
  confidence: ?number,
  is_symbol?: ?boolean,
};
export default class Word {
  _index: ?number;
  _utteranceIndex: ?number;
  name: string;
  startTime: ?number;
  duration: ?number;
  confidence: ?number;
  isSymbol: boolean;

  constructor(data: WordData) {
    this._index = data.index;
    this._utteranceIndex = data.utterance_index;
    this.name = data.name;
    this.startTime = data.start_time;
    this.duration = data.duration;
    this.confidence = data.confidence;
    this.isSymbol = data.is_symbol || false;
  }

  toDict(): WordData {
    return {
      index: this._index,
      utterance_index: this._utteranceIndex,
      name: this.name,
      start_time: this.startTime,
      duration: this.duration,
      confidence: this.confidence,
      is_symbol: this.isSymbol,
    };
  }

  getEndTime() {
    return this.startTime != null && this.duration != null
      ? this.startTime + this.duration
      : null;
  }
}
