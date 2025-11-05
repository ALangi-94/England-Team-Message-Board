import { Filter } from 'bad-words';
import { ModerationResult } from '@/types';

const filter = new Filter();

// Add custom words if needed for football context
// These are words that might be considered problematic in an encouraging message context
const additionalBadWords = [
  'cheat',
  'cheater',
  'dive',
  'diver',
  'overrated',
  'rubbish',
];

// Add them to the filter
filter.addWords(...additionalBadWords);

// Negative sentiment keywords that we want to discourage
const negativeKeywords = [
  'hate',
  'terrible',
  'worst',
  'awful',
  'useless',
  'pathetic',
  'disappointing',
  'disappointed',
  'shame',
  'embarrassing',
  'embarrassment',
  'disgrace',
  'disgraceful',
];

export const moderateContent = (text: string): ModerationResult => {
  if (!text || text.trim().length === 0) {
    return {
      isClean: false,
      cleanedText: '',
      reason: null,
    };
  }

  const trimmedText = text.trim();

  // Check for profanity using bad-words library
  const isProfane = filter.isProfane(trimmedText);

  // Check for negative sentiment
  const lowerText = trimmedText.toLowerCase();
  const hasNegativeContent = negativeKeywords.some(keyword =>
    lowerText.includes(keyword)
  );

  // Clean the text (replace profanity with asterisks)
  const cleaned = filter.clean(trimmedText);

  // Determine if content is clean
  const isClean = !isProfane && !hasNegativeContent;

  // Determine the reason for rejection
  let reason: ModerationResult['reason'] = null;
  if (isProfane) {
    reason = 'profanity';
  } else if (hasNegativeContent) {
    reason = 'negative';
  }

  return {
    isClean,
    cleanedText: cleaned,
    reason,
  };
};

export const getModerationMessage = (reason: ModerationResult['reason']): string => {
  switch (reason) {
    case 'profanity':
      return 'Please keep your message free from inappropriate language. This is a positive space for encouraging our players.';
    case 'negative':
      return 'Please keep messages positive and supportive. This wall is for encouragement only.';
    default:
      return 'Please ensure your message is appropriate and encouraging.';
  }
};

export const checkMessageLength = (text: string, maxLength: number = 500): {
  isValid: boolean;
  message?: string
} => {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      message: 'Message cannot be empty.',
    };
  }

  if (text.length > maxLength) {
    return {
      isValid: false,
      message: `Message is too long. Maximum ${maxLength} characters allowed.`,
    };
  }

  return { isValid: true };
};
