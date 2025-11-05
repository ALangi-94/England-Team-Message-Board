import { useState, useMemo } from 'react';
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
import { getSessionMessages } from '@/utils/sessionStorage';
import { formatMessageTimestamp } from '@/utils/dateFormat';
import type { Message, FontStyle } from '@/types';

type FilterType = 'recent' | 'random' | 'media';

export const PlayerWallPage = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('recent');

  const player = playerId ? getPlayerById(playerId) : undefined;

  // Combine synthetic and session messages
  const allMessages = useMemo(() => {
    if (!playerId) return [];

    const synthetic = syntheticMessages.filter(msg => msg.playerId === playerId);
    const session = getSessionMessages().filter(msg => msg.playerId === playerId);

    return [...synthetic, ...session];
  }, [playerId]);

  // Filter messages
  const filteredMessages = useMemo(() => {
    let messages = [...allMessages];

    switch (filter) {
      case 'recent':
        return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'random':
        return messages.sort(() => 0.5 - Math.random());
      case 'media':
        return messages.filter(msg => msg.media).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      default:
        return messages;
    }
  }, [allMessages, filter]);

  // Font style mapping
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

  if (!player) {
    return (
      <div className="min-h-screen bg-england-blue flex items-center justify-center">
        <div className="england-card bg-white p-12 max-w-lg mx-4">
          <h1 className="text-3xl font-extrabold text-england-navy uppercase mb-4 text-center">Player Not Found</h1>
          <p className="text-england-gray-700 mb-6 text-center">The player you're looking for doesn't exist.</p>
          <Link to="/players">
            <Button className="england-button-primary w-full uppercase font-extrabold">Back to Players</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-england-blue">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/players">
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 font-bold uppercase">
            <ArrowLeft className="w-4 h-4" />
            Back to Players
          </Button>
        </Link>
      </div>

      {/* Player Hero Section */}
      <section className="bg-england-blue py-12 border-b-4 border-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative inline-block mb-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={player.imageUrl} alt={player.name} />
                <AvatarFallback className="text-4xl font-bold bg-england-navy text-white">
                  {player.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-md bg-england-red">
                {player.number}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-4 tracking-tight">
              {player.name}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="england-card bg-white px-6 py-3">
                <p className="text-england-navy font-bold uppercase text-sm">
                  {player.position}
                </p>
              </div>
              <div className="england-card bg-white px-6 py-3">
                <p className="text-england-navy font-bold uppercase text-sm">
                  #{player.number}
                </p>
              </div>
            </div>
            <Badge className="text-base px-4 py-2 mb-8 bg-england-red text-white font-bold uppercase">
              {allMessages.length} {allMessages.length === 1 ? 'message' : 'messages'}
            </Badge>

            {/* Add Message Button - Fixed */}
            <div className="mb-8">
              <Button
                size="lg"
                className="england-button-primary gap-2 text-lg px-8 py-6 h-auto uppercase font-extrabold"
                onClick={() => navigate(`/player/${player.id}/submit`)}
              >
                <MessageSquarePlus className="w-6 h-6" />
                ADD YOUR MESSAGE
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-england-blue py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-2xl mx-auto">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
              <TabsList className="grid w-full grid-cols-3 h-auto bg-white">
                <TabsTrigger value="recent" className="py-3 font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">
                  Recent
                </TabsTrigger>
                <TabsTrigger value="random" className="py-3 font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">
                  Random
                </TabsTrigger>
                <TabsTrigger value="media" className="py-3 font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">
                  With Media
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>
      </section>

      {/* Messages Grid */}
      <section className="bg-england-blue py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="container mx-auto px-4 pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredMessages.map((message: Message, index: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="h-full england-card hover:shadow-2xl transition-all duration-300 border-l-4 border-l-england-blue"
                  style={{ backgroundColor: message.styling.backgroundColor }}
                >
                  <CardContent className="p-6">
                    {/* Fan Name */}
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-bold text-sm uppercase" style={{ color: message.styling.textColor }}>
                        {message.fanName}
                      </p>
                      {message.isSessionMessage && (
                        <Badge variant="secondary" className="text-xs bg-england-red text-white font-bold uppercase">
                          Your message
                        </Badge>
                      )}
                    </div>

                    {/* Message Text */}
                    <p
                      className={`mb-4 ${getFontClass(message.styling.font)} ${getFontSize(message.styling.fontSize)}`}
                      style={{ color: message.styling.textColor }}
                    >
                      {message.messageText}
                    </p>

                    {/* Media */}
                    {message.media && (
                      <div className="mb-4">
                        {message.media.type === 'emoji' && (
                          <div className="text-4xl">{message.media.emoji}</div>
                        )}
                        {message.media.type === 'gif' && message.media.url && (
                          <img
                            src={message.media.url}
                            alt="GIF"
                            className="max-h-48 w-auto"
                          />
                        )}
                        {message.media.type === 'image' && message.media.url && (
                          <img
                            src={message.media.url}
                            alt="Image"
                            className="max-h-48 w-auto"
                          />
                        )}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs opacity-70 font-bold uppercase" style={{ color: message.styling.textColor }}>
                      {formatMessageTimestamp(message.timestamp)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Messages */}
          {filteredMessages.length === 0 && (
            <div className="text-center py-16">
              <div className="england-card bg-white p-12 max-w-lg mx-auto">
                <p className="text-xl text-england-navy font-bold uppercase mb-4">
                  {filter === 'media'
                    ? 'No messages with media yet.'
                    : 'No messages yet. Be the first to send support!'}
                </p>
                <Button
                  onClick={() => navigate(`/player/${player.id}/submit`)}
                  className="england-button-primary uppercase font-extrabold"
                >
                  Send the First Message
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};
