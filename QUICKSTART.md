# 🚀 Quick Start Guide - England Football Message Wall

Get the application running in under 2 minutes!

## Prerequisites

- Node.js 18+ installed
- npm installed

## Installation & Setup

```bash
# 1. Navigate to project directory
cd englandmessageboard

# 2. Install dependencies (this may take a minute)
npm install

# 3. Start the development server
npm run dev
```

That's it! The application will open at `http://localhost:5173` (or next available port).

## What You'll See

### 1. **Landing Page** (`/`)
- Hero section with "Send Your Support to the Three Lions"
- Three feature cards
- POC disclaimer alert at top
- "Start Writing" CTA button

### 2. **Players Page** (`/players`)
- Grid of 23 England squad players
- Search bar to find players
- Filter tabs by position
- Each player shows message count

### 3. **Player Wall** (`/player/:playerId`)
- Individual player's message wall
- Filter messages (Recent/Random/With Media)
- View all messages with custom styling
- "Add Your Message" floating button

### 4. **Message Form** (`/player/:playerId/submit`)
- Write your message (max 500 characters)
- Customize style: font, size, colors
- Add emoji via picker
- Live preview of your message
- Content moderation on submit

### 5. **Donation Page** (`/donate`)
- Confetti celebration
- Your message preview
- MIND charity info
- Optional donation prompt

### 6. **Confirmation** (`/confirmation`)
- Success message
- Your message preview
- Navigation options

## Try These Features

### ✅ Browse Players
1. Click "Start Writing" on homepage
2. Use search bar to find "Harry Kane"
3. Or filter by "Forward" position
4. Click any player card to view their wall

### ✅ Submit a Clean Message
1. From player wall, click "Add Your Message"
2. Enter name: "John"
3. Message: "You're an inspiration! Keep going! ⚽"
4. Customize font to "Serif", size to "Large"
5. Pick an emoji from the media tab
6. Check preview tab
7. Click "Send Your Support"
8. See donation prompt with confetti
9. Navigate to confirmation

### ✅ Test Content Moderation
1. Try submitting a message with profanity
2. See error: "Please keep your message free from inappropriate language"
3. Try negative message: "You're terrible"
4. See error: "Please keep messages positive and supportive"

### ✅ Session Persistence
1. Submit 2-3 messages to different players
2. Check header - see message counter
3. Go to any player wall with your message
4. See "Your message" badge on your submissions
5. Close browser - messages will clear

### ✅ Responsive Design
1. Resize browser window
2. Try mobile width (375px)
3. Try tablet width (768px)
4. Try desktop width (1920px)
5. See layouts adapt smoothly

## Key Keyboard Shortcuts

- `Tab` - Navigate between elements
- `Enter` - Submit focused button/link
- `Escape` - Close dialogs/popovers
- `Arrow Keys` - Navigate tabs and radio groups

## Project Structure Quick Reference

```
src/
├── pages/           # 6 main pages
├── components/
│   ├── ui/          # 15 ShadCN components
│   └── layout/      # Header, Footer, Layout
├── data/            # Players (23) + Messages (200+)
├── utils/           # Session storage, moderation, dates
└── types/           # TypeScript definitions
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Utility
npm run lint         # TypeScript check
```

## Troubleshooting

### Port Already in Use?
Vite will automatically try the next available port (5173, 5174, 5175, etc.)

### Build Errors?
```bash
# Clean install
rm -rf node_modules
npm install
npm run build
```

### TypeScript Errors?
```bash
npm run lint
```

### Missing Dependencies?
```bash
npm install
```

## Quick Test Checklist

- [ ] Homepage loads
- [ ] Can navigate to players page
- [ ] Can search for a player
- [ ] Can filter by position
- [ ] Can view player wall
- [ ] Can submit a message
- [ ] Content moderation works
- [ ] Session counter updates
- [ ] Messages show "Your message" badge
- [ ] Responsive on mobile

## Data Overview

- **23 Players**: Full England squad
- **200+ Messages**: Pre-populated across all players
- **Session Storage**: Your messages saved during session
- **POC Mode**: Nothing saved permanently (demo only)

## Design Colors

- **England Navy**: `#1D1160` (primary)
- **England Red**: `#CE1126` (accent)
- **White/Light Gray**: Backgrounds
- **Professional**: Modern, clean aesthetic

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Browse the application
3. ✅ Submit test messages
4. ✅ Test content moderation
5. ✅ Check responsive design
6. ✅ Review the code
7. ✅ Read README.md for full details
8. ✅ Check PROJECT_SUMMARY.md for complete feature list

## Need More Info?

- **README.md** - Comprehensive documentation
- **PROJECT_SUMMARY.md** - Complete feature list and stats
- **src/pages/** - Review page implementations
- **src/data/** - See player and message data

---

**Enjoy exploring the England Football Message Wall! 🏴󠁧󠁢󠁥󠁮󠁧󠁿⚽**
