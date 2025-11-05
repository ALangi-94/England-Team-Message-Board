import { Message } from '@/types';

const SESSION_KEY = 'england-messages';
const SESSION_COUNT_KEY = 'england-messages-count';

export const saveMessage = (message: Message): void => {
  try {
    const existing = getSessionMessages();
    existing.push({ ...message, isSessionMessage: true });
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(existing));
    updateSessionCount(existing.length);
  } catch (error) {
    console.error('Error saving message to session storage:', error);
  }
};

export const getSessionMessages = (): Message[] => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY);
    if (!data) return [];

    const messages = JSON.parse(data) as Message[];
    // Convert timestamp strings back to Date objects
    return messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
      isSessionMessage: true,
    }));
  } catch (error) {
    console.error('Error retrieving messages from session storage:', error);
    return [];
  }
};

export const getSessionMessageCount = (): number => {
  try {
    const count = sessionStorage.getItem(SESSION_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error retrieving message count:', error);
    return 0;
  }
};

export const updateSessionCount = (count: number): void => {
  try {
    sessionStorage.setItem(SESSION_COUNT_KEY, count.toString());
  } catch (error) {
    console.error('Error updating session count:', error);
  }
};

export const clearSessionMessages = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_COUNT_KEY);
  } catch (error) {
    console.error('Error clearing session storage:', error);
  }
};

export const getSessionMessagesForPlayer = (playerId: string): Message[] => {
  const allMessages = getSessionMessages();
  return allMessages.filter(msg => msg.playerId === playerId);
};
