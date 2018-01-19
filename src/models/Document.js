import Highlight from './Highlight';
import type { HighlightData } from './Highlight';
import MagicHighlight from './MagicHighlight';
import type { MagicHighlightData } from './MagicHighlight';
import Keyword from './Keyword';
import type { KeywordData } from './Keyword';
import Speaker from './Speaker';
import type { SpeakerData } from './Speaker';
import Utterance from './Utterance';
import type { UtteranceData } from './Utterance';

export type DocumentData = {
  rating: ?number,
  highlights: Array<HighlightData>,
  magic_highlights: Array<MagicHighlightData>,
  utterances: Array<UtteranceData>,
  speakers: Array<SpeakerData>,
  keywords: Array<KeywordData>,
};
export default class Document {
  rating: ?number;
  utterances: Array<Utterance>;
  highlights: Array<Highlight>;
  magicHighlights: Array<MagicHighlight>;
  keywords: Array<Keyword>;

  constructor({
    rating,
    highlights: highlightsData,
    magic_highlights: magicHighlightsData,
    speakers: speakersData,
    utterances: utterancesData,
    keywords: keywordsData,
  }: DocumentData) {
    this.rating = rating;

    // Speaker dict
    const speakerLookup = {};
    speakersData.forEach(speakerData => {
      speakerLookup[speakerData.id] = new Speaker(speakerData);
    });

    // Utterances
    this.utterances = utterancesData.map((utteranceData, index) => {
      const speaker =
        utteranceData.speaker_id != null
          ? speakerLookup[utteranceData.speaker_id]
          : null;
      return new Utterance({
        index,
        speaker,
        words: utteranceData.words,
      });
    });

    // Highlights
    this.highlights = highlightsData.map(highlightData => {
      return new Highlight({
        document: (this: Document),
        creator: speakerLookup[highlightData.creator_id],
        ...highlightData,
      });
    });

    // Magic Highlights
    this.magicHighlights = magicHighlightsData.map(magicHighlightData => {
      return new MagicHighlight({
        document: (this: Document),
        creator: speakerLookup[magicHighlightData.creator_id],
        ...magicHighlightData,
      });
    });

    this._updateAllHighlightedWords();

    // Keywords
    this.keywords = keywordsData.map(keywordData => {
      return new Keyword(keywordData);
    });
  }

  _findUtteranceHighlight<T: Highlight>(
    utterance: Utterance,
    highlights: Array<T>
  ) {
    return highlights.find((highlight: Highlight) => {
      if (utterance.startTime == null || utterance.endTime == null) {
        return false;
      }
      return (
        utterance.startTime <= highlight.endTime &&
        utterance.endTime >= highlight.startTime
      );
    });
  }

  _updateAllHighlightedWords() {
    let currentHighlight = null,
      currentMagicHighlight = null;
    this.utterances = this.utterances.map(utterance => {
      // Set utterance highlight
      currentHighlight = this._findUtteranceHighlight(
        utterance,
        this.highlights
      );
      utterance.highlightUuid =
        currentHighlight != null ? currentHighlight.uuid : null;

      // Set utterance magic highlight
      currentMagicHighlight = this._findUtteranceHighlight(
        utterance,
        this.magicHighlights
      );
      utterance.magicHighlightUuid =
        currentMagicHighlight != null ? currentMagicHighlight.uuid : null;

      return utterance;
    });
  }

  getAllHighlights() {
    const allHighlights = this.highlights.concat(this.magicHighlights);
    return allHighlights.sort(highlight => highlight.startTime);
  }

  addHighlight(highlight: Highlight) {
    highlight._document = this;
    this.highlights.push(highlight);
    this._updateAllHighlightedWords();
  }

  removeHighlight(highlightUuid: string) {
    const highlightIdx = this.highlights.findIndex(highlight => {
      return highlight != null && highlightUuid == highlight.uuid;
    });
    if (highlightIdx !== -1) {
      this.highlights.splice(highlightIdx, 1);
      this._updateAllHighlightedWords();
    }
  }

  removeMagicHighlight(magicHighlightUuid: string) {
    const magicHighlightIdx = this.magicHighlights.findIndex(magicHighlight => {
      return (
        magicHighlight != null && magicHighlightUuid == magicHighlight.uuid
      );
    });
    if (magicHighlightIdx !== -1) {
      this.magicHighlights.splice(magicHighlightIdx, 1);
      this._updateAllHighlightedWords();
    }
  }
}
