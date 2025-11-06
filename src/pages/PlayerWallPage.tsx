import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { getPlayerById } from '@/data/players';
import { syntheticMessages } from '@/data/syntheticMessages';
import {
  getSessionMessagesForPlayer,
  SESSION_KEY,
  SESSION_MESSAGES_UPDATED_EVENT,
} from '@/utils/sessionStorage';
import { formatMessageTimestamp } from '@/utils/dateFormat';
import type { Message, FontStyle } from '@/types';
import { ParallaxBackdrop } from '@/components/ParallaxBackdrop';

type FilterType = 'recent' | 'random' | 'media';

export const PlayerWallPage = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('recent');
  const [sessionMessages, setSessionMessages] = useState<Message[]>([]);
  const [randomizedMessages, setRandomizedMessages] = useState<Message[]>([]);

  const player = playerId ? getPlayerById(playerId) : undefined;

  const loadSessionMessages = useCallback(() => {
    if (!playerId) {
      setSessionMessages([]);
      return;
    }

    setSessionMessages(getSessionMessagesForPlayer(playerId));
  }, [playerId]);

  useEffect(() => {
    loadSessionMessages();

    if (typeof window === 'undefined') {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === SESSION_KEY) {
        loadSessionMessages();
      }
    };

    const handleSessionUpdate = () => {
      loadSessionMessages();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(SESSION_MESSAGES_UPDATED_EVENT, handleSessionUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(SESSION_MESSAGES_UPDATED_EVENT, handleSessionUpdate);
    };
  }, [loadSessionMessages]);

  const allMessages = useMemo(() => {
    if (!playerId) return [];

    const synthetic = syntheticMessages.filter(msg => msg.playerId === playerId);

    return [...synthetic, ...sessionMessages];
  }, [playerId, sessionMessages]);

  useEffect(() => {
    if (!allMessages.length) {
      setRandomizedMessages([]);
      return;
    }

    const shuffled = [...allMessages];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setRandomizedMessages(shuffled);
  }, [allMessages]);

  const filteredMessages = useMemo(() => {
    switch (filter) {
      case 'recent':
        return [...allMessages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'random':
        return randomizedMessages;
      case 'media':
        return allMessages
          .filter(msg => msg.media)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      default:
        return allMessages;
    }
  }, [allMessages, filter, randomizedMessages]);

  const getFontClass = (font: FontStyle): string => {
    const fontMap: Record<FontStyle, string> = {
      inter: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
      playful: 'font-sans',
    };
    return fontMap[font] || 'font-sans';
  };

  const getFontSize = (size: string): string => {
    const sizeMap: Record<string, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    return sizeMap[size] || 'text-base';
  };

  const calculateRowSpan = (message: Message): number => {
    const base = 3;
    const lengthBonus = Math.min(4, Math.floor(message.messageText.length / 80));
    const mediaBonus = message.media ? 2 : 0;
    const fontBonus = message.styling.fontSize === 'large' ? 2 : message.styling.fontSize === 'small' ? 0 : 1;
    return base + lengthBonus + mediaBonus + fontBonus;
  };

  const calculateColumnSpan = (index: number): number => {
    const map = [2, 1, 1, 2, 1];
    return map[index % map.length];
  };

  if (!player) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001946] via-[#012f7a] to-[#041137] p-6 text-white">
        <div className="message-board-panel max-w-lg rounded-3xl px-10 py-12 text-center text-england-blue">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-england-blue">Player Not Found</h1>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-england-blue/70">
            The player you are looking for does not exist.
          </p>
          <Link to="/players" className="mt-8 block">
            <Button className="england-button-secondary w-full rounded-2xl py-4 text-sm font-extrabold uppercase tracking-[0.3em]">
              Back to squad
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden message-board-surface">
      <ParallaxBackdrop className="z-0" variant="red" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 pb-24 pt-12">
          <div className="flex items-center justify-between">
            <Link to="/players">
              <Button variant="ghost" className="gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" /> Back to players
              </Button>
            </Link>
            <span className="message-chip hidden md:inline-flex">Fan collage view</span>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="message-board-panel-dark relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-england-red/30 blur-3xl" />
              <div className="relative flex flex-col items-center text-center">
                <Avatar className="h-28 w-28 border-4 border-white/60 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
                  <AvatarImage src={player.imageUrl} alt={player.name} />
                  <AvatarFallback className="bg-white/20 text-3xl font-bold text-white">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">{player.name}</h1>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="message-chip bg-white/30 text-xs">{player.position}</span>
                    <span className="message-chip bg-england-red/60 text-xs">#{player.number}</span>
                  </div>
                </div>
                <Badge className="mt-6 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  {allMessages.length} {allMessages.length === 1 ? 'message' : 'messages'}
                </Badge>

                <Button
                  size="lg"
                  className="mt-10 h-14 w-full rounded-2xl bg-white/90 text-xs font-extrabold uppercase tracking-[0.4em] text-england-blue transition hover:bg-white"
                  onClick={() => navigate(`/player/${player.id}/submit`)}
                >
                  <MessageSquarePlus className="mr-2 h-5 w-5" /> Add your message
                </Button>

                <div className="mt-10 w-full">
                  <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
                    <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-white/15 p-2">
                      <TabsTrigger value="recent" className="rounded-xl py-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        Recent
                      </TabsTrigger>
                      <TabsTrigger value="random" className="rounded-xl py-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        Remix
                      </TabsTrigger>
                      <TabsTrigger value="media" className="rounded-xl py-3 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        With media
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="collage-grid">
                {filteredMessages.map((message: Message, index: number) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ rotate: 1.2 }}
                    style={{
                      gridRow: `span ${calculateRowSpan(message)}`,
                      gridColumn: `span ${calculateColumnSpan(index)}`,
                    }}
                  >
                    <Card
                      className="collage-card"
                      style={{ backgroundColor: message.styling.backgroundColor }}
                    >
                      <CardContent className="flex h-full flex-col gap-5 p-8">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: message.styling.textColor }}>
                            {message.fanName}
                          </span>
                          <span className="text-[0.55rem] uppercase tracking-[0.35em]" style={{ color: message.styling.textColor }}>
                            {formatMessageTimestamp(message.timestamp)}
                          </span>
                        </div>

                        <p
                          className={`leading-relaxed ${getFontClass(message.styling.font)} ${getFontSize(message.styling.fontSize)}`}
                          style={{ color: message.styling.textColor }}
                        >
                          {message.messageText}
                        </p>

                        {message.media && message.media.type === 'emoji' && (
                          <span className="text-5xl" role="img" aria-label="emoji">
                            {message.media.emoji}
                          </span>
                        )}

                        <div
                          className="mt-auto flex items-center justify-between text-[0.55rem] font-semibold uppercase tracking-[0.35em]"
                          style={{ color: message.styling.textColor }}
                        >
                          <span>{message.isSessionMessage ? 'New session drop' : 'Fan submission'}</span>
                          <span>#{player.number} {player.name.split(' ')[0]}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <div className="message-board-panel mt-10 rounded-3xl px-10 py-16 text-center text-england-blue">
                  <h2 className="text-xl font-extrabold uppercase tracking-[0.3em]">No messages match this filter</h2>
                  <p className="mt-4 text-sm uppercase tracking-[0.25em] text-england-blue/70">
                    Try a different view to reveal more fan love.
                  </p>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};
