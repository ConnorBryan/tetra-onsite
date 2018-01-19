import request from 'src/services/Request';
import Meeting from 'src/models/Meeting';
import Document from 'src/models/Document';
import Highlight from 'src/models/Highlight';
import Participant from 'src/models/Participant';
import Collaborator from 'src/models/Collaborator';

type GetMeetingsArguments = {
  offset?: number,
  limit?: number,
};
export function getMeetings(
  { offset = 0, limit = 10 }: GetMeetingsArguments = {}
): Promise<{ meetings: Array<Meeting>, meetingCount: number }> {
  return (request({
    url: '/meetings/',
    params: { offset, limit },
  }): any).then(({ data }) => ({
    meetings: data.results.map(value => new Meeting(value)),
    meetingCount: data.count,
  }));
}

export function getMeeting(code: string): Promise<Meeting> {
  return request({
    url: `/meetings/${code}/`,
  }).then(({ data }) => new Meeting(data));
}

export function getMeetingSocket(code: string) {
  return new WebSocket(`ws://${CONFIG.API_BASE_URL}/meetings/${code}/`);
}

export function removeHighlight(meetingCode: string, highlightId: string) {
  return request({
    url: `/meetings/${meetingCode}/highlights/${highlightId}/`,
    method: 'delete',
  });
}

export function saveMeetingName(code: string, name: string): Promise<Meeting> {
  return request({
    method: 'patch',
    url: `/meetings/${code}/`,
    data: { name },
  }).then(({ data }) => new Meeting(data));
}

export function getSharedMeeting(shareCode: string): Promise<Meeting> {
  return request({
    url: `/meetings/share/${shareCode}/`,
  }).then(({ data }) => new Meeting(data));
}

export function getMeetingNote(code: string): Promise<Document> {
  return (request({
    url: `/meetings/${code}/note/`,
  }): any).then(({ data }) => new Document(data));
}

export function rateMeetingNote(code: string, rating: number): Promise<*> {
  return request({
    method: 'patch',
    url: `/meetings/${code}/note/`,
    data: { rating },
  });
}

export function getSharedMeetingNote(shareCode: string): Promise<Document> {
  return (request({
    url: `/meetings/share/${shareCode}/note/`,
  }): any).then(({ data }) => new Document(data));
}

export function getMeetingParticipants(
  code: string
): Promise<Array<Participant>> {
  return (request({
    method: 'get',
    url: `/meetings/${code}/participants/`,
  }): any).then(({ data }) => data.map(value => new Participant(value)));
}

export function getSharedMeetingParticipants(
  shareCode: string
): Promise<Array<Participant>> {
  return (request({
    method: 'get',
    url: `/meetings/share/${shareCode}/participants/`,
  }): any).then(({ data }) => data.map(value => new Collaborator(value)));
}

export function getMeetingCollaborators(
  code: string
): Promise<Array<Collaborator>> {
  return (request({
    method: 'get',
    url: `/meetings/${code}/collaborators/`,
  }): any).then(({ data }) => data.map(value => new Collaborator(value)));
}

export function getSharedMeetingCollaborators(
  shareCode: string
): Promise<Array<Collaborator>> {
  return (request({
    method: 'get',
    url: `/meetings/share/${shareCode}/collaborators/`,
  }): any).then(({ data }) => data.map(value => new Collaborator(value)));
}

type AddMeetingCollaboratorArguments = {
  code: string,
  email: string | null,
  phoneNumber: string | null,
};
export function addMeetingCollaborator({
  code,
  email,
  phoneNumber,
}: AddMeetingCollaboratorArguments): Promise<Collaborator> {
  return request({
    method: 'post',
    url: `/meetings/${code}/collaborators/`,
    data: phoneNumber != null ? { phone_number: phoneNumber } : { email },
  }).then(({ data }) => new Collaborator(data));
}

export function createMeetingHighlight(
  meetingCode: string,
  startTime: number,
  endTime: number
) {
  return (request({
    method: 'post',
    url: `/meetings/${meetingCode}/highlights/`,
    data: { start_time: startTime, end_time: endTime },
  }): any).then(({ data }) => new Highlight(data));
}

export function removeMeetingHighlight(
  meetingCode: string,
  highlightId: string
) {
  return request({
    method: 'delete',
    url: `/meetings/${meetingCode}/highlights/${highlightId}/`,
  }).then(() => highlightId);
}

export function removeMeetingMagicHighlight(
  meetingCode: string,
  magicHighlightId: string
) {
  return request({
    method: 'delete',
    url: `/meetings/${meetingCode}/magic_highlights/${magicHighlightId}/`,
  }).then(() => magicHighlightId.toString());
}
