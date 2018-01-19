import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { networkStatus } from 'src/utils';
import { redirectWithoutAuth } from 'src/utils/Auth';
import { setTheme } from 'src/utils/Theme';
import {
  getMeeting,
  getSharedMeeting,
  getMeetingNote,
  getSharedMeetingNote,
  createMeetingHighlight,
  removeMeetingHighlight,
  removeMeetingMagicHighlight,
} from 'src/services/MeetingService';
import AudioPlayer from 'src/components/AudioPlayer';
import Spinner from 'src/components/Spinner';
import RatingSnackbar from 'src/components/RatingSnackbar';
import DocumentNav from 'src/components/DocumentNav';
import DocumentContainer from 'src/components/Document';
import Meeting from 'src/models/Meeting';
import Document from 'src/models/Document';
import Highlight from 'src/models/Highlight';
import './styles.scss';

type DocumentPageProps = {
  match: {
    params: {
      documentSlug: string,
      code: string,
      shareCode: string,
    },
  },
};
class DocumentPage extends Component {
  props: DocumentPageProps;
  audioRef: React$Element<*>;
  code: string;
  shareCode: string;
  isShared: boolean;
  state: {
    currentAudioTime: number,
    meeting: {
      data: ?Meeting,
      status: string,
      error: ?string,
    },
    document: {
      data: ?Document,
      status: string,
      error: ?string,
    },
    highlightForm: {
      id: ?string,
      status: string,
      error: ?string,
    },
    magicHighlightForm: {
      id: ?string,
      status: string,
      error: ?string,
    },
  };

  constructor(props: DocumentPageProps) {
    super(props);

    this.code = this.props.match.params.code;
    this.shareCode = this.props.match.params.shareCode;
    this.isShared = this.shareCode != null;

    this.state = {
      isAudioPlaying: false,
      currentAudioTime: 0,
      meeting: {
        data: null,
        status: networkStatus.UNLOADED,
        error: null,
      },
      document: {
        data: null,
        status: networkStatus.UNLOADED,
        error: null,
      },
      highlightForm: {
        uuid: null,
        status: networkStatus.UNLOADED,
        error: null,
      },
      magicHighlightForm: {
        uuid: null,
        status: networkStatus.UNLOADED,
        error: null,
      },
    };
  }

  componentDidMount() {
    this.getMeeting();
    this.getDocument();

    window.mixpanel.time_event('Document Session');
  }

  componentWillUnmount() {
    const meetingCode =
      this.state.meeting.data != null ? this.state.meeting.data.code : null;
    window.mixpanel.track('Document Session', {
      meetingCode,
      isShared: this.isShared,
    });
  }

  handleGetMeetingSuccess = (meeting: Meeting) => {
    this.setState(state => ({
      ...state,
      meeting: {
        data: meeting,
        status: networkStatus.LOADED,
        error: null,
      },
    }));
  };

  handleGetMeetingError = () => {
    const errorMessage = 'Something went wrong';
    this.setState(state => ({
      ...state,
      meeting: {
        data: null,
        status: networkStatus.ERROR,
        error: errorMessage,
      },
    }));
  };

  getMeeting = () => {
    this.setState(state => ({
      ...state,
      meeting: {
        data: null,
        status: networkStatus.LOADING,
        error: null,
      },
    }));

    return (this.isShared
      ? getSharedMeeting(this.shareCode)
      : getMeeting(this.code)).then(
      this.handleGetMeetingSuccess,
      this.handleGetMeetingError
    );
  };

  handleGetDocumentSuccess = (document: Document) => {
    this.setState(state => ({
      ...state,
      document: {
        data: document,
        status: networkStatus.LOADED,
        error: null,
      },
    }));
  };

  handleGetDocumentError = () => {
    const errorMessage = 'Something went wrong';
    this.setState(state => ({
      ...state,
      document: {
        data: null,
        status: networkStatus.ERROR,
        error: errorMessage,
      },
    }));
  };

  getDocument = () => {
    this.setState(state => ({
      ...state,
      document: {
        data: null,
        status: networkStatus.LOADING,
        error: null,
      },
    }));

    return (this.isShared
      ? getSharedMeetingNote(this.shareCode)
      : getMeetingNote(this.code)).then(
      this.handleGetDocumentSuccess,
      this.handleGetDocumentError
    );
  };

  setIsAudioPlaying = (isAudioPlaying: boolean) => {
    this.setState(state => ({
      ...state,
      isAudioPlaying,
    }));
  };

  setCurrentAudioTime = (currentAudioTime: number) => {
    this.setState(state => ({
      ...state,
      currentAudioTime,
    }));
  };

