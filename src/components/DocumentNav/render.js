import React from 'react';
import { Link } from 'react-router-dom';
import Meeting from 'src/models/Meeting';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import ShareModal from 'src/components/ShareModal';
import AlgoliaSearch from 'src/components/AlgoliaSearch';
import MeetingTitle from 'src/components/MeetingTitle';
import './styles.scss';

type DocumentNavProps = {
  meeting: Meeting,
  setCurrentTime: number => void,
  transcriptModalOpen: boolean,
  setTranscriptModalOpen: boolean => void,
  shareModalOpen: boolean,
  setShareModalOpen: boolean => void,
  canEditTitle: boolean,
  canShare: boolean,
};

export default function DocumentNav(
  {
    meeting,
    setCurrentTime,
    shareModalOpen,
    setShareModalOpen,
    canEditTitle,
    canShare,
  }: DocumentNavProps = {}
) {
  return (
    <header className="documentNav">
      <div className="documentNavLeft">
        <Link to="/">
          <div className="back">
            <Icon glyph="keyboard_arrow_left" color="#fff" size="big" />
          </div>
        </Link>
        {meeting != null &&
          <MeetingTitle
            className="meetingTitle"
            meeting={meeting}
            canEditTitle={canEditTitle}
          />}
      </div>

      <div className="documentNavActions" display-if={meeting != null}>
        {/* Search */}
        <div className="searchBar">
          <AlgoliaSearch
            searchKey={meeting.searchKey}
            onResultClick={({ start_time }) => setCurrentTime(start_time)}
          />
        </div>

        {/* Share */}
        <Button
          display-if={canShare}
          text="Share"
          size="medium"
          icon="person_add"
          onClick={() => setShareModalOpen(true)}
        />
        <ShareModal
          meeting={meeting}
          isOpen={shareModalOpen}
          setIsOpen={setShareModalOpen}
        />
      </div>
    </header>
  );
}
