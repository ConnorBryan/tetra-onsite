import React from 'react';
import './styles.scss';

type StarProps = {
  idx: number,
  meetingRating: number,
  setMeetingRating: number => void,
  submitMeetingRating: number => void,
};
function Star({
  idx,
  meetingRating,
  setMeetingRating,
  submitMeetingRating,
}: StarProps) {
  return (
    <div className="star">
      <i
        style={{ width: 0 }}
        onMouseEnter={() => setMeetingRating(idx)}
        onClick={() => submitMeetingRating(idx)}
        className="material-icons"
      >
        {meetingRating >= idx ? 'star_fill' : 'star_outline'}
      </i>
    </div>
  );
}

type RatingSnackbarProps = {
  meetingCode: string,
  isTranscriptRating: boolean,
  meetingRating: number,
  setMeetingRating: number => void,
  submitMeetingRating: () => void,
  alreadyRated: boolean,
};
export default function RatingSnackbar(
  {
    meetingRating,
    setMeetingRating,
    submitMeetingRating,
    alreadyRated,
  }: RatingSnackbarProps = {}
) {
  return (
    <div className="root">
      <div>
        <div className="titleRow">
          <h5 className="title">
            {alreadyRated ? 'Thanks for your feedback' : 'Rate this transcript'}
          </h5>
        </div>
        <div className="starRow">
          {[1, 2, 3, 4, 5].map((idx, key) => {
            return (
              <Star
                idx={idx}
                key={key}
                meetingRating={meetingRating}
                setMeetingRating={!alreadyRated ? setMeetingRating : () => {}}
                submitMeetingRating={submitMeetingRating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
