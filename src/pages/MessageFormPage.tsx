import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Search, Smile } from 'lucide-react';
import { getPlayerById, players } from '@/data/players';
import { saveMessage } from '@/utils/sessionStorage';
import { moderateContent, getModerationMessage } from '@/utils/contentModeration';
import type { FontStyle, FontSize, MessageMedia } from '@/types';
import { useGifSearch, GifResult } from '@/hooks/useGifSearch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

// Form validation schema
const messageFormSchema = z.object({
  playerId: z.string().min(1, 'Please select a player'),
  fanName: z.string().max(50, 'Name must be 50 characters or less').optional(),
  messageText: z.string().min(1, 'Message is required').max(500, 'Message must be 500 characters or less'),
  font: z.enum(['inter', 'serif', 'mono', 'playful']),
  textColor: z.string(),
  backgroundColor: z.string(),
  fontSize: z.enum(['small', 'medium', 'large']),
});

type MessageFormData = z.infer<typeof messageFormSchema>;

export const MessageFormPage = () => {
  const { playerId: routePlayerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moderationError, setModerationError] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'none' | 'emoji' | 'gif' | 'image'>('none');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [selectedGif, setSelectedGif] = useState<GifResult | null>(null);
  const [gifQuery, setGifQuery] = useState('england football celebration');

  const player = routePlayerId ? getPlayerById(routePlayerId) : undefined;

  const {
    results: gifResults,
    isLoading: isGifLoading,
    error: gifError,
    searchGifs,
    clearError: clearGifError,
  } = useGifSearch();

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      playerId: routePlayerId || '',
      fanName: '',
      messageText: '',
      font: 'inter',
      textColor: '#1D1160',
      backgroundColor: '#FFFFFF',
      fontSize: 'medium',
    },
  });

  const watchedValues = form.watch();
  const messageLength = watchedValues.messageText?.length || 0;

  const textColors = [
    { name: 'England Navy', value: '#1D1160' },
    { name: 'England Red', value: '#CE1126' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#6B7280' },
  ];

  const backgroundColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Light Blue', value: '#F0F9FF' },
    { name: 'Light Red', value: '#FFF5F5' },
    { name: 'Light Gray', value: '#F5F5F5' },
  ];

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
  };

  const handleMediaTypeChange = (value: 'none' | 'emoji' | 'gif' | 'image') => {
    setMediaType(value);

    if (value !== 'emoji') {
      setSelectedEmoji('');
    }

    if (value !== 'gif') {
      setSelectedGif(null);
    }
  };

  useEffect(() => {
    if (mediaType === 'gif' && gifResults.length === 0) {
      searchGifs(gifQuery);
    }
  }, [mediaType, gifResults.length, gifQuery, searchGifs]);

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    setModerationError(null);

    // Content moderation
    const moderationResult = moderateContent(data.messageText);
    if (!moderationResult.isClean) {
      setModerationError(getModerationMessage(moderationResult.reason));
      setIsSubmitting(false);
      return;
    }

    // Get player info
    const selectedPlayer = getPlayerById(data.playerId);
    if (!selectedPlayer) {
      setModerationError('Invalid player selected');
      setIsSubmitting(false);
      return;
    }

    // Create media object if applicable
    let media: MessageMedia | undefined;
    if (mediaType === 'emoji' && selectedEmoji) {
      media = { type: 'emoji', emoji: selectedEmoji };
    } else if (mediaType === 'gif' && selectedGif) {
      media = {
        type: 'gif',
        url: selectedGif.url,
        originalUrl: selectedGif.fullUrl,
        attribution: selectedGif.attribution,
        provider: selectedGif.provider,
        license: selectedGif.license,
        licenseUrl: selectedGif.licenseUrl,
      };
    }

    // Create message object
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      playerId: data.playerId,
      playerName: selectedPlayer.name,
      fanName: data.fanName || 'Anonymous',
      messageText: data.messageText,
      timestamp: new Date(),
      styling: {
        font: data.font as FontStyle,
        textColor: data.textColor,
        backgroundColor: data.backgroundColor,
        fontSize: data.fontSize as FontSize,
      },
      media,
      isSessionMessage: true,
    };

    // Save to session storage
    saveMessage(message);

    // Navigate to donate page
    setIsSubmitting(false);
    navigate('/donate');
  };

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

  return (
    <div className="min-h-screen bg-england-blue">
      {/* Header Section */}
      <section className="bg-england-blue py-12 border-b-4 border-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <h1 className="text-4xl font-extrabold text-white uppercase mb-6 text-center tracking-tight">
              Send Your Message
            </h1>

            {/* Show player info if coming from player page */}
            {player && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <Avatar className="w-16 h-16 border-4 border-white">
                  <AvatarImage src={player.imageUrl} alt={player.name} />
                  <AvatarFallback className="bg-england-navy text-white">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-extrabold text-white uppercase">{player.name}</h2>
                  <p className="text-white font-bold uppercase text-sm">{player.position}</p>
                </div>
              </div>
            )}

            {/* POC Disclaimer */}
            <Alert className="bg-england-red border-0">
              <AlertDescription className="flex items-center justify-center gap-2 text-white">
                <span className="text-xl">⚠️</span>
                <span className="font-bold uppercase text-sm">
                  POC: Messages are stored in your browser session only and will be lost when you close this tab.
                </span>
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-england-blue py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="england-card bg-white p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Player Selection (if not from player page) */}
              {!routePlayerId && (
                <FormField
                  control={form.control}
                  name="playerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold uppercase text-england-navy">Select Player *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Choose a player" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {players.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name} - {p.position} (#{p.number})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Fan Name */}
              <FormField
                control={form.control}
                name="fanName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold uppercase text-england-navy">Your Name (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Anonymous"
                        {...field}
                        className="h-12 text-base"
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500">Leave blank to post anonymously</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Text */}
              <FormField
                control={form.control}
                name="messageText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold uppercase text-england-navy">Your Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message of support..."
                        {...field}
                        rows={5}
                        className="text-base resize-none"
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <p className={`text-sm ${messageLength > 500 ? 'text-red-500' : 'text-gray-500'}`}>
                        {messageLength}/500
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {/* Moderation Error */}
              {moderationError && (
                <Alert variant="destructive">
                  <AlertDescription>{moderationError}</AlertDescription>
                </Alert>
              )}

              {/* Customization Tabs */}
              <Card className="border-2 border-england-blue">
                <CardHeader className="bg-england-gray-50">
                  <CardTitle className="text-england-navy font-extrabold uppercase">Customize Your Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="style">
                    <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-england-gray-200">
                      <TabsTrigger value="style" className="font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">Style</TabsTrigger>
                      <TabsTrigger value="media" className="font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">Media</TabsTrigger>
                      <TabsTrigger value="preview" className="font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white">Preview</TabsTrigger>
                    </TabsList>

                    {/* Style Tab */}
                    <TabsContent value="style" className="space-y-6 mt-6">
                      {/* Font */}
                      <FormField
                        control={form.control}
                        name="font"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase text-england-navy">Font Style</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="inter" id="inter" className="peer sr-only" />
                                  <Label
                                    htmlFor="inter"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer font-sans"
                                  >
                                    Sans Serif
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="serif" id="serif" className="peer sr-only" />
                                  <Label
                                    htmlFor="serif"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer font-serif"
                                  >
                                    Serif
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="mono" id="mono" className="peer sr-only" />
                                  <Label
                                    htmlFor="mono"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer font-mono"
                                  >
                                    Monospace
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="playful" id="playful" className="peer sr-only" />
                                  <Label
                                    htmlFor="playful"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer font-sans tracking-wide"
                                  >
                                    Playful
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Font Size */}
                      <FormField
                        control={form.control}
                        name="fontSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase text-england-navy">Text Size</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div>
                                  <RadioGroupItem value="small" id="small" className="peer sr-only" />
                                  <Label
                                    htmlFor="small"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer text-sm"
                                  >
                                    Small
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="medium" id="medium" className="peer sr-only" />
                                  <Label
                                    htmlFor="medium"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer text-base"
                                  >
                                    Medium
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem value="large" id="large" className="peer sr-only" />
                                  <Label
                                    htmlFor="large"
                                    className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-[#1D1160] peer-data-[state=checked]:bg-[#1D1160]/5 cursor-pointer text-lg"
                                  >
                                    Large
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Text Color */}
                      <FormField
                        control={form.control}
                        name="textColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase text-england-navy">Text Color</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(value) => value && field.onChange(value)}
                                className="grid grid-cols-2 gap-4"
                              >
                                {textColors.map((color) => (
                                  <ToggleGroupItem
                                    key={color.value}
                                    value={color.value}
                                    className={cn(
                                      'h-auto justify-start gap-3 border-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-england-navy',
                                      'data-[state=on]:border-[#1D1160] data-[state=on]:bg-[#1D1160]/10'
                                    )}
                                  >
                                    <span
                                      className="h-8 w-8 rounded-full border border-england-gray-200"
                                      style={{ backgroundColor: color.value }}
                                    />
                                    {color.name}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Background Color */}
                      <FormField
                        control={form.control}
                        name="backgroundColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase text-england-navy">Background Color</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(value) => value && field.onChange(value)}
                                className="grid grid-cols-2 gap-4"
                              >
                                {backgroundColors.map((color) => (
                                  <ToggleGroupItem
                                    key={color.value}
                                    value={color.value}
                                    className={cn(
                                      'h-auto justify-start gap-3 border-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-england-navy',
                                      'data-[state=on]:border-[#1D1160] data-[state=on]:bg-[#1D1160]/10'
                                    )}
                                  >
                                    <span
                                      className="h-8 w-8 rounded-full border border-england-gray-200"
                                      style={{ backgroundColor: color.value }}
                                    />
                                    {color.name}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    {/* Media Tab */}
                    <TabsContent value="media" className="space-y-6 mt-6">
                      <div>
                        <Label className="mb-4 block font-bold uppercase text-england-navy">Add Media (Optional)</Label>
                        <RadioGroup value={mediaType} onValueChange={(value: any) => handleMediaTypeChange(value)} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="none" />
                            <Label htmlFor="none" className="cursor-pointer">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="emoji" id="emoji" />
                            <Label htmlFor="emoji" className="cursor-pointer">Emoji</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="gif" id="gif" />
                            <Label htmlFor="gif" className="cursor-pointer">GIF</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="image" id="image" disabled />
                            <Label htmlFor="image" className="cursor-pointer opacity-50">Image (Coming Soon)</Label>
                          </div>
                        </RadioGroup>

                        {mediaType === 'emoji' && (
                          <div className="mt-6">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full gap-2">
                                  <Smile className="w-4 h-4" />
                                  {selectedEmoji ? `Selected: ${selectedEmoji}` : 'Pick an Emoji'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0 border-0">
                                <EmojiPicker onEmojiClick={handleEmojiClick} width="100%" />
                              </PopoverContent>
                            </Popover>
                            {selectedEmoji && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-md text-center">
                                <div className="text-6xl mb-2">{selectedEmoji}</div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedEmoji('')}
                                >
                                  Clear
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {mediaType === 'gif' && (
                          <div className="mt-6 space-y-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              <div className="relative flex-1">
                                <Input
                                  value={gifQuery}
                                  onChange={(event) => {
                                    clearGifError();
                                    setGifQuery(event.target.value);
                                  }}
                                  placeholder="Search Openverse for celebratory GIFs..."
                                  className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-england-gray-500" />
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => searchGifs(gifQuery)}
                                disabled={isGifLoading}
                                className="whitespace-nowrap"
                              >
                                {isGifLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Searching...
                                  </>
                                ) : (
                                  'Search GIFs'
                                )}
                              </Button>
                            </div>

                            <p className="text-xs text-england-gray-600">
                              Powered by the Openverse API (Creative Commons media). We only show GIFs under open licenses.
                            </p>

                            {gifError && (
                              <Alert variant="destructive">
                                <AlertDescription>{gifError}</AlertDescription>
                              </Alert>
                            )}

                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                              {gifResults.map((gif) => {
                                const isSelected = selectedGif?.id === gif.id;

                                return (
                                  <button
                                    key={gif.id}
                                    type="button"
                                    onClick={() => setSelectedGif(isSelected ? null : gif)}
                                    className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                                      isSelected
                                        ? 'border-england-blue ring-2 ring-england-blue/40'
                                        : 'border-transparent hover:border-england-blue/40'
                                    }`}
                                  >
                                    <img
                                      src={gif.url}
                                      alt={gif.title}
                                      className="h-32 w-full object-cover"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <span className="absolute bottom-2 left-2 right-2 line-clamp-2 text-left text-xs font-medium text-white drop-shadow">
                                      {gif.title || 'Untitled GIF'}
                                    </span>
                                    {isSelected && (
                                      <span className="absolute top-2 left-2 rounded-full bg-white px-2 py-0.5 text-[0.6rem] font-semibold uppercase text-england-blue">
                                        Selected
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {gifResults.length === 0 && !isGifLoading && !gifError && (
                              <div className="rounded-xl border border-dashed border-england-gray-300 p-6 text-center text-sm text-england-gray-600">
                                Try refining your search to find a great GIF.
                              </div>
                            )}

                            {selectedGif && (
                              <div className="rounded-xl border border-england-blue/30 bg-england-blue/5 p-4 text-sm text-england-blue">
                                <p className="font-semibold uppercase text-xs tracking-[0.2em] text-england-blue/70 mb-2">
                                  Selected GIF
                                </p>
                                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                  <img
                                    src={selectedGif.url}
                                    alt={selectedGif.title}
                                    className="h-24 w-24 rounded-lg object-cover"
                                  />
                                  <div className="flex-1 space-y-1">
                                    <p className="font-semibold">{selectedGif.title}</p>
                                    {selectedGif.attribution && (
                                      <p className="text-xs text-england-blue/80">{selectedGif.attribution}</p>
                                    )}
                                    {selectedGif.license && (
                                      <p className="text-xs text-england-blue/60">
                                        License: {selectedGif.license.toUpperCase()}{' '}
                                        {selectedGif.licenseUrl && (
                                          <a
                                            href={selectedGif.licenseUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                          >
                                            View terms
                                          </a>
                                        )}
                                      </p>
                                    )}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedGif(null)}
                                    className="self-start md:self-center"
                                  >
                                    Clear selection
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    {/* Preview Tab */}
                    <TabsContent value="preview" className="mt-6">
                      <div className="p-6 border-2 border-england-blue bg-england-gray-50">
                        <h3 className="text-sm font-bold uppercase text-england-navy mb-4">Live Preview</h3>
                        <Card className="england-card" style={{ backgroundColor: watchedValues.backgroundColor }}>
                          <CardContent className="p-6">
                            <p className="font-semibold text-sm mb-3" style={{ color: watchedValues.textColor }}>
                              {watchedValues.fanName || 'Anonymous'}
                            </p>
                            <p
                              className={`mb-4 ${getFontClass(watchedValues.font as FontStyle)} ${getFontSize(watchedValues.fontSize as FontSize)}`}
                              style={{ color: watchedValues.textColor }}
                            >
                              {watchedValues.messageText || 'Your message will appear here...'}
                            </p>
                            {mediaType === 'emoji' && selectedEmoji && (
                              <div className="text-4xl mb-4">{selectedEmoji}</div>
                            )}
                            {mediaType === 'gif' && selectedGif && (
                              <div className="mb-4 overflow-hidden rounded-2xl border border-england-blue/20">
                                <img
                                  src={selectedGif.url}
                                  alt={selectedGif.title}
                                  className="w-full max-h-64 object-cover"
                                />
                              </div>
                            )}
                            <p className="text-xs opacity-70" style={{ color: watchedValues.textColor }}>
                              Just now
                            </p>
                            {mediaType === 'gif' && selectedGif?.attribution && (
                              <p className="mt-2 text-[0.6rem] uppercase tracking-wider text-england-gray-600">
                                {selectedGif.attribution}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="england-button-primary w-full md:w-auto px-12 py-6 text-lg h-auto uppercase font-extrabold tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    'SEND YOUR SUPPORT'
                  )}
                </Button>
              </div>
            </form>
          </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
