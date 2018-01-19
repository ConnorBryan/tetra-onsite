import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Infinite from 'react-infinite';
import { networkStatus } from 'src/utils';
import { redirectWithoutAuth } from 'src/utils/Auth';
import { setTheme } from 'src/utils/Theme';
import { getMeetings } from 'src/services/MeetingService';
import { Meeting } from 'src/models';
import GlobalNav from 'src/components/GlobalNav';
import ProgressBar from 'src/components/ProgressBar';
import './styles.scss';

type MeetingRowProps = {
  meeting: Meeting,
};
function MeetingRow({ meeting }: MeetingRowProps) {
  const meetingRowWithoutLink = (
    <div
      className={
        meeting.isNoteComplete ? 'meetingRow clickableMeetingRow' : 'meetingRow'
      }
    >
      <div className="meetingRowContents">
        <div className="meetingTitleCol">
          <h2 className="meetingTitle">
            {meeting.getDisplayName()}
          </h2>
          <p className="meetingStartTime">
            {meeting.getDisplayStartTime()}
          </p>
        </div>
        <div className="meetingStatusCol">
          <p className="meetingStatus">
            {meeting.progressBarState}
          </p>
          <ProgressBar width={meeting.progressBarPercentage * 100} />
        </div>
      </div>
    </div>
  );
  return meeting.isNoteComplete
    ? <Link to={`/docs/${meeting.code}`}>
        {meetingRowWithoutLink}
      </Link>
    : meetingRowWithoutLink;
}

class NotebookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetings: {
        limit: 10,
        offset: 0,
        data: [],
        count: null,
        status: networkStatus.UNLOADED,
        error: null,
      },
    };
  }

  componentDidMount() {
    this.getMeetingPage(10, 0);
  }

  getMeetingPageSuccess = (
    meetings: Array<Meeting>,
    count: number,
    limit: number,
    offset: number
  ) => {
    this.setState(state => ({
      ...state,
      meetings: {
        data: [
          ...state.meetings.data.slice(0, offset),
          ...meetings,
          ...state.meetings.data.slice(offset + limit),
        ],
        limit,
        offset,
        count,
        status: networkStatus.LOADED,
        error: null,
      },
    }));
  };

  getMeetingPageError = () => {
    const error = "Couldn't load meetings";
    this.setState(state => ({
      ...state.meetings,
      status: networkStatus.ERROR,
      error,
    }));
  };

  getMeetingPage = (limit: number, offset: number) => {
    this.setState(state => ({
      ...state,
      meetings: {
        ...state.meetings,
        status: networkStatus.LOADING,
        error: null,
      },
    }));
    getMeetings({ limit, offset }).then(
      ({ meetings, meetingCount }) =>
        this.getMeetingPageSuccess(meetings, meetingCount, limit, offset),
      this.getMeetingPageError
    );
  };

  onInfiniteLoad = () => {
    if (this.state.meetings.data.length >= this.state.meetings.count) return;

    const limit = this.state.meetings.limit;
    const newOffset = limit + this.state.meetings.offset;
    this.getMeetingPage(limit, newOffset);
  };

  render() {
    return (
      <div className="notebookPage">
        <GlobalNav />
        <Infinite
          elementHeight={100}
          infiniteLoadBeginEdgeOffset={100}
          onInfiniteLoad={this.onInfiniteLoad}
          useWindowAsScrollContainer
        >
          {this.state.meetings.data.map(meeting => {
            return <MeetingRow meeting={meeting} key={meeting.code} />;
          })}
        </Infinite>
      </div>
    );
  }
}

export default compose(redirectWithoutAuth(), setTheme('white'), withRouter)(
  NotebookPage
);
