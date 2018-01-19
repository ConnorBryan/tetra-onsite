import request from 'src/services/Request';
import Conference from 'src/models/Conference';
import ConferenceInvitation from 'src/models/ConferenceInvitation';

type GetConferencesArguments = {
  offset?: number,
  limit?: number,
};
export function getConferences(
  { offset = 0, limit = 0 }: GetConferencesArguments = {}
): Promise<{ conferences: Array<Conference>, conferenceCount: number }> {
  return (request({
    url: '/conferences/',
    params: { offset, limit },
  }): any).then(({ data }) => ({
    conferences: data.results.map(value => new Conference(value)),
    conferenceCount: data.count,
  }));
}

export function createConference() {
  return request({
    method: 'post',
    url: '/conferences/',
    data: {},
  }).then(({ data }) => new Conference(data));
}

export function getConference(conferenceId: number): Promise<Conference> {
  return request({
    url: `/conferences/${conferenceId}/`,
  }).then(({ data }) => new Conference(data));
}

type CreateConferenceInvitationProps = {
  conferenceId: number,
  email: string | null,
  phoneNumber: string | null,
};
export function createConferenceInvitation({
  conferenceId,
  email,
  phoneNumber,
}: CreateConferenceInvitationProps): Promise<ConferenceInvitation> {
  return request({
    method: 'post',
    url: `/conferences/${conferenceId}/invitations/`,
    data: phoneNumber != null ? { phone_number: phoneNumber } : { email },
  }).then(({ data }) => new ConferenceInvitation(data));
}

export function getConferenceInvitations(
  conferenceId: number
): Promise<Array<ConferenceInvitation>> {
  return (request({
    url: `/conferences/${conferenceId}/invitations/`,
  }): any).then(({ data }) => data.map(val => new ConferenceInvitation(val)));
}
