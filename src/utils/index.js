import moment from 'moment-timezone';

/**
 * Truncates a string down to a given length using ellipsis
 */
export function truncate(rawString: string, maxLength: number) {
  if (rawString.length > maxLength) {
    return `${rawString.slice(0, maxLength - 3)}...`;
  }
  return rawString;
}

export const networkStatus = {
  UNLOADED: 'Loading of this data has not been attempted',
  LOADING: 'There is an active network request for this data',
  LOADED: 'The data has been requested and returned a successful response',
  ERROR: 'There was an error with the last request of this data',
};

export function formatPlaybackTime(seconds: number) {
  const TEN_MINUTES = 600;
  const ONE_HOUR = 3600;
  const TEN_HOURS = 36000;

  let formatStr;
  if (seconds < TEN_MINUTES) formatStr = 'm:ss';
  else if (seconds < ONE_HOUR) formatStr = 'mm:ss';
  else if (seconds < TEN_HOURS) formatStr = 'h:mm:ss';
  else formatStr = 'hh:mm:ss';

  return moment(seconds * 1000).format(formatStr);
}
