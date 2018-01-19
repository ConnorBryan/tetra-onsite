import React from 'react';
import Meeting from 'src/models/Meeting';
import TextInput from 'src/components/form/TextInput';
import Icon from 'src/components/Icon';
import './styles.scss';

type MeetingTitleProps = {
  meeting: Meeting,

  canEditTitle: boolean,
  isEditing: boolean,
  setIsEditing: boolean => void,

  meetingTitle: string,
  setMeetingTitle: string => void,
};

export default function MeetingTitleRender(
  {
    canEditTitle,

    isEditing,
    setIsEditing,

    meetingTitle,
    setMeetingTitle,
  }: MeetingTitleProps = {}
) {
  return (
    <div className="titleWrapper">
      <h2
        display-if={!isEditing}
        onClick={() => {
          if (canEditTitle) setIsEditing(true);
        }}
      >
        <span>
          {meetingTitle}
        </span>
        <Icon
          display-if={canEditTitle}
          glyph="mode_edit"
          color="#555"
          size="small"
          className="editButton"
        />
      </h2>
      <h2 display-if={isEditing}>
        <TextInput
          className="titleInput"
          name="meetingTitle"
          value={meetingTitle}
          onChange={({ value }) => setMeetingTitle(value)}
        />
      </h2>
    </div>
  );
}
