import { compose, withHandlers, withState } from 'recompose';
import onClickOutside from 'react-onclickoutside';
import { saveMeetingName } from 'src/services/MeetingService';
import MeetingTitle from './render';

export default compose(
  withState('isEditing', 'setIsEditing', false),
  withState('meetingTitle', 'setMeetingTitle', ({ meeting }) =>
    meeting.getDisplayName()
  ),
  withHandlers({
    handleClickOutside: ({
      meeting,
      isEditing,
      setIsEditing,
      meetingTitle,
      onSaveMeetingTitle,
    }) => () => {
      if (isEditing && meeting.getDisplayName() != meetingTitle) {
        saveMeetingName(meeting.code, meetingTitle);
        onSaveMeetingTitle(meetingTitle);
      }
      setIsEditing(false);
    },
  }),
  onClickOutside
)(MeetingTitle);
