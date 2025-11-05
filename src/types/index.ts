export type PlayerPosition = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  number: number;
  imageUrl: string;
}

export type FontStyle = 'inter' | 'serif' | 'mono' | 'playful';
export type FontSize = 'small' | 'medium' | 'large';
export type MediaType = 'emoji' | 'gif' | 'image';

export interface MessageStyling {
  font: FontStyle;
  textColor: string;
  backgroundColor: string;
  fontSize: FontSize;
}

export interface MessageMedia {
  type: MediaType;
  url?: string;
  emoji?: string;
}

export interface Message {
  id: string;
  playerId: string;
  playerName: string;
  fanName: string;
  messageText: string;
  timestamp: Date;
  styling: MessageStyling;
  media?: MessageMedia;
  isSessionMessage?: boolean;
}

export interface ModerationResult {
  isClean: boolean;
  cleanedText: string;
  reason: 'profanity' | 'negative' | null;
}
