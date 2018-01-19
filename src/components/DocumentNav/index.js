import { compose, withProps, withState } from 'recompose';
import { withTetraUser } from 'src/utils/Auth';
import { saveMeetingName } from 'src/services/MeetingService';
import DocumentNav from './render';

export default compose(
  withState('shareModalOpen', 'setShareModalOpen', false),
  // Title edit
  withTetraUser(),
  withProps(({ tetraUser, meeting, shareModalOpen, setShareModalOpen }) => ({
    isShared:
      tetraUser == null ||
      meeting == null ||
      meeting.host == null ||
      tetraUser.email != meeting.host.email,
    saveMeetingTitle: meetingName => {
      saveMeetingName(meeting.code, meetingName);
    },
    setShareModalOpen: shareModalShouldBeOpen => {
      // Track share modal session length
      if (!shareModalOpen && shareModalShouldBeOpen) {
        window.mixpanel.time_event('Share Session');
      } else if (shareModalOpen && !shareModalShouldBeOpen) {
        window.mixpanel.track('Share Session', {
          email: tetraUser != null ? tetraUser.email : null,
          meetingCode: meeting.code,
          meetingDurationSeconds: meeting.durationSeconds,
        });
      }

      setShareModalOpen(shareModalShouldBeOpen);
    },
  }))
)(DocumentNav);
