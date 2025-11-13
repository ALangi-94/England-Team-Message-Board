import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, MessageSquare, Users, Home, Share2 } from 'lucide-react';
import { getSessionMessages } from '@/utils/sessionStorage';
import type { Message, FontStyle, FontSize } from '@/types';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Get the last message from session
    const messages = getSessionMessages();
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1]);
    } else {
      // If no messages, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const getFontClass = (font: FontStyle): string => {
    const fontMap: Record<FontStyle, string> = {
      inter: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
      playful: 'font-sans tracking-wide',
    };
    return fontMap[font] || 'font-sans';
  };

  const getFontSize = (size: FontSize): string => {
    const sizeMap: Record<FontSize, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    return sizeMap[size] || 'text-base';
  };

  if (!lastMessage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-england-blue">
      {/* Success Hero */}
      <section className="bg-england-blue py-16 border-b-4 border-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle2 className="w-32 h-32 mx-auto text-white" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-white uppercase mb-6 tracking-tight"
            >
              Your Message is Live!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-white mb-8"
            >
              Thank you for supporting {lastMessage.playerName}. Your encouragement is now visible on their wall.
            </motion.p>

          {/* Message Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <Card
              className="england-card"
              style={{ backgroundColor: lastMessage.styling.backgroundColor }}
            >
              <CardContent className="p-8">
                <p className="font-bold text-sm mb-4 uppercase" style={{ color: lastMessage.styling.textColor }}>
                  {lastMessage.fanName}
                </p>
                <p
                  className={`mb-4 ${getFontClass(lastMessage.styling.font)} ${getFontSize(lastMessage.styling.fontSize)}`}
                  style={{ color: lastMessage.styling.textColor }}
                >
                  {lastMessage.messageText}
                </p>
                {lastMessage.media && lastMessage.media.type === 'emoji' && (
                  <div className="text-5xl mb-4">{lastMessage.media.emoji}</div>
                )}
                {lastMessage.media && lastMessage.media.type === 'gif' && lastMessage.media.url && (
                  <div className="mb-4 rounded-2xl border border-england-blue/10 bg-white/70 p-3">
                    <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white/80">
                      <img
                        src={lastMessage.media.url}
                        alt={`${lastMessage.playerName} fan gif`}
                        className="max-h-56 w-full object-contain"
                      />
                      {lastMessage.media.attribution && (
                        <span className="absolute bottom-2 left-2 right-2 bg-black/55 px-2 py-1 text-[0.55rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                          {lastMessage.media.attribution}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-sm opacity-70 font-bold uppercase" style={{ color: lastMessage.styling.textColor }}>
                  To: {lastMessage.playerName}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="bg-england-blue py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl mx-auto space-y-4 mb-12"
          >
            <Link to={`/player/${lastMessage.playerId}`} className="block">
              <Button
                size="lg"
                className="england-button-primary w-full gap-3 text-lg py-6 h-auto uppercase font-extrabold"
              >
                <MessageSquare className="w-6 h-6" />
                View {lastMessage.playerName.split(' ')[0]}'s Wall
              </Button>
            </Link>

            <Link to="/players" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-3 text-lg py-6 h-auto border-2 border-white text-white hover:bg-white hover:text-england-blue transition-all duration-300 font-bold uppercase"
              >
                <Users className="w-6 h-6" />
                Send Another Message
              </Button>
            </Link>

            <Link to="/" className="block">
              <Button
                variant="ghost"
                size="lg"
                className="w-full gap-3 text-lg py-6 h-auto text-white hover:bg-white/10 transition-all duration-300 font-bold uppercase"
              >
                <Home className="w-6 h-6" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Session Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Alert className="bg-england-red border-0">
              <AlertDescription className="text-center text-white">
                <span className="font-extrabold uppercase">Remember:</span> Your message will be visible during this session only.
                Messages are stored in your browser and will be cleared when you close this tab. This is a proof-of-concept demonstration.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Share Options Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="england-card bg-white">
              <CardContent className="p-8 text-center">
                <Share2 className="w-12 h-12 mx-auto mb-4 text-england-blue" />
                <h2 className="text-2xl font-extrabold mb-3 text-england-navy uppercase">
                  Share the Love
                </h2>
                <p className="text-england-gray-700 mb-6">
                  Encourage your friends and family to send their support to the England squad!
                </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>
              </div>
              <p className="text-xs text-england-gray-500 mt-4 font-bold uppercase">
                Share options for demonstration only
              </p>
            </CardContent>
          </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="max-w-2xl mx-auto mt-12 text-center"
          >
            <div className="england-card bg-white p-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-england-navy mb-4 uppercase">
                Keep the Support Going!
              </h3>
              <p className="text-lg text-england-gray-700 mb-6">
                Every message of encouragement helps our players feel the nation's support
              </p>
              <Link to="/players">
                <Button
                  size="lg"
                  className="england-button-secondary gap-2 text-lg px-8 py-6 h-auto uppercase font-extrabold"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send More Messages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
