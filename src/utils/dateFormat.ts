import { formatDistanceToNow } from 'date-fns';

export const getRelativeTime = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatMessageTimestamp = (timestamp: Date): string => {
  return getRelativeTime(timestamp);
};
