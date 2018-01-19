import React, { Component } from 'react';
import Utterance from 'src/models/Utterance';
import Word from 'src/components/Word';
import Spinner from 'src/components/Spinner';
import { networkStatus } from 'src/utils';
import StarSelectedImg from './img/starSelected.png';
import StarNotSelectedImg from './img/starNotSelected.png';
import './styles.scss';

type UtteranceRowProps = {
  wordColor?: string,
  utterance: Utterance,
  currentAudioTime: number,
  setCurrentAudioTime: number => void,
  highlightForm: any,
  createHighlight: (startTime: number, endTime: number) => void,
  removeHighlight: (highlightId: string) => void,
  magicHighlightForm: any,
  removeMagicHighlight: (highlightId: string) => void,
};
export default class UtteranceRow extends Component {
  props: UtteranceRowProps;
  start: ?number;
  end: ?number;

  constructor(props: UtteranceRowProps) {
    super(props);

    this.start = this.props.utterance.startTime;
    this.end = this.props.utterance.endTime;
  }

  onSelect = () => {
    const startTime = this.props.utterance.startTime;
    const endTime = this.props.utterance.endTime;
    if (startTime != null && endTime != null) {
      this.props.createHighlight(startTime, endTime);
    }
  };

  onDeselect = () => {
    const highlightUuid = this.props.utterance.highlightUuid;
    if (highlightUuid != null) {
      this.props.removeHighlight(highlightUuid);
    }

    const magicHighlightUuid = this.props.utterance.magicHighlightUuid;
    if (magicHighlightUuid != null) {
      this.props.removeMagicHighlight(magicHighlightUuid);
    }
  };

  renderStar = () => {
    if (
      this.props.highlightForm.id == this.props.utterance.highlightUuid &&
      this.props.highlightForm.status == networkStatus.LOADING
    ) {
      return <Spinner color="red" size={14} />;
    } else if (
      this.props.magicHighlightForm.id ==
        this.props.utterance.magicHighlightUuid &&
      this.props.magicHighlightForm.status == networkStatus.LOADING
    ) {
      return <Spinner color="red" size={14} />;
    } else if (
      this.props.utterance.magicHighlightUuid == null &&
      this.props.utterance.highlightUuid == null
    ) {
      return (
        <img
          className="star"
          src={StarNotSelectedImg}
          onClick={this.onSelect}
        />
      );
    } else {
      return (
        <img className="star" src={StarSelectedImg} onClick={this.onDeselect} />
      );
    }
  };

  render() {
    const {
      utterance,
      currentAudioTime,
      setCurrentAudioTime,
      wordColor,
    } = this.props;

    return (
      <div className="utteranceWrapper">
        <div className="speakerRow">
          <div className="starContainer">
            {this.renderStar()}
          </div>
          <div className="speakerLabel">
            {utterance.getSpeakerName()}
          </div>
        </div>
        <div className="words">
          {utterance.words.map((word, idx) => {
            return (
              <Word
                name={word.name}
                startTime={word.startTime}
                duration={word.duration}
                wordColor={wordColor}
                progress={currentAudioTime}
                setTime={setCurrentAudioTime}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
