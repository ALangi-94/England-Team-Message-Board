import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getSessionMessageCount } from '@/utils/sessionStorage';
import { useEffect, useState } from 'react';

export const Header = () => {
  const location = useLocation();
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // Update message count on route change or storage events
    const updateCount = () => {
      setMessageCount(getSessionMessageCount());
    };

    updateCount();

    // Listen for storage events
    window.addEventListener('storage', updateCount);

    // Custom event for when messages are added in the same tab
    window.addEventListener('messageAdded', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('messageAdded', updateCount);
    };
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-england-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Shield className="h-8 w-8 text-england-blue" />
            <div className="font-extrabold text-england-navy text-lg uppercase tracking-tight">
              ENGLAND MESSAGE WALL
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-bold uppercase text-sm transition-colors border-b-3 pb-0.5 ${
                isActive('/')
                  ? 'text-england-navy border-england-red'
                  : 'text-england-navy border-transparent hover:text-england-red'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/players"
              className={`font-bold uppercase text-sm transition-colors border-b-3 pb-0.5 ${
                isActive('/players') || location.pathname.startsWith('/player')
                  ? 'text-england-navy border-england-red'
                  : 'text-england-navy border-transparent hover:text-england-red'
              }`}
            >
              PLAYERS
            </Link>
          </nav>

          {/* Session Message Count Badge */}
          {messageCount > 0 && (
            <Badge className="bg-england-red text-white font-bold uppercase text-xs px-3 py-1 hover:bg-england-red">
              {messageCount} {messageCount === 1 ? 'MESSAGE' : 'MESSAGES'}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
};
