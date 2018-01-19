import { compose, withProps, withState } from 'recompose';
import { rateMeetingNote } from 'src/services/MeetingService';
import RatingSnackbar from './render';

export default compose(
  withState(
    'alreadyRated',
    'setAlreadyRated',
    ({ meetingRating }) => !!meetingRating
  ),
  withState(
    'meetingRating',
    'setMeetingRating',
    ({ meetingRating }) => meetingRating
  ),
  withProps(
    ({ meetingCode, meetingRating, setMeetingRating, setAlreadyRated }) => ({
      submitMeetingRating: rating => {
        rateMeetingNote(meetingCode, rating || meetingRating).then(() => {
          setAlreadyRated(true);
          if (rating != meetingRating) {
            setMeetingRating(rating);
          }
        });
      },
    })
  )
)(RatingSnackbar);