  handleCreateHighlightSuccess = (highlight: Highlight) => {
    this.setState(state => {
      const document = state.document.data;
      document.addHighlight(highlight);
      return {
        ...state,
        document: {
          ...state.document,
          data: document,
        },
        highlightForm: {
          status: networkStatus.LOADED,
          error: null,
        },
      };
    });
  };

  handleCreateHighlightError = () => {
    const errorMessage = 'Something went wrong';
    this.setState(state => ({
      ...state,
      highlightForm: {
        status: networkStatus.ERROR,
        error: errorMessage,
      },
    }));
  };

  createHighlight = (startTime: number, endTime: number) => {
    this.setState(state => ({
      ...state,
      highlightForm: {
        status: networkStatus.LOADING,
        error: null,
      },
    }));
    createMeetingHighlight(this.code, startTime, endTime).then(
      this.handleCreateHighlightSuccess,
      this.handleCreateHighlightError
    );
  };

  handleRemoveHighlightSuccess = (highlightId: string) => {
    this.setState(state => {
      const document = state.document.data;
      document.removeHighlight(highlightId);
      return {
        ...state,
        document: {
          ...state.document,
          data: document,
        },
        highlightForm: {
          status: networkStatus.LOADED,
          error: null,
        },
      };
    });
  };

  handleRemoveHighlightError = () => {
    const errorMessage = 'Something went wrong';
    this.setState(state => ({
      ...state,
      highlightForm: {
        status: networkStatus.ERROR,
        error: errorMessage,
      },
    }));
  };

  removeHighlight = (highlightId: string) => {
    this.setState(state => ({
      ...state,
      highlightForm: {
        id: highlightId,
        status: networkStatus.LOADING,
        error: null,
      },
    }));
    removeMeetingHighlight(this.code, highlightId).then(
      this.handleRemoveHighlightSuccess,
      this.handleRemoveHighlightError
    );
  };

  handleRemoveMagicHighlightSuccess = (magicHighlightId: string) => {
    this.setState(state => {
      const document = state.document.data;
      document.removeMagicHighlight(magicHighlightId);
      return {
        ...state,
        document: {
          ...state.document,
          data: document,
        },
        magicHighlightForm: {
          status: networkStatus.LOADED,
          error: null,
        },
      };
    });
  };

  handleRemoveMagicHighlightError = () => {
    const errorMessage = 'Something went wrong';
    this.setState(state => ({
      ...state,
      magicHighlightForm: {
        status: networkStatus.ERROR,
        error: errorMessage,
      },
    }));
  };

  removeMagicHighlight = (magicHighlightId: string) => {
    this.setState(state => ({
      ...state,
      magicHighlightForm: {
        id: magicHighlightId,
        status: networkStatus.LOADING,
        error: null,
      },
    }));
    removeMeetingMagicHighlight(this.code, magicHighlightId).then(
      this.handleRemoveMagicHighlightSuccess,
      this.handleRemoveMagicHighlightError
    );
  };

  render() {
    if (this.state.meeting.data == null || this.state.document.data == null) {
      return (
        <div className="transcriptSpinnerPage">
          <Spinner color="red" className="spinner" />
        </div>
      );
    }

    return (
      <div className="transcriptPage">
        <DocumentContainer
          transcriptDocument={this.state.document.data}
          isAudioPlaying={this.state.isAudioPlaying}
          setIsAudioPlaying={this.setIsAudioPlaying}
          currentAudioTime={this.state.currentAudioTime}
          setCurrentAudioTime={this.setCurrentAudioTime}
          highlightForm={this.state.highlightForm}
          createHighlight={this.createHighlight}
          removeHighlight={this.removeHighlight}
          magicHighlightForm={this.state.magicHighlightForm}
          removeMagicHighlight={this.removeMagicHighlight}
        />
        <AudioPlayer
          ref={ref => (this.audioPlayerRef = ref)}
          duration={this.state.meeting.data.durationSeconds}
          source={this.state.meeting.data.url}
          isPlaying={this.state.isAudioPlaying}
          setIsPlaying={this.setIsAudioPlaying}
          currentAudioTime={this.state.currentAudioTime}
          setCurrentAudioTime={this.setCurrentAudioTime}
        >
          <RatingSnackbar
            display-if={!this.isShared}
            meetingCode={this.state.meeting.data.code}
            meetingRating={this.state.document.data.rating}
          />
        </AudioPlayer>
        <DocumentNav
          meeting={this.state.meeting.data}
          setCurrentTime={this.setCurrentAudioTime}
          canEditTitle={!this.isShared}
          canShare={!this.isShared}
        />
      </div>
    );
  }
}

export default compose(redirectWithoutAuth(), setTheme('white'), withRouter)(
  DocumentPage
);
