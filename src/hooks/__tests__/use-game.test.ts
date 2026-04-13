import { describe, it, expect } from 'vitest';
import { computeProbability, getSnapResult } from '../use-game';
import type { CardData } from '../../api/deck-api';

function makeCard(value: string, suit: string): CardData {
  return {
    code: `${value[0]}${suit[0]}`,
    image: `https://example.com/${value}_${suit}.png`,
    images: {
      svg: `https://example.com/${value}_${suit}.svg`,
      png: `https://example.com/${value}_${suit}.png`,
    },
    value,
    suit,
  };
}

describe('getSnapResult', () => {
  it('returns null when previous card is null', () => {
    expect(getSnapResult(makeCard('ACE', 'SPADES'), null)).toBeNull();
  });

  it('returns VALUE when values match', () => {
    expect(getSnapResult(makeCard('ACE', 'HEARTS'), makeCard('ACE', 'SPADES'))).toBe('VALUE');
  });

  it('returns SUIT when suits match but values differ', () => {
    expect(getSnapResult(makeCard('KING', 'SPADES'), makeCard('ACE', 'SPADES'))).toBe('SUIT');
  });

  it('returns null when neither value nor suit match', () => {
    expect(getSnapResult(makeCard('KING', 'HEARTS'), makeCard('ACE', 'SPADES'))).toBeNull();
  });
});

describe('computeProbability', () => {
  it('returns 0 when no cards drawn', () => {
    const result = computeProbability([]);
    expect(result.valueProbability).toBe(0);
    expect(result.suitProbability).toBe(0);
  });

  it('calculates value probability after first card drawn', () => {
    const drawn = [makeCard('ACE', 'SPADES')];
    const result = computeProbability(drawn);

    // 3 remaining aces out of 51 remaining cards
    expect(result.valueProbability).toBeCloseTo(3 / 51);
    // 12 remaining spades out of 51 remaining cards
    expect(result.suitProbability).toBeCloseTo(12 / 51);
  });

  it('adjusts probability as more cards are drawn', () => {
    const drawn = [
      makeCard('ACE', 'SPADES'),
      makeCard('ACE', 'HEARTS'),
    ];
    const result = computeProbability(drawn);

    // Last card is ACE of HEARTS
    // 2 remaining aces out of 50 remaining cards
    expect(result.valueProbability).toBeCloseTo(2 / 50);
    // 12 remaining hearts out of 50 remaining cards
    expect(result.suitProbability).toBeCloseTo(12 / 50);
  });

  it('returns 0 when all cards drawn', () => {
    const drawn: CardData[] = [];
    const values = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
    const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];
    for (const suit of suits) {
      for (const value of values) {
        drawn.push(makeCard(value, suit));
      }
    }
    const result = computeProbability(drawn);
    expect(result.valueProbability).toBe(0);
    expect(result.suitProbability).toBe(0);
  });
});
