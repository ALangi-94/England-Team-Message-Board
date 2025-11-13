import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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

type FilterType = 'recent' | 'random' | 'media';

export const PlayerWallPage = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('recent');
  const [sessionMessages, setSessionMessages] = useState<Message[]>([]);
  const [randomizedMessages, setRandomizedMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Parallax transforms for background elements
  const bgY1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const bgY2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const bgY3 = useTransform(scrollY, [0, 1000], [0, -400]);

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

  // Dynamic font size calculation based on card height
  const getDynamicFontSize = (rowSpan: number, messageLength: number): string => {
    // Calculate vertical space available (each row is roughly 110px + gap)
    const availableHeight = (rowSpan * 110) + ((rowSpan - 1) * 24); // 24px gap

    // Target is to fill roughly half the card's vertical space with text
    const targetHeight = availableHeight * 0.5;

    // Estimate lines based on message length (rough: ~50 chars per line)
    const estimatedLines = Math.max(1, Math.ceil(messageLength / 50));

    // Calculate font size to achieve target height
    // Each line is roughly 1.5 * fontSize in height (line-height: 1.5)
    const calculatedSize = Math.floor(targetHeight / (estimatedLines * 1.5));

    // Clamp between reasonable bounds
    const minSize = 14;
    const maxSize = 32;
    const fontSize = Math.min(maxSize, Math.max(minSize, calculatedSize));

    return `${fontSize}px`;
  };

  const calculateRowSpan = (message: Message): number => {
    const base = 3;
    const lengthBonus = Math.min(4, Math.floor(message.messageText.length / 80));
    const mediaBonus = message.media
      ? message.media.type === 'gif'
        ? 3
        : 2
      : 0;
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
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden message-board-surface">
      {/* Enhanced Parallax Background with multiple layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: bgY1 }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          style={{ y: bgY2 }}
          className="absolute -top-48 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-england-red/40 blur-3xl"
        />
        <motion.div
          style={{ y: bgY3 }}
          className="absolute bottom-[-12rem] left-[-10rem] h-[26rem] w-[26rem] rounded-full bg-england-blue/30 blur-3xl"
        />
        <motion.div
          style={{ y: bgY2 }}
          className="absolute bottom-[-16rem] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          style={{ y: bgY1 }}
          className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-england-red/20 blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Sticky Header with Player Info */}
        <div className="sticky top-0 z-50 bg-gradient-to-b from-[#001946]/95 via-[#012f7a]/90 to-transparent backdrop-blur-md pb-6 pt-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <Link to="/players">
                <Button variant="ghost" className="gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" /> Back to players
                </Button>
              </Link>
              <span className="message-chip hidden md:inline-flex">Fan collage view</span>
            </div>

            {/* Sticky Player Card */}
            <div className="message-board-panel-dark rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-white/60 shadow-xl shrink-0">
                  <AvatarImage src={player.imageUrl} alt={player.name} />
                  <AvatarFallback className="bg-white/20 text-2xl font-bold text-white">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">{player.name}</h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                    <span className="message-chip bg-white/30 text-xs">{player.position}</span>
                    <span className="message-chip bg-england-red/60 text-xs">#{player.number}</span>
                    <Badge className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      {allMessages.length} {allMessages.length === 1 ? 'message' : 'messages'}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button
                    size="lg"
                    className="rounded-2xl bg-white/90 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.3em] text-england-blue transition hover:bg-white whitespace-nowrap"
                    onClick={() => navigate(`/player/${player.id}/submit`)}
                  >
                    <MessageSquarePlus className="mr-2 h-4 w-4" /> Add Message
                  </Button>

                  <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)} className="w-full sm:w-auto">
                    <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-white/15 p-1.5">
                      <TabsTrigger value="recent" className="rounded-xl px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-wider text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        Recent
                      </TabsTrigger>
                      <TabsTrigger value="random" className="rounded-xl px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-wider text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        Remix
                      </TabsTrigger>
                      <TabsTrigger value="media" className="rounded-xl px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-wider text-white data-[state=active]:bg-white data-[state=active]:text-england-blue">
                        Media
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="container mx-auto px-4 pb-24 pt-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="collage-grid">
              {filteredMessages.map((message: Message, index: number) => {
                const rowSpan = calculateRowSpan(message);
                const dynamicFontSize = getDynamicFontSize(rowSpan, message.messageText.length);

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ rotate: 1.2, scale: 1.02 }}
                    style={{
                      gridRow: `span ${rowSpan}`,
                      gridColumn: `span ${calculateColumnSpan(index)}`,
                    }}
                  >
                    <Card
                      className="collage-card"
                      style={{ backgroundColor: message.styling.backgroundColor }}
                    >
                      <CardContent className="flex h-full flex-col gap-4 p-6">
                        <div className="flex items-center justify-between shrink-0">
                          <span className="text-xs font-bold uppercase tracking-widest truncate" style={{ color: message.styling.textColor }}>
                            {message.fanName}
                          </span>
                          <span className="text-[0.6rem] uppercase tracking-wider whitespace-nowrap ml-2" style={{ color: message.styling.textColor, opacity: 0.7 }}>
                            {formatMessageTimestamp(message.timestamp)}
                          </span>
                        </div>

                        <p
                          className={`flex-1 leading-relaxed ${getFontClass(message.styling.font)}`}
                          style={{
                            color: message.styling.textColor,
                            fontSize: dynamicFontSize,
                            lineHeight: 1.5
                          }}
                        >
                          {message.messageText}
                        </p>

                        {message.media && message.media.type === 'emoji' && (
                          <span className="text-5xl shrink-0" role="img" aria-label="emoji">
                            {message.media.emoji}
                          </span>
                        )}
                        {message.media && message.media.type === 'gif' && message.media.url && (
                          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-2">
                            <img
                              src={message.media.url}
                              alt={`${message.playerName} fan gif`}
                              className="max-h-52 w-full object-contain"
                              loading="lazy"
                            />
                            {message.media.attribution && (
                              <span className="absolute bottom-2 left-2 right-2 bg-black/55 px-2 py-1 text-[0.55rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                                {message.media.attribution}
                              </span>
                            )}
                          </div>
                        )}

                        <div
                          className="mt-auto flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-wider shrink-0"
                          style={{ color: message.styling.textColor, opacity: 0.7 }}
                        >
                          <span className="truncate">{message.isSessionMessage ? 'New Drop' : 'Fan Love'}</span>
                          <span className="whitespace-nowrap ml-2">#{player.number} {player.name.split(' ')[0]}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
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
  );
};
