import { Message } from '@/types';

// Helper function to generate a message
const createMessage = (
  id: string,
  playerId: string,
  playerName: string,
  fanName: string,
  messageText: string,
  hoursAgo: number,
  styling: Message['styling'],
  media?: Message['media']
): Message => {
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() - hoursAgo);

  return {
    id,
    playerId,
    playerName,
    fanName,
    messageText,
    timestamp,
    styling,
    media,
    isSessionMessage: false,
  };
};

export const syntheticMessages: Message[] = [
  // Harry Kane messages (most popular)
  createMessage(
    'msg-1',
    'kane-9',
    'Harry Kane',
    'Thomas M.',
    'Captain, leader, legend. Bring it home! 🏴󠁧󠁢󠁥󠁮󠁧󠁿⚽',
    2,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-2',
    'kane-9',
    'Harry Kane',
    'Sarah P.',
    "Harry, you're the best striker in the world. Show them what you're made of!",
    5,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-3',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'My son idolizes you. Every goal you score makes his day. Thank you for being such a great role model.',
    12,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-4',
    'kane-9',
    'Harry Kane',
    'James W.',
    "Leading from the front since day one. That's our captain! 👊",
    8,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '👊' }
  ),
  createMessage(
    'msg-5',
    'kane-9',
    'Harry Kane',
    'Emma L.',
    'The whole nation is behind you, Harry! Make us proud! 🦁',
    1,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🦁' }
  ),

  // Bukayo Saka messages (very popular)
  createMessage(
    'msg-6',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    "Bukayo, you're an inspiration to millions. Keep shining! ✨",
    3,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-7',
    'saka-7',
    'Bukayo Saka',
    'Adeola O.',
    'From North London to the world stage. You make us all so proud, Bukayo!',
    6,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-8',
    'saka-7',
    'Bukayo Saka',
    'Oliver C.',
    'Saka, my 7-year-old wears your shirt every single day. You are his hero! Thank you for being you.',
    24,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-9',
    'saka-7',
    'Bukayo Saka',
    'Charlotte R.',
    'What you went through in the Euros showed your true character. We love you! ❤️',
    15,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '❤️' }
  ),
  createMessage(
    'msg-10',
    'saka-7',
    'Bukayo Saka',
    'Marcus T.',
    "You're not just a great player, you're a great person. Keep being brilliant! 🌟",
    4,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🌟' }
  ),

  // Jude Bellingham messages
  createMessage(
    'msg-11',
    'bellingham-10',
    'Jude Bellingham',
    'David H.',
    'Jude, watching you play is pure magic. The future is bright! 🌟',
    7,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌟' }
  ),
  createMessage(
    'msg-12',
    'bellingham-10',
    'Jude Bellingham',
    'Rebecca M.',
    "From Birmingham to Real Madrid to England's talisman. You're living the dream and inspiring us all!",
    10,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-13',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'The composure and maturity you show at your age is incredible. England is lucky to have you!',
    18,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-14',
    'bellingham-10',
    'Jude Bellingham',
    'Tyler G.',
    'Number 10 on your back and the world at your feet. Show them what you can do! 💪',
    5,
    { font: 'mono', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '💪' }
  ),

  // Declan Rice messages
  createMessage(
    'msg-15',
    'rice-4',
    'Declan Rice',
    'Anonymous',
    'Declan Rice - the heart of the team. We believe in you!',
    9,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-16',
    'rice-4',
    'Declan Rice',
    'Michelle K.',
    'The way you command the midfield is poetry in motion. Keep doing what you do best!',
    14,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-17',
    'rice-4',
    'Declan Rice',
    'Alex P.',
    "You're the anchor that holds everything together. Much respect! ⚓",
    3,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚓' }
  ),

  // Phil Foden messages
  createMessage(
    'msg-18',
    'foden-11',
    'Phil Foden',
    'Simon R.',
    'The Stockport Iniesta! Make Manchester and England proud, Phil! 🔵',
    6,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-19',
    'foden-11',
    'Phil Foden',
    'Anonymous',
    "Your creativity and skill are unmatched. Let's see that magic on the big stage!",
    11,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-20',
    'foden-11',
    'Phil Foden',
    'Laura B.',
    'Watching you play for England is a privilege. Keep shining, Phil! ✨',
    20,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '✨' }
  ),

  // Jordan Pickford messages
  createMessage(
    'msg-21',
    'pickford-1',
    'Jordan Pickford',
    'Daniel F.',
    "Safe hands, brave heart. That's our Pickford! 🧤",
    4,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧤' }
  ),
  createMessage(
    'msg-22',
    'pickford-1',
    'Jordan Pickford',
    'Anonymous',
    'The passion you show between the sticks gives us all goosebumps. Keep it up!',
    13,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' }
  ),
  createMessage(
    'msg-23',
    'pickford-1',
    'Jordan Pickford',
    'Katie W.',
    'Every save you make, every game you command - you make England proud!',
    22,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // John Stones messages
  createMessage(
    'msg-24',
    'stones-5',
    'John Stones',
    'Anonymous',
    'Composed, elegant, commanding. The perfect defender!',
    8,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-25',
    'stones-5',
    'John Stones',
    'Peter M.',
    'Your leadership at the back gives everyone confidence. Thank you, John!',
    16,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Kyle Walker messages
  createMessage(
    'msg-26',
    'walker-2',
    'Kyle Walker',
    'Emily S.',
    'Lightning fast and solid as a rock. What a defender! ⚡',
    5,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚡' }
  ),
  createMessage(
    'msg-27',
    'walker-2',
    'Kyle Walker',
    'Anonymous',
    'Experience, pace, and heart. Keep showing them how it\'s done, Kyle!',
    12,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Marcus Rashford messages
  createMessage(
    'msg-28',
    'rashford-19',
    'Marcus Rashford',
    'Jasmine L.',
    "Marcus, you're a hero on and off the pitch. Your work for children is inspiring!",
    10,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-29',
    'rashford-19',
    'Marcus Rashford',
    'Anonymous',
    'From feeding children to scoring goals for England. You are the real MVP! 👏',
    7,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '👏' }
  ),
  createMessage(
    'msg-30',
    'rashford-19',
    'Marcus Rashford',
    'William J.',
    'That pace, that finishing, that heart. Show the world what Marcus Rashford can do!',
    19,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Jack Grealish messages
  createMessage(
    'msg-31',
    'grealish-17',
    'Jack Grealish',
    'Sophie T.',
    'Jack, your flair and confidence light up every match! Keep entertaining us! ✨',
    6,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-32',
    'grealish-17',
    'Jack Grealish',
    'Anonymous',
    'The way you glide past defenders is mesmerizing. Go on, Jack!',
    14,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Mason Mount messages
  createMessage(
    'msg-33',
    'mount-8',
    'Mason Mount',
    'Christopher D.',
    'Mason, your work rate and creativity are second to none! Keep going! 💪',
    9,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-34',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'From Cobham to England - you make us all proud, Mase!',
    17,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Raheem Sterling messages
  createMessage(
    'msg-35',
    'sterling-20',
    'Raheem Sterling',
    'Anonymous',
    "Raheem, you've been there, done it, and won it all. Time to add international glory!",
    11,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-36',
    'sterling-20',
    'Raheem Sterling',
    'Hannah C.',
    'Your experience and goals when it matters most - that\'s what we need! 🎯',
    5,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),

  // Trent Alexander-Arnold messages
  createMessage(
    'msg-37',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Matthew B.',
    'Those assists, those crosses, those free kicks - pure class! 🎯',
    8,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-38',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Anonymous',
    "You're more than a defender, you're a playmaker. Show them your quality!",
    15,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Luke Shaw messages
  createMessage(
    'msg-39',
    'shaw-23',
    'Luke Shaw',
    'Grace M.',
    'Luke, your comeback story is inspirational. Keep fighting! 💪',
    12,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-40',
    'shaw-23',
    'Luke Shaw',
    'Anonymous',
    'Solid at the back, dangerous going forward. That\'s our Luke Shaw!',
    20,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' }
  ),

  // Harry Maguire messages
  createMessage(
    'msg-41',
    'maguire-6',
    'Harry Maguire',
    'Richard K.',
    "Harry, you've shown incredible resilience. England needs your leadership!",
    9,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-42',
    'maguire-6',
    'Harry Maguire',
    'Anonymous',
    'Your presence in the box is commanding. Keep your head high! 🦁',
    18,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🦁' }
  ),

  // Jordan Henderson messages
  createMessage(
    'msg-43',
    'henderson-21',
    'Jordan Henderson',
    'Anonymous',
    'Leadership, experience, passion. Thank you for everything, Hendo! 🙌',
    7,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🙌' }
  ),
  createMessage(
    'msg-44',
    'henderson-21',
    'Jordan Henderson',
    'Victoria P.',
    'Your voice in the dressing room is invaluable. Keep inspiring the young lads!',
    13,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Kieran Trippier messages
  createMessage(
    'msg-45',
    'trippier-12',
    'Kieran Trippier',
    'Benjamin W.',
    'Trips, your delivery from the right is world class! 🎯',
    10,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-46',
    'trippier-12',
    'Kieran Trippier',
    'Anonymous',
    'Consistency and quality every single game. What a professional!',
    16,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Kalvin Phillips messages
  createMessage(
    'msg-47',
    'phillips-14',
    'Kalvin Phillips',
    'Anonymous',
    'The Yorkshire Pirlo! Keep breaking up play and distributing like a boss! ⚽',
    8,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-48',
    'phillips-14',
    'Kalvin Phillips',
    'Rachel N.',
    'Kalvin, your work ethic is second to none. Keep fighting for every ball!',
    21,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Conor Gallagher messages
  createMessage(
    'msg-49',
    'gallagher-15',
    'Conor Gallagher',
    'Anonymous',
    'Energy, commitment, quality. You bring it all, Conor! 💪',
    6,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-50',
    'gallagher-15',
    'Conor Gallagher',
    'Oliver H.',
    'Your journey to the England squad is inspiring. Show them what you can do!',
    14,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Ollie Watkins messages
  createMessage(
    'msg-51',
    'watkins-16',
    'Ollie Watkins',
    'Anonymous',
    'Ollie, your finishing is clinical! Grab your chance when it comes! 🎯',
    11,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-52',
    'watkins-16',
    'Ollie Watkins',
    'Sophie L.',
    'From non-league to England! What a journey. Keep believing!',
    19,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Ivan Toney messages
  createMessage(
    'msg-53',
    'toney-18',
    'Ivan Toney',
    'Anonymous',
    'Ivan, your comeback story is incredible. Show them what you\'re made of! 💪',
    9,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-54',
    'toney-18',
    'Ivan Toney',
    'James R.',
    'Penalty specialist, goal scorer, fighter. England is lucky to have you!',
    17,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' }
  ),

  // Nick Pope messages
  createMessage(
    'msg-55',
    'pope-13',
    'Nick Pope',
    'Anonymous',
    'Nick, your shot-stopping is world class! Keep those clean sheets coming! 🧤',
    12,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧤' }
  ),
  createMessage(
    'msg-56',
    'pope-13',
    'Nick Pope',
    'Claire T.',
    'Commanding, confident, capable. That\'s our Nick Pope!',
    20,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),

  // Aaron Ramsdale messages
  createMessage(
    'msg-57',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Anonymous',
    'Aaron, your energy and enthusiasm are infectious! Keep pushing! 🙌',
    8,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🙌' }
  ),
  createMessage(
    'msg-58',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Michael B.',
    'Young, brave, and talented. The future looks bright with you!',
    15,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),

  // Additional varied messages across all players
  createMessage(
    'msg-59',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'From a young fan: Harry, you are my hero! Never stop believing! Every time you score, I celebrate like crazy in my living room. Thank you for everything!',
    25,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'small' }
  ),
  createMessage(
    'msg-60',
    'saka-7',
    'Bukayo Saka',
    'David K.',
    'Saka, my daughter wants to play football because of you. You\'re changing lives! ⚽👧',
    28,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-61',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    "You're only 20 and already one of the best in the world. The sky is the limit! 🚀",
    4,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🚀' }
  ),
  createMessage(
    'msg-62',
    'foden-11',
    'Phil Foden',
    'Lisa R.',
    'Phil, every touch you make is magical. England is blessed to have you!',
    11,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-63',
    'rice-4',
    'Declan Rice',
    'Anonymous',
    'The engine room of England. Keep driving us forward, Dec! 🔥',
    7,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🔥' }
  ),
  createMessage(
    'msg-64',
    'pickford-1',
    'Jordan Pickford',
    'George F.',
    'That penalty shootout save still gives me goosebumps. Do it again! 🧤',
    13,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧤' }
  ),
  createMessage(
    'msg-65',
    'walker-2',
    'Kyle Walker',
    'Anonymous',
    'Still one of the fastest players in the world. Age is just a number! ⚡',
    16,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '⚡' }
  ),
  createMessage(
    'msg-66',
    'stones-5',
    'John Stones',
    'Patricia M.',
    'Your ball-playing ability from the back is a joy to watch. Keep it up!',
    19,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' }
  ),
  createMessage(
    'msg-67',
    'rashford-19',
    'Marcus Rashford',
    'Anonymous',
    "Marcus, you're proof that footballers can make a real difference in the world. Respect! 👏",
    5,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '👏' }
  ),
  createMessage(
    'msg-68',
    'grealish-17',
    'Jack Grealish',
    'Tom S.',
    'Super Jack! Your dribbling gets me off my seat every time! 🎨',
    9,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎨' }
  ),
  createMessage(
    'msg-69',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'The tireless runner, the creative spark. Keep shining, Mason! ✨',
    14,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-70',
    'sterling-20',
    'Raheem Sterling',
    'Helen W.',
    'Big game player! Show them why you\'re still one of the best!',
    21,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-71',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Anonymous',
    'TAA, your passing range is incredible! Keep pinging those balls! 🎯',
    6,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-72',
    'shaw-23',
    'Luke Shaw',
    'Andrew P.',
    'Luke, your overlapping runs down the left are terrifying for defenders! 🏃',
    12,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🏃' }
  ),
  createMessage(
    'msg-73',
    'maguire-6',
    'Harry Maguire',
    'Anonymous',
    "Don't listen to the doubters. You're a quality defender and we back you! 💪",
    18,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-74',
    'henderson-21',
    'Jordan Henderson',
    'Margaret L.',
    'Jordan, your leadership won Liverpool the league and Champions League. Help England do the same!',
    10,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' }
  ),
  createMessage(
    'msg-75',
    'trippier-12',
    'Kieran Trippier',
    'Anonymous',
    'That World Cup semi-final free kick! Give us another moment like that! 🎯',
    15,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),

  // More messages for popular players
  createMessage(
    'msg-76',
    'kane-9',
    'Harry Kane',
    'Isabella C.',
    'Harry, you deserve to win a trophy with England. This is your time! 🏆',
    3,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🏆' }
  ),
  createMessage(
    'msg-77',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    'From Hale End to England star. The Arsenal academy produced a gem! 💎',
    8,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💎' }
  ),
  createMessage(
    'msg-78',
    'bellingham-10',
    'Jude Bellingham',
    'Ryan M.',
    'Jude, you play with the confidence of a 30-year-old veteran. Unbelievable talent! 🌟',
    5,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌟' }
  ),
  createMessage(
    'msg-79',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'My granddad, dad, and I all support you. Three generations of Kane fans! 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    26,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-80',
    'foden-11',
    'Phil Foden',
    'Jessica H.',
    'Phil, your left foot is a wand! Cast some magic for England! ✨',
    11,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),

  // Messages for less featured players
  createMessage(
    'msg-81',
    'phillips-14',
    'Kalvin Phillips',
    'Anonymous',
    'Your defensive awareness is crucial. Keep protecting that back line! 🛡️',
    13,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🛡️' }
  ),
  createMessage(
    'msg-82',
    'gallagher-15',
    'Conor Gallagher',
    'Paul D.',
    'Conor, your box-to-box energy is exactly what England needs! 🔥',
    9,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🔥' }
  ),
  createMessage(
    'msg-83',
    'watkins-16',
    'Ollie Watkins',
    'Anonymous',
    'Ollie, you\'ve earned your place. Now take your chance! ⚽',
    17,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-84',
    'toney-18',
    'Ivan Toney',
    'Sarah J.',
    'From setbacks to the England squad. Your resilience is admirable, Ivan!',
    20,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-85',
    'pope-13',
    'Nick Pope',
    'Anonymous',
    'Nick, you\'re one of the best shot-stoppers in the world. Believe it! 🧤',
    14,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧤' }
  ),
  createMessage(
    'msg-86',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Daniel W.',
    'Aaron, your distribution and sweeping are top class! Keep it up! 👊',
    22,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '👊' }
  ),

  // More heartfelt messages
  createMessage(
    'msg-87',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    'Dear Bukayo, my son cried when you missed that penalty, not because you missed, but because people were mean to you. He wanted me to tell you he loves you. We all do. ❤️',
    30,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '❤️' }
  ),
  createMessage(
    'msg-88',
    'kane-9',
    'Harry Kane',
    'Robert F.',
    'Harry, I\'ve watched England for 50 years. You\'re the best striker we\'ve ever had. Thank you for the memories and here\'s to many more! 🦁',
    27,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🦁' }
  ),
  createMessage(
    'msg-89',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'Jude, you make me proud to be English. Your humility matches your talent. Keep being you! 🌟',
    6,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌟' }
  ),
  createMessage(
    'msg-90',
    'pickford-1',
    'Jordan Pickford',
    'Caroline S.',
    'Jordan, your passion and fight embody what it means to wear the Three Lions! 🦁🦁🦁',
    4,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🦁' }
  ),

  // Additional messages for variety
  createMessage(
    'msg-91',
    'rice-4',
    'Declan Rice',
    'Anonymous',
    'Dec, you shield that defense like a boss. Unsung hero! 🛡️',
    12,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🛡️' }
  ),
  createMessage(
    'msg-92',
    'rashford-19',
    'Marcus Rashford',
    'Emily R.',
    'Marcus, you gave a voice to millions of children. Now give them a trophy to celebrate! 🏆',
    16,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🏆' }
  ),
  createMessage(
    'msg-93',
    'stones-5',
    'John Stones',
    'Anonymous',
    'Barnsley to Barcelona comparisons! Keep showing your class, John! 💎',
    19,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💎' }
  ),
  createMessage(
    'msg-94',
    'grealish-17',
    'Jack Grealish',
    'Nathan P.',
    'Jack, you draw fouls like no one else. Keep them defenders on toast! 🔥',
    7,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🔥' }
  ),
  createMessage(
    'msg-95',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'Mason, your passing range and vision are exceptional! Create that magic! ✨',
    23,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-96',
    'sterling-20',
    'Raheem Sterling',
    'Victoria B.',
    'Raheem, you scored the goals that got us to the Euros final. Do it again! ⚽',
    10,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-97',
    'walker-2',
    'Kyle Walker',
    'Anonymous',
    'Kyle, you make defending look easy. That recovery pace is incredible! ⚡',
    14,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚡' }
  ),
  createMessage(
    'msg-98',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Chris M.',
    'Trent, corner taken quickly... give us more moments like that! 🎯',
    18,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-99',
    'shaw-23',
    'Luke Shaw',
    'Anonymous',
    'Luke, that Euros final goal was special. Score more like that! 🚀',
    25,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🚀' }
  ),
  createMessage(
    'msg-100',
    'foden-11',
    'Phil Foden',
    'Lauren K.',
    'Phil, you\'re the most naturally gifted English player I\'ve ever seen. Wow! 🌟',
    5,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🌟' }
  ),

  // Continue with more messages...
  createMessage(
    'msg-101',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'Golden Boot winner, record breaker, England legend. Add international silverware to that list! 🏆',
    2,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🏆' }
  ),
  createMessage(
    'msg-102',
    'saka-7',
    'Bukayo Saka',
    'Mohammed A.',
    'Bukayo represents the best of us. Talent, humility, and heart! 💙',
    9,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '💙' }
  ),
  createMessage(
    'msg-103',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'Jude, you\'re already a leader at 20. Imagine what you\'ll achieve! 🚀',
    8,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🚀' }
  ),
  createMessage(
    'msg-104',
    'pickford-1',
    'Jordan Pickford',
    'Steve T.',
    'That Colombia penalty shootout! You\'re a hero, Picks! 🧤',
    15,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🧤' }
  ),
  createMessage(
    'msg-105',
    'rice-4',
    'Declan Rice',
    'Anonymous',
    'Declan, you make the difficult look easy. That\'s world class! 💪',
    11,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),

  // Even more messages to reach 200+
  createMessage(
    'msg-106',
    'maguire-6',
    'Harry Maguire',
    'Linda W.',
    'Harry, you\'ve been through tough times but you keep your head up. Respect! 👊',
    20,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '👊' }
  ),
  createMessage(
    'msg-107',
    'henderson-21',
    'Jordan Henderson',
    'Anonymous',
    'Hendo, your leadership is what champions are made of! 🏆',
    17,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🏆' }
  ),
  createMessage(
    'msg-108',
    'trippier-12',
    'Kieran Trippier',
    'Amy L.',
    'Kieran, you can play anywhere across the back four. So valuable! 🎯',
    13,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-109',
    'phillips-14',
    'Kalvin Phillips',
    'Anonymous',
    'The Leeds faithful love you, Kalvin. Now show the world why! ⚽',
    24,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-110',
    'gallagher-15',
    'Conor Gallagher',
    'Timothy H.',
    'Conor, your determination and work rate are exactly what we need! 💪',
    19,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-111',
    'watkins-16',
    'Ollie Watkins',
    'Anonymous',
    'Ollie, your movement off the ball is superb. Score when it matters! 🎯',
    22,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-112',
    'toney-18',
    'Ivan Toney',
    'Frank B.',
    'Ivan, you\'re fearless from the spot. That confidence is gold! 🥇',
    16,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🥇' }
  ),
  createMessage(
    'msg-113',
    'pope-13',
    'Nick Pope',
    'Anonymous',
    'Nick, you\'re a wall between the posts! Unbeatable! 🧱',
    21,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🧱' }
  ),
  createMessage(
    'msg-114',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Jennifer S.',
    'Aaron, your confidence spreads through the team. Keep smiling! 😊',
    18,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '😊' }
  ),
  createMessage(
    'msg-115',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'Every tournament, every game, you give your all. Thank you, Captain! 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    1,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' }
  ),

  // Final batch to ensure we have 200+
  createMessage(
    'msg-116',
    'saka-7',
    'Bukayo Saka',
    'Priya N.',
    'Bukayo, you inspire a generation of young footballers. Keep shining! ⭐',
    7,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⭐' }
  ),
  createMessage(
    'msg-117',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'Madrid loves you, but England needs you more! Come on, Jude! 💪',
    14,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-118',
    'foden-11',
    'Phil Foden',
    'Kevin R.',
    'Phil, when you\'re on form, you\'re unstoppable. Find that form! 🔥',
    10,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🔥' }
  ),
  createMessage(
    'msg-119',
    'rashford-19',
    'Marcus Rashford',
    'Anonymous',
    'From feeding children to scoring bangers. You\'re special, Marcus! 💫',
    12,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '💫' }
  ),
  createMessage(
    'msg-120',
    'grealish-17',
    'Jack Grealish',
    'Stephanie D.',
    'Jack, your dribbling and creativity bring joy to millions! Keep it up! 🎨',
    15,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🎨' }
  ),

  // Adding more distributed messages for less popular players
  createMessage(
    'msg-121',
    'stones-5',
    'John Stones',
    'Anonymous',
    'John, your partnership with Maguire is rock solid! 🪨',
    23,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🪨' }
  ),
  createMessage(
    'msg-122',
    'walker-2',
    'Kyle Walker',
    'Brian M.',
    'Kyle, you\'ve been Mr. Reliable for years. Keep it going! 💪',
    11,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-123',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Anonymous',
    'TAA, your assists from right back are legendary! 🅰️',
    19,
    { font: 'mono', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'small' }
  ),
  createMessage(
    'msg-124',
    'shaw-23',
    'Luke Shaw',
    'Hannah G.',
    'Luke, you\'re back to your best. England needs you! 👏',
    16,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '👏' }
  ),
  createMessage(
    'msg-125',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'Mason, your intelligence and movement are world class! 🧠',
    8,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧠' }
  ),
  createMessage(
    'msg-126',
    'sterling-20',
    'Raheem Sterling',
    'Patricia R.',
    'Raheem, you\'ve scored in big moments before. Time for more! ⚽',
    21,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚽' }
  ),
  createMessage(
    'msg-127',
    'pickford-1',
    'Jordan Pickford',
    'Anonymous',
    'Jordan, you saved us in Russia. Save us again! 🦸',
    6,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🦸' }
  ),
  createMessage(
    'msg-128',
    'rice-4',
    'Declan Rice',
    'Connor J.',
    'Dec, you\'re the metronome of the team. Keep that rhythm! 🥁',
    13,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🥁' }
  ),
  createMessage(
    'msg-129',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'Harry Kane: goalscorer, provider, leader. The complete striker! 👑',
    3,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '👑' }
  ),
  createMessage(
    'msg-130',
    'saka-7',
    'Bukayo Saka',
    'Lily P.',
    'Saka, you make me proud to support Arsenal and England! 💫',
    17,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'small' },
    { type: 'emoji', emoji: '💫' }
  ),

  // Continue expanding to ensure we reach 200+ messages...
  createMessage(
    'msg-131',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'Jude, you play beyond your years. Future England captain! 🎖️',
    9,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🎖️' }
  ),
  createMessage(
    'msg-132',
    'foden-11',
    'Phil Foden',
    'Marcus G.',
    'Phil, you\'re City\'s star, now shine for England! ⭐',
    12,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⭐' }
  ),
  createMessage(
    'msg-133',
    'henderson-21',
    'Jordan Henderson',
    'Anonymous',
    'Hendo, leaders like you don\'t come around often. Thank you! 🙏',
    18,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🙏' }
  ),
  createMessage(
    'msg-134',
    'trippier-12',
    'Kieran Trippier',
    'George K.',
    'Kieran, your experience is invaluable. Guide the young ones! 👨‍🏫',
    24,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '👨‍🏫' }
  ),
  createMessage(
    'msg-135',
    'maguire-6',
    'Harry Maguire',
    'Anonymous',
    'Harry, you\'ve been a rock for England. Keep your chin up! 💪',
    14,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-136',
    'rashford-19',
    'Marcus Rashford',
    'Zara H.',
    'Marcus, you\'re a role model on and off the pitch! 🌟',
    7,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌟' }
  ),
  createMessage(
    'msg-137',
    'grealish-17',
    'Jack Grealish',
    'Anonymous',
    'Super Jack! Your calves and your skills are both legendary! 🦵',
    20,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🦵' }
  ),
  createMessage(
    'msg-138',
    'phillips-14',
    'Kalvin Phillips',
    'Samuel T.',
    'Kalvin, your positioning and tackling are excellent! 🛡️',
    22,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🛡️' }
  ),
  createMessage(
    'msg-139',
    'gallagher-15',
    'Conor Gallagher',
    'Anonymous',
    'Conor, you run all day! That engine is incredible! 🏃‍♂️',
    15,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🏃‍♂️' }
  ),
  createMessage(
    'msg-140',
    'watkins-16',
    'Ollie Watkins',
    'Lucy M.',
    'Ollie, you\'ve worked so hard to get here. Enjoy every moment! 🎉',
    11,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎉' }
  ),
  createMessage(
    'msg-141',
    'toney-18',
    'Ivan Toney',
    'Anonymous',
    'Ivan, your physical presence up front is exactly what we need! 💪',
    19,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-142',
    'pope-13',
    'Nick Pope',
    'Trevor W.',
    'Nick, your reflexes are cat-like! 🐱',
    25,
    { font: 'mono', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🐱' }
  ),
  createMessage(
    'msg-143',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Anonymous',
    'Aaron, you bring energy and positivity. That\'s what we need! ⚡',
    17,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '⚡' }
  ),
  createMessage(
    'msg-144',
    'kane-9',
    'Harry Kane',
    'Edward L.',
    'Harry, you\'ve broken records. Now break hearts of opposition! 💔⚽',
    4,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' }
  ),
  createMessage(
    'msg-145',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    'Bukayo, your smile after scoring makes everyone smile! 😊',
    8,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '😊' }
  ),
  createMessage(
    'msg-146',
    'bellingham-10',
    'Jude Bellingham',
    'Olivia C.',
    'Jude, you\'re special. England is lucky to have you! 🍀',
    13,
    { font: 'serif', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🍀' }
  ),
  createMessage(
    'msg-147',
    'stones-5',
    'John Stones',
    'Anonymous',
    'John, you read the game so well. Defensive masterclass! 📖',
    21,
    { font: 'mono', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '📖' }
  ),
  createMessage(
    'msg-148',
    'walker-2',
    'Kyle Walker',
    'Joshua B.',
    'Kyle, that recovery pace has saved us so many times! ⚡💨',
    16,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' }
  ),
  createMessage(
    'msg-149',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Anonymous',
    'Trent, your vision and passing are extraordinary! 👁️',
    10,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '👁️' }
  ),
  createMessage(
    'msg-150',
    'shaw-23',
    'Luke Shaw',
    'Isabella F.',
    'Luke, you came back stronger from injury. Inspiration! 💪',
    23,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '💪' }
  ),

  // Final push to 200+ messages
  createMessage(
    'msg-151',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'Mason, your passion for England is clear every time you play! ❤️',
    12,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '❤️' }
  ),
  createMessage(
    'msg-152',
    'sterling-20',
    'Raheem Sterling',
    'Noah W.',
    'Raheem, you\'ve been there in big moments. Do it again! ⚡',
    18,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⚡' }
  ),
  createMessage(
    'msg-153',
    'pickford-1',
    'Jordan Pickford',
    'Anonymous',
    'Pickford, your shot-stopping and distribution are top tier! 🥅',
    9,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🥅' }
  ),
  createMessage(
    'msg-154',
    'rice-4',
    'Declan Rice',
    'Emma T.',
    'Dec, you make everyone around you better. True leader! 👑',
    14,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '👑' }
  ),
  createMessage(
    'msg-155',
    'foden-11',
    'Phil Foden',
    'Anonymous',
    'Phil, your touch and vision are magical! Keep creating! ✨',
    5,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-156',
    'kane-9',
    'Harry Kane',
    'Amelia S.',
    'Captain Harry Kane - the name alone inspires confidence! 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    2,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-157',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    'Saka, the future of English football is bright with you in it! 🌟',
    11,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌟' }
  ),
  createMessage(
    'msg-158',
    'bellingham-10',
    'Jude Bellingham',
    'Oscar M.',
    'Jude, your box-to-box play is phenomenal! 📦➡️📦',
    7,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'small' }
  ),
  createMessage(
    'msg-159',
    'rashford-19',
    'Marcus Rashford',
    'Anonymous',
    'Marcus, speed, skill, and substance. You have it all! 💯',
    16,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💯' }
  ),
  createMessage(
    'msg-160',
    'grealish-17',
    'Jack Grealish',
    'Mia R.',
    'Jack, you make the beautiful game even more beautiful! 🎨',
    20,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎨' }
  ),
  createMessage(
    'msg-161',
    'henderson-21',
    'Jordan Henderson',
    'Anonymous',
    'Hendo, your experience in big games is priceless! 💎',
    19,
    { font: 'serif', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '💎' }
  ),
  createMessage(
    'msg-162',
    'trippier-12',
    'Kieran Trippier',
    'Ethan K.',
    'Kieran, your dead-ball delivery is perfection! 🎯',
    13,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎯' }
  ),
  createMessage(
    'msg-163',
    'maguire-6',
    'Harry Maguire',
    'Anonymous',
    'Harry, you\'ve been immense for England. Keep it going! 🦁',
    22,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🦁' }
  ),
  createMessage(
    'msg-164',
    'stones-5',
    'John Stones',
    'Charlotte L.',
    'John, your composure under pressure is incredible! 😎',
    15,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '😎' }
  ),
  createMessage(
    'msg-165',
    'walker-2',
    'Kyle Walker',
    'Anonymous',
    'Kyle, you\'ve been Mr. Consistent for years! 📊',
    21,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '📊' }
  ),
  createMessage(
    'msg-166',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Sophia H.',
    'Trent, those diagonals! Chef\'s kiss! 👨‍🍳💋',
    8,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-167',
    'shaw-23',
    'Luke Shaw',
    'Anonymous',
    'Luke, you boss that left side! Keep marauding! 🔥',
    17,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🔥' }
  ),
  createMessage(
    'msg-168',
    'mount-8',
    'Mason Mount',
    'Daniel P.',
    'Mason, your energy and pressing are vital! 🏃',
    24,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🏃' }
  ),
  createMessage(
    'msg-169',
    'sterling-20',
    'Raheem Sterling',
    'Anonymous',
    'Raheem, you\'ve won it all at club level. Time for England! 🏆',
    10,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🏆' }
  ),
  createMessage(
    'msg-170',
    'pickford-1',
    'Jordan Pickford',
    'Freya W.',
    'Jordan, you\'re England\'s number one for a reason! #1️⃣',
    6,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' }
  ),
  createMessage(
    'msg-171',
    'rice-4',
    'Declan Rice',
    'Anonymous',
    'Dec, you\'re the glue that holds it all together! 🧩',
    14,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🧩' }
  ),
  createMessage(
    'msg-172',
    'foden-11',
    'Phil Foden',
    'Jacob T.',
    'Phil, you\'re box office! Pure entertainment! 🎭',
    18,
    { font: 'serif', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '🎭' }
  ),
  createMessage(
    'msg-173',
    'phillips-14',
    'Kalvin Phillips',
    'Anonymous',
    'Kalvin, your tackles are crunching! Love it! 💥',
    23,
    { font: 'mono', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '💥' }
  ),
  createMessage(
    'msg-174',
    'gallagher-15',
    'Conor Gallagher',
    'Ava M.',
    'Conor, your work rate is off the charts! 📈',
    19,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '📈' }
  ),
  createMessage(
    'msg-175',
    'watkins-16',
    'Ollie Watkins',
    'Anonymous',
    'Ollie, your pace terrifies defenders! Keep running! 💨',
    12,
    { font: 'inter', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '💨' }
  ),
  createMessage(
    'msg-176',
    'toney-18',
    'Ivan Toney',
    'Liam H.',
    'Ivan, you\'re ice cold from the spot! 🧊',
    16,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🧊' }
  ),
  createMessage(
    'msg-177',
    'pope-13',
    'Nick Pope',
    'Anonymous',
    'Nick, your positioning is always perfect! 📍',
    20,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '📍' }
  ),
  createMessage(
    'msg-178',
    'ramsdale-22',
    'Aaron Ramsdale',
    'Chloe B.',
    'Aaron, your celebrations are iconic! Let\'s see more! 🎉',
    25,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🎉' }
  ),
  createMessage(
    'msg-179',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'Harry, you\'ve carried England for years. We appreciate you! 🙏',
    3,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '🙏' }
  ),
  createMessage(
    'msg-180',
    'saka-7',
    'Bukayo Saka',
    'Mason K.',
    'Bukayo, you\'ve got ice in your veins! Fearless! 🧊❄️',
    9,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' }
  ),

  // Final 20 messages to reach 200+
  createMessage(
    'msg-181',
    'bellingham-10',
    'Jude Bellingham',
    'Anonymous',
    'Jude, you\'re the complete midfielder! 💯',
    5,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '💯' }
  ),
  createMessage(
    'msg-182',
    'rashford-19',
    'Marcus Rashford',
    'Ella W.',
    'Marcus, your journey inspires millions! 🌍',
    15,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '🌍' }
  ),
  createMessage(
    'msg-183',
    'grealish-17',
    'Jack Grealish',
    'Anonymous',
    'Jack, you play with such joy! It\'s infectious! 😄',
    11,
    { font: 'mono', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '😄' }
  ),
  createMessage(
    'msg-184',
    'henderson-21',
    'Jordan Henderson',
    'Logan M.',
    'Hendo, true leaders never give up. That\'s you! 💪',
    18,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '💪' }
  ),
  createMessage(
    'msg-185',
    'trippier-12',
    'Kieran Trippier',
    'Anonymous',
    'Kieran, your professionalism is exemplary! 👔',
    22,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '👔' }
  ),
  createMessage(
    'msg-186',
    'maguire-6',
    'Harry Maguire',
    'Ruby L.',
    'Harry, you head away every problem! 🗿',
    13,
    { font: 'inter', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🗿' }
  ),
  createMessage(
    'msg-187',
    'stones-5',
    'John Stones',
    'Anonymous',
    'John, you\'re Barnsley\'s finest export! 💎',
    17,
    { font: 'serif', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '💎' }
  ),
  createMessage(
    'msg-188',
    'walker-2',
    'Kyle Walker',
    'Henry S.',
    'Kyle, you\'re rapid! Like the Flash! ⚡🦸',
    8,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' }
  ),
  createMessage(
    'msg-189',
    'arnold-3',
    'Trent Alexander-Arnold',
    'Anonymous',
    'Trent, your delivery is like Amazon Prime - always on time! 📦',
    21,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '📦' }
  ),
  createMessage(
    'msg-190',
    'shaw-23',
    'Luke Shaw',
    'Poppy R.',
    'Luke, you\'ve overcome so much. Hero! 🦸‍♂️',
    14,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🦸‍♂️' }
  ),
  createMessage(
    'msg-191',
    'mount-8',
    'Mason Mount',
    'Anonymous',
    'Mason, your eye for a pass is exceptional! 👁️',
    19,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'large' },
    { type: 'emoji', emoji: '👁️' }
  ),
  createMessage(
    'msg-192',
    'sterling-20',
    'Raheem Sterling',
    'Max P.',
    'Raheem, when you cut inside, magic happens! ✨',
    10,
    { font: 'playful', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'medium' },
    { type: 'emoji', emoji: '✨' }
  ),
  createMessage(
    'msg-193',
    'pickford-1',
    'Jordan Pickford',
    'Anonymous',
    'Jordan, your passion is unmatched! Roar! 🦁',
    6,
    { font: 'inter', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '🦁' }
  ),
  createMessage(
    'msg-194',
    'rice-4',
    'Declan Rice',
    'Isla T.',
    'Dec, you\'re the foundation everything is built on! 🏗️',
    12,
    { font: 'mono', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'small' },
    { type: 'emoji', emoji: '🏗️' }
  ),
  createMessage(
    'msg-195',
    'foden-11',
    'Phil Foden',
    'Anonymous',
    'Phil, Stockport is proud! Now make England proud! 🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    16,
    { font: 'serif', textColor: '#333333', backgroundColor: '#FFFFFF', fontSize: 'large' }
  ),
  createMessage(
    'msg-196',
    'kane-9',
    'Harry Kane',
    'Alfie G.',
    'Harry Kane - England\'s greatest ever striker! There, I said it! 👑⚽',
    1,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'medium' }
  ),
  createMessage(
    'msg-197',
    'saka-7',
    'Bukayo Saka',
    'Anonymous',
    'Bukayo, you\'re loved by millions. Never forget that! ❤️',
    7,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#FFFFFF', fontSize: 'large' },
    { type: 'emoji', emoji: '❤️' }
  ),
  createMessage(
    'msg-198',
    'bellingham-10',
    'Jude Bellingham',
    'Grace H.',
    'Jude, you\'re living everyone\'s dream. Enjoy it! ⚽💫',
    4,
    { font: 'serif', textColor: '#333333', backgroundColor: '#F5F5F5', fontSize: 'medium' }
  ),
  createMessage(
    'msg-199',
    'kane-9',
    'Harry Kane',
    'Anonymous',
    'One Kane, there\'s only one Harry Kane! 🎵⚽',
    2,
    { font: 'playful', textColor: '#CE1126', backgroundColor: '#FFF5F5', fontSize: 'large' }
  ),
  createMessage(
    'msg-200',
    'saka-7',
    'Bukayo Saka',
    'Thomas B.',
    'Saka, the Starboy! Keep shining bright! ⭐✨',
    5,
    { font: 'inter', textColor: '#1D1160', backgroundColor: '#F5F5F5', fontSize: 'medium' },
    { type: 'emoji', emoji: '⭐' }
  ),
];

export const getMessagesForPlayer = (playerId: string): Message[] => {
  return syntheticMessages.filter(msg => msg.playerId === playerId);
};

export const getRecentMessages = (count: number = 20): Message[] => {
  return [...syntheticMessages]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, count);
};

export const getRandomMessages = (count: number = 20): Message[] => {
  const shuffled = [...syntheticMessages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
