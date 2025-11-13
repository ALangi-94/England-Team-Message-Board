import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { players } from '@/data/players';
import { syntheticMessages } from '@/data/syntheticMessages';
import { getSessionMessages } from '@/utils/sessionStorage';

export const PlayersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('All');

  // Get message counts for each player
  const getMessageCount = (playerId: string): number => {
    const syntheticCount = syntheticMessages.filter(msg => msg.playerId === playerId).length;
    const sessionCount = getSessionMessages().filter(msg => msg.playerId === playerId).length;
    return syntheticCount + sessionCount;
  };

  // Filter and search players
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
      return matchesSearch && matchesPosition;
    });
  }, [searchQuery, selectedPosition]);

  const positions: Array<string> = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  return (
    <div className="min-h-screen bg-england-blue">
      {/* Header Section */}
      <section className="bg-england-blue py-12 border-b-4 border-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase mb-4 tracking-tight">
              Choose Your Player
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Select a player to view their message wall or send them your support
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-england-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="SEARCH PLAYERS BY NAME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-0 bg-white focus:ring-2 focus:ring-england-red font-bold placeholder:text-england-gray-400 uppercase"
              />
            </div>
          </motion.div>

          {/* Position Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Tabs value={selectedPosition} onValueChange={setSelectedPosition}>
              <TabsList className="grid w-full grid-cols-5 h-auto bg-white">
                {positions.map((position) => (
                  <TabsTrigger
                    key={position}
                    value={position}
                    className="py-3 text-base font-bold uppercase data-[state=active]:bg-england-blue data-[state=active]:text-white"
                  >
                    {position}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="bg-england-blue py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {filteredPlayers.map((player, index) => {
              const messageCount = getMessageCount(player.id);

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full england-card flex flex-col">
                    <CardHeader className="text-center flex flex-col items-center gap-3 min-h-[260px]">
                      <div className="relative mx-auto mb-4">
                        <Avatar className="w-24 h-24 border-4 border-england-gray-200">
                          <AvatarImage src={player.imageUrl} alt={player.name} />
                          <AvatarFallback className="text-2xl font-bold bg-england-blue text-white">
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 flex items-center justify-center text-white font-bold border-4 border-white shadow-md bg-england-red">
                          {player.number}
                        </div>
                      </div>
                      <h3 className="text-xl font-extrabold text-england-navy uppercase">{player.name}</h3>
                      <p className="text-sm text-england-gray-700 font-bold uppercase">{player.position}</p>
                    </CardHeader>
                    <CardContent className="flex flex-1 items-center justify-center text-center">
                      <Badge className="text-sm px-3 py-1 bg-england-red text-white font-bold uppercase">
                        {messageCount} {messageCount === 1 ? 'message' : 'messages'}
                      </Badge>
                    </CardContent>
                    <CardFooter className="flex w-full flex-col gap-3 pt-0">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-2 border-england-blue text-england-blue hover:bg-england-blue hover:text-white transition-all duration-300 font-bold uppercase"
                      >
                        <Link to={`/player/${player.id}`}>View Messages</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-england-red text-white hover:bg-england-red/90 transition-all duration-300 font-bold uppercase"
                      >
                        <Link to={`/player/${player.id}/submit`}>Add Message</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Results */}
          {filteredPlayers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="england-card bg-white p-12 max-w-lg mx-auto">
                <p className="text-xl text-england-navy font-bold uppercase">No players found matching your search.</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
