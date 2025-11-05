import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Paintbrush, ImagePlus, Heart } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* POC Disclaimer */}
      <div className="bg-england-red">
        <div className="container mx-auto px-4 py-4">
          <Alert className="bg-england-red border-0">
            <AlertDescription className="flex items-center justify-center gap-2 text-white">
              <span className="text-xl">⚠️</span>
              <span className="font-bold uppercase text-sm">DEMO VERSION: This is a proof-of-concept. Messages are not saved permanently.</span>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-england-blue py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-white uppercase mb-6 tracking-tight"
            >
              Send Your Support to the Three Lions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto"
            >
              Join thousands of fans sending messages of encouragement to our England players
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/players">
                <Button
                  size="lg"
                  className="england-button-primary text-xl px-12 py-8 h-auto uppercase font-extrabold tracking-wide"
                >
                  START WRITING
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-england-blue py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full england-card bg-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-england-blue flex items-center justify-center mb-4 mx-auto">
                    <Paintbrush className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center text-england-navy font-extrabold uppercase">Personalize Your Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base text-england-gray-700">
                    Choose from custom fonts, colors, and text sizes to make your message stand out
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full england-card bg-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-england-red flex items-center justify-center mb-4 mx-auto">
                    <ImagePlus className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center text-england-navy font-extrabold uppercase">Express Yourself</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base text-england-gray-700">
                    Add emojis, GIFs, and images to make your support message truly memorable
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full england-card bg-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-england-blue flex items-center justify-center mb-4 mx-auto">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-center text-england-navy font-extrabold uppercase">Support Mental Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base text-england-gray-700">
                    Optional opportunity to donate to MIND charity supporting mental health in football
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Additional CTA */}
      <section className="bg-england-blue py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-2xl mx-auto england-card bg-white p-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-england-navy mb-4 uppercase">Ready to Show Your Support?</h2>
            <p className="text-lg mb-8 text-england-gray-700">
              Choose a player and send them a message of encouragement today
            </p>
            <Link to="/players">
              <Button
                size="lg"
                className="england-button-secondary text-lg px-10 py-6 h-auto uppercase font-extrabold tracking-wide"
              >
                VIEW ALL PLAYERS
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
