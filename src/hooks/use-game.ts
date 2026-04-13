import { useCallback, useMemo, useRef, useState } from 'react';
import { shuffleNewDeck, drawCard } from '../api/deck-api';
import type { CardData } from '../api/deck-api';

export type SnapResult = 'VALUE' | 'SUIT' | null;

export interface GameState {
  deckId: string | null;
  currentCard: CardData | null;
  previousCard: CardData | null;
  cardsDrawn: number;
  drawnCards: CardData[];
  valueMatches: number;
  suitMatches: number;
  gameOver: boolean;
  snapResult: SnapResult;
  loading: boolean;
  error: string | null;
}

const TOTAL_CARDS = 52;

const ALL_VALUES = [
  'ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING',
];
const ALL_SUITS = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];

export function computeProbability(drawnCards: CardData[]) {
  if (drawnCards.length === 0 || drawnCards.length >= TOTAL_CARDS) {
    return { valueProbability: 0, suitProbability: 0 };
  }

  const lastCard = drawnCards[drawnCards.length - 1];
  const remaining = TOTAL_CARDS - drawnCards.length;

  const drawnValues = new Map<string, number>();
  const drawnSuits = new Map<string, number>();
  for (const card of drawnCards) {
    drawnValues.set(card.value, (drawnValues.get(card.value) ?? 0) + 1);
    drawnSuits.set(card.suit, (drawnSuits.get(card.suit) ?? 0) + 1);
  }

  const totalOfValue = ALL_VALUES.includes(lastCard.value) ? 4 : 0;
  const remainingOfValue = totalOfValue - (drawnValues.get(lastCard.value) ?? 0);

  const totalOfSuit = ALL_SUITS.includes(lastCard.suit) ? 13 : 0;
  const remainingOfSuit = totalOfSuit - (drawnSuits.get(lastCard.suit) ?? 0);

  return {
    valueProbability: remaining > 0 ? remainingOfValue / remaining : 0,
    suitProbability: remaining > 0 ? remainingOfSuit / remaining : 0,
  };
}

export function getSnapResult(current: CardData, previous: CardData | null): SnapResult {
  if (!previous) return null;
  // VALUE match takes priority over SUIT when both match (e.g. multi-deck scenarios)
  if (current.value === previous.value) return 'VALUE';
  if (current.suit === previous.suit) return 'SUIT';
  return null;
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    deckId: null,
    currentCard: null,
    previousCard: null,
    cardsDrawn: 0,
    drawnCards: [],
    valueMatches: 0,
    suitMatches: 0,
    gameOver: false,
    snapResult: null,
    loading: false,
    error: null,
  });

  const startGame = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const deck = await shuffleNewDeck();
      setState({
        deckId: deck.deck_id,
        currentCard: null,
        previousCard: null,
        cardsDrawn: 0,
        drawnCards: [],
        valueMatches: 0,
        suitMatches: 0,
        gameOver: false,
        snapResult: null,
        loading: false,
        error: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to start game. Please try again.',
      }));
    }
  }, []);

  const stateRef = useRef(state);
  stateRef.current = state;

  const draw = useCallback(async () => {
    const { deckId, gameOver, loading } = stateRef.current;
    if (!deckId || gameOver || loading) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await drawCard(deckId);
      const newCard = res.cards[0];

      setState((prev) => {
        const snap = getSnapResult(newCard, prev.currentCard);
        const newDrawnCards = [...prev.drawnCards, newCard];
        const newCardsDrawn = prev.cardsDrawn + 1;

        const isGameOver = newCardsDrawn >= TOTAL_CARDS;

        return {
          ...prev,
          previousCard: prev.currentCard,
          currentCard: newCard,
          cardsDrawn: newCardsDrawn,
          drawnCards: newDrawnCards,
          valueMatches: prev.valueMatches + (snap === 'VALUE' ? 1 : 0),
          suitMatches: prev.suitMatches + (snap === 'SUIT' ? 1 : 0),
          snapResult: isGameOver ? null : snap,
          gameOver: isGameOver,
          loading: false,
        };
      });
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to draw card. Please try again.',
      }));
    }
  }, []);

  const probability = useMemo(
    () => computeProbability(state.drawnCards),
    [state.drawnCards],
  );

  return {
    ...state,
    totalCards: TOTAL_CARDS,
    probability,
    startGame,
    draw,
  };
}
