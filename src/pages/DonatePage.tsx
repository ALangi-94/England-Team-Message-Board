import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Heart, ExternalLink } from 'lucide-react';
import { getSessionMessages } from '@/utils/sessionStorage';
import type { Message, FontStyle, FontSize } from '@/types';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

export const DonatePage = () => {
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string>('');

  useEffect(() => {
    // Get the last message from session
    const messages = getSessionMessages();
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1]);
    }

    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1D1160', '#CE1126', '#FFFFFF'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1D1160', '#CE1126', '#FFFFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

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

  const donationAmounts = [5, 10, 25, 50];

  const handleDonate = () => {
    // Open MIND donation page in new tab
    window.open('https://www.mind.org.uk/donate', '_blank');
    // Continue to confirmation
    navigate('/confirmation');
  };

  const handleSkip = () => {
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-england-blue">
      {/* Success Hero Section */}
      <section className="bg-england-blue py-16 border-b-4 border-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <div className="mb-6">
              <CheckCircle className="w-24 h-24 mx-auto text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-4 tracking-tight">
              Your message has been added!
            </h1>
            <p className="text-xl text-white mb-8">
              Thank you for supporting the Three Lions. Your encouragement means everything to our players.
            </p>

          {/* Message Preview */}
          {lastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card
                className="england-card"
                style={{ backgroundColor: lastMessage.styling.backgroundColor }}
              >
                <CardContent className="p-6">
                  <p className="font-semibold text-sm mb-3" style={{ color: lastMessage.styling.textColor }}>
                    {lastMessage.fanName}
                  </p>
                  <p
                    className={`mb-4 ${getFontClass(lastMessage.styling.font)} ${getFontSize(lastMessage.styling.fontSize)}`}
                    style={{ color: lastMessage.styling.textColor }}
                  >
                    {lastMessage.messageText}
                  </p>
                  {lastMessage.media && lastMessage.media.type === 'emoji' && (
                    <div className="text-4xl mb-4">{lastMessage.media.emoji}</div>
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
                  <p className="text-xs opacity-70" style={{ color: lastMessage.styling.textColor }}>
                    To: {lastMessage.playerName}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
        </div>
      </section>

      {/* MIND Donation Section */}
      <section className="bg-england-blue py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="england-card bg-white border-4 border-england-red">
              <CardHeader className="text-center pb-6 bg-england-navy">
                <div className="w-20 h-20 bg-white flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-england-red" />
                </div>
                <CardTitle className="text-3xl mb-2 text-white font-extrabold uppercase">Want to do more?</CardTitle>
                <CardDescription className="text-lg text-white">
                  Support mental health in the football community
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold mb-4 text-england-navy uppercase">
                      About MIND
                    </h3>
                  <p className="text-england-gray-700 mb-4 leading-relaxed">
                    MIND is a mental health charity that provides advice and support to empower anyone experiencing
                    a mental health problem. They work to ensure everyone experiencing a mental health problem gets
                    the support and respect they deserve.
                  </p>
                  <p className="text-england-gray-700 leading-relaxed">
                    Mental health in football is crucial. Your donation helps provide vital resources and support
                    for players at all levels who may be struggling.
                  </p>
                </div>

                <Alert className="bg-england-blue border-0">
                  <AlertDescription className="text-center text-base text-white font-bold">
                    <Heart className="w-5 h-5 inline-block mr-2 text-england-red" />
                    Every donation helps support mental health in the football community
                  </AlertDescription>
                </Alert>

                {/* Donation Amount Selection */}
                <div>
                  <Label className="mb-4 block text-lg font-bold uppercase text-england-navy">
                    Choose an amount
                  </Label>
                  <ToggleGroup
                    type="single"
                    value={selectedAmount}
                    onValueChange={(value) => setSelectedAmount(value)}
                    className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {donationAmounts.map((amount) => (
                      <ToggleGroupItem
                        key={amount}
                        value={String(amount)}
                        className="h-16 border-2 text-xl font-extrabold data-[state=on]:border-england-red data-[state=on]:bg-england-red data-[state=on]:text-white"
                      >
                        £{amount}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedAmount('custom')}
                    className={cn(
                      'w-full border-2 font-extrabold uppercase',
                      selectedAmount === 'custom'
                        ? 'border-england-red bg-england-red text-white hover:bg-england-red/90'
                        : 'border-england-gray-300 text-england-navy hover:border-england-red'
                    )}
                  >
                    Custom Amount
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={handleDonate}
                    size="lg"
                    className="england-button-primary w-full gap-2 text-lg py-6 h-auto uppercase font-extrabold"
                  >
                    Donate to MIND
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    size="lg"
                    className="w-full text-base py-6 h-auto border-2 border-england-blue text-england-blue hover:bg-england-blue hover:text-white font-bold uppercase"
                  >
                    Continue without donating
                  </Button>
                </div>

                <p className="text-xs text-england-gray-500 text-center font-bold uppercase">
                  You will be redirected to MIND's official donation page. This is an optional step.
                </p>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
