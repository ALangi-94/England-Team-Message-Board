import { Separator } from '@/components/ui/separator';
import { AlertCircle, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-england-navy border-t-4 border-england-blue mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* POC Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 text-england-blue" />
              <h3 className="text-white font-extrabold uppercase text-sm">
                PROOF OF CONCEPT
              </h3>
            </div>
            <p className="text-england-gray-300 text-sm leading-relaxed">
              This is a demonstration application. Not affiliated with The FA or England Football.
              Messages are stored in your browser session only.
            </p>
          </div>

          {/* MIND Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-4 w-4 text-england-red" />
              <h3 className="text-white font-extrabold uppercase text-sm">
                MENTAL HEALTH
              </h3>
            </div>
            <p className="text-england-gray-300 text-sm leading-relaxed mb-3">
              This concept supports MIND, the mental health charity. Mental health matters in
              football and beyond.
            </p>
            <a
              href="https://www.mind.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-england-red hover:underline font-bold text-sm uppercase inline-flex items-center gap-1 transition-all"
            >
              VISIT MIND →
            </a>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-white font-extrabold uppercase text-sm mb-4">
              ABOUT THIS PROJECT
            </h3>
            <p className="text-england-gray-300 text-sm leading-relaxed">
              Inspired by physical message walls like the one created for Bukayo Saka at Arsenal.
              A digital space for fans to send encouragement to England players.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-england-blue opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-england-gray-400 text-xs uppercase tracking-wide">
            © 2024 ENGLAND MESSAGE WALL - POC
          </p>
          <p className="text-england-gray-400 text-xs uppercase tracking-wide">
            REACT • TYPESCRIPT • SHADCN/UI
          </p>
        </div>
      </div>
    </footer>
  );
};
