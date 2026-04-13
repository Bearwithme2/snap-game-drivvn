# SNAP Card Game

A single-page card game built with React, TypeScript, and Vite that uses the [Deck of Cards API](https://deckofcardsapi.com).

Draw cards one at a time from a shuffled deck. When consecutive cards share a value or suit, the game calls **SNAP!**

## Features

- Shuffled 52-card deck via the Deck of Cards API
- Draw cards one at a time with previous/current card display
- **SNAP VALUE!** detection when consecutive card values match
- **SNAP SUIT!** detection when consecutive card suits match
- End-of-game summary with total value and suit match counts
- Card counter showing progress through the deck
- Probability display for the next card matching by value or suit

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Vitest** + React Testing Library for tests
- **CSS Modules** for styling
