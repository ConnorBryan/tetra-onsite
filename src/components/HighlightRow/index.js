import React from 'react';
import Highlight from 'src/models/Highlight';
import UtteranceRow from 'src/components/UtteranceRow';
import { formatPlaybackTime } from 'src/utils';
import PlayInTextImg from './img/playInText.png';
import './styles.scss';

type HighlightRowProps = {
  highlight: Highlight,
  isAudioPlaying: boolean,
  setIsAudioPlaying: boolean => void,
  currentAudioTime: boolean,
  setCurrentAudioTime: boolean => void,
  highlightForm: any,
  createHighlight: (startTime: number, endTime: number) => void,
  removeHighlight: (highlightId: string) => void,
  magicHighlightForm: any,
  removeMagicHighlight: (magicHighlightId: string) => void,
};
export default function HighlightRow({
  highlight,
  setIsAudioPlaying,
  currentAudioTime,
  setCurrentAudioTime,
  highlightForm,
  createHighlight,
  removeHighlight,
  magicHighlightForm,
  removeMagicHighlight,
}: HighlightRowProps) {
  const highlightUtterances = highlight.getUtterances();

  if (highlightUtterances.length == 0) {
    return null;
  }

  const wordColor = highlight.isMagicHighlight ? '#eaf6ff' : '#fff9e4';
  const onHighlightPlayerClick = () => {
    if (highlight.startTime != null) {
      setCurrentAudioTime(highlight.startTime);
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className="highlightRow">
      <div className="highlightHeaderRow">
        {highlight.isMagicHighlight &&
          <div className="highlightPlayerBadgeContainer">
            <div className="highlightPlayerBadge">
              <span className="highlightEmoji">✨</span>
              <span className="highlightTag">magic highlight</span>
            </div>
          </div>}
        <div className="highlightPlayer" onClick={onHighlightPlayerClick}>
          <span className="highlightPlayerText">
            {formatPlaybackTime(highlight.startTime)} -{' '}
            {formatPlaybackTime(highlight.endTime)}
          </span>
          <img className="highlightPlayerImage" src={PlayInTextImg} />
        </div>
      </div>
      <div className="utteranceList">
        {highlightUtterances.map((utterance, idx) => {
          return (
            <UtteranceRow
              utterance={utterance}
              currentAudioTime={currentAudioTime}
              setCurrentAudioTime={setCurrentAudioTime}
              wordColor={wordColor}
              highlightForm={highlightForm}
              createHighlight={createHighlight}
              removeHighlight={removeHighlight}
              magicHighlightForm={magicHighlightForm}
              removeMagicHighlight={removeMagicHighlight}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
