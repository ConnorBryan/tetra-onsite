import React, { Component } from 'react';
import HighlightRow from 'src/components/HighlightRow';
import UtteranceRow from 'src/components/UtteranceRow';
import Document from 'src/models/Document';
import './styles.scss';

type DocumentProps = {
  transcriptDocument: Document,
  isAudioPlaying: boolean,
  setIsAudioPlaying: boolean => void,
  currentAudioTime: number,
  setCurrentAudioTime: number,
  highlightForm: any,
  createHighlight: (startTime: number, endTime: number) => void,
  removeHighlight: (highlightId: string) => void,
  magicHighlightForm: any,
  removeMagicHighlight: (magicHighlightId: string) => void,
};

export default class DocumentContainer extends Component {
  props: DocumentProps;

  constructor(props: DocumentProps) {
    super(props);
  }

  render() {
    const highlights =
      this.props.transcriptDocument != null
        ? this.props.transcriptDocument.getAllHighlights()
        : [];
    const utterances =
      this.props.transcriptDocument != null
        ? this.props.transcriptDocument.utterances
        : [];

    return (
      <div className="pageContents">
        <div>
          {highlights.length != 0 &&
            <h2 className="sectionHeader">Highlights</h2>}
          <div className="highlights">
            {highlights
              .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
              .map((highlight, idx) => {
                return (
                  <HighlightRow
                    highlight={highlight}
                    isAudioPlaying={this.props.isAudioPlaying}
                    setIsAudioPlaying={this.props.setIsAudioPlaying}
                    currentAudioTime={this.props.currentAudioTime}
                    setCurrentAudioTime={this.props.setCurrentAudioTime}
                    highlightForm={this.props.highlightForm}
                    createHighlight={this.props.createHighlight}
                    removeHighlight={this.props.removeHighlight}
                    magicHighlightForm={this.props.magicHighlightForm}
                    removeMagicHighlight={this.props.removeMagicHighlight}
                    key={idx}
                  />
                );
              })}
          </div>
          <h2 className="sectionHeader">Transcript</h2>
          <div className="transcript">
            {utterances.map((utterance, idx) => {
              return (
                <UtteranceRow
                  utterance={utterance}
                  isAudioPlaying={this.props.isAudioPlaying}
                  setIsAudioPlaying={this.props.setIsAudioPlaying}
                  currentAudioTime={this.props.currentAudioTime}
                  setCurrentAudioTime={this.props.setCurrentAudioTime}
                  highlightForm={this.props.highlightForm}
                  createHighlight={this.props.createHighlight}
                  removeHighlight={this.props.removeHighlight}
                  magicHighlightForm={this.props.magicHighlightForm}
                  removeMagicHighlight={this.props.removeMagicHighlight}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
