import { formatCents } from 'src/utils/Currency';
import MeetingHost from './MeetingHost';

export default class Meeting {
  host: MeetingHost;
  code: string;
  shareCode: string;
  name: ?string;
  isShared: boolean;
  isStarted: boolean;
  isUploaded: boolean;
  isNoteStarted: boolean;
  isNoteComplete: boolean;
  transcriptCost: number;
  isTranscriptStarted: boolean;
  isTranscriptComplete: boolean;
  startTime: ?Date;
  durationSeconds: ?number;
  rating: ?number;
  url: ?string;
  searchKey: ?string;
  progressBarState: string;
  progressBarPercentage: number;

  constructor(data: any) {
    this.host = new MeetingHost(data.host);
    this.code = data.code;
    this.shareCode = data.shareCode || data.share_code;
    this.name = data.name || null;
    this.isShared = data.isShared || data.is_shared || false;
    this.isStarted = data.isStarted || data.is_started || false;
    this.isUploaded = data.isUploaded || data.is_uploaded || false;
    this.isNoteStarted = data.isNoteStarted || data.is_note_started || false;
    this.isNoteComplete = data.isNoteComplete || data.is_note_complete || false;
    this.transcriptCost = data.transcriptCost || data.transcript_cost || 50;
    this.isTranscriptStarted =
      data.isTranscriptStarted || data.is_transcript_started || false;
    this.isTranscriptComplete =
      data.isTranscriptComplete || data.is_transcript_complete || false;
    this.startTime =
      data.startTime || data.start_time
        ? new Date(data.startTime || data.start_time)
        : null;
    this.durationSeconds = data.duration_seconds || null;
    this.rating = data.rating || null;
    this.url = data.url || null;
    this.searchKey = data.searchKey || data.search_key || null;
    this.progressBarState = data.progress_bar_state;
    this.progressBarPercentage = data.progress_bar_percentage;
  }

  getDisplayName() {
    if (this.name != null) return this.name;
    else return `Untitled`;
  }

  getHostName() {
    return this.host.getFullName();
  }

  getDisplayStartTime() {
    if (this.startTime == null) return 'Unknown';

    const startTime: Date = this.startTime;
    const year = startTime.getFullYear();
    const month = startTime.getMonth() + 1;
    const day = startTime.getDate();
    const hours =
      startTime.getHours() == 0
        ? 12
        : startTime.getHours() > 12
          ? startTime.getHours() - 12
          : startTime.getHours();
    const minutes = startTime.getMinutes();
    const seconds = startTime.getSeconds();
    const isAm = startTime.getHours() > 12;

    return `
      ${month}/${day}/${year} at
      ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10
      ? '0'
      : ''}${seconds}
      ${isAm ? 'am' : 'pm'}
    `;
  }

  getShareUrl() {
    return `${window.location.hostname}${window.location.port
      ? ':'
      : ''}${window.location.port}/share/${this.shareCode}`;
  }

  getStatus() {
    var status;
    if (this.isTranscriptComplete) status = 'Transcript Ready';
    else if (this.isTranscriptStarted) status = 'Transcript In Progress';
    else if (this.isNoteComplete) status = 'Notes Ready';
    else if (this.isNoteStarted) status = 'Notes In Progress';
    else status = 'Call In Progress';

    if (this.isShared) return `Shared ${status}`;
    else return status;
  }

  getIsComplete() {
    return this.isNoteComplete || this.isTranscriptComplete;
  }

  getDisplayTranscriptCost() {
    return this.transcriptCost != null
      ? `$${formatCents('usd', this.transcriptCost)}`
      : 'Unknown';
  }
}
