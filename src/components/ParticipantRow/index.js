import React from 'react';
import Participant from 'src/models/Participant';
import './styles.scss';

type ParticipantRowProps = {
  participant: Participant,
};

export default function ParticipantRow({ participant }: ParticipantRowProps) {
  return (
    <tr className="participantRow">
      <td>
        {participant.email}
      </td>
      <td>
        {participant.firstName}
      </td>
      <td>
        {participant.lastName}
      </td>
    </tr>
  );
}
