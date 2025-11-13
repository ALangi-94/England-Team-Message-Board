import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getSessionMessageCount } from '@/utils/sessionStorage';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setMessageCount(getSessionMessageCount());
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('messageAdded', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('messageAdded', updateCount);
    };
  }, [location]);

  const navItems = useMemo(
    () => [
      {
        label: 'HOME',
        href: '/',
        isActive: location.pathname === '/',
      },
      {
        label: 'PLAYERS',
        href: '/players',
        isActive:
          location.pathname === '/players' || location.pathname.startsWith('/player'),
      },
    ],
    [location.pathname]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-england-gray-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-3">
          <div className="flex flex-1">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-england-blue/5"
            >
              <img
                src="https://logos-world.net/wp-content/uploads/2020/07/England-Logo.png"
                alt="England Football Association logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-extrabold uppercase tracking-tight text-england-navy">
                ENGLAND MESSAGE WALL
              </span>
            </Link>
          </div>

          <NavigationMenu className="hidden flex-1 justify-center md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition',
                        item.isActive
                          ? 'bg-england-red text-white shadow-sm'
                          : 'text-england-navy hover:bg-england-blue/10 hover:text-england-red'
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex flex-1 items-center justify-end gap-3">
            {messageCount > 0 && (
              <Badge className="bg-england-red text-xs font-bold uppercase tracking-wide text-white hover:bg-england-red">
                {messageCount} {messageCount === 1 ? 'MESSAGE' : 'MESSAGES'}
              </Badge>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-england-navy hover:bg-england-blue/10 md:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white" side="right">
                <SheetHeader>
                  <SheetTitle>Navigate</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant={item.isActive ? 'default' : 'ghost'}
                      className={cn(
                        'justify-start text-sm font-bold uppercase tracking-wide',
                        item.isActive
                          ? 'bg-england-red text-white hover:bg-england-red/90'
                          : 'text-england-navy hover:bg-england-blue/10 hover:text-england-red'
                      )}
                    >
                      <Link to={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
