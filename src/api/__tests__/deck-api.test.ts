import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shuffleNewDeck, drawCard } from '../deck-api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe('shuffleNewDeck', () => {
  it('calls the correct API endpoint', async () => {
    const mockResponse = {
      success: true,
      deck_id: 'abc123',
      remaining: 52,
      shuffled: true,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await shuffleNewDeck();

    expect(mockFetch).toHaveBeenCalledWith(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(shuffleNewDeck()).rejects.toThrow('Failed to shuffle new deck');
  });
});

describe('drawCard', () => {
  it('calls the correct API endpoint with deck ID', async () => {
    const mockResponse = {
      success: true,
      deck_id: 'abc123',
      cards: [
        {
          code: 'AS',
          image: 'https://deckofcardsapi.com/static/img/AS.png',
          images: {
            svg: 'https://deckofcardsapi.com/static/img/AS.svg',
            png: 'https://deckofcardsapi.com/static/img/AS.png',
          },
          value: 'ACE',
          suit: 'SPADES',
        },
      ],
      remaining: 51,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await drawCard('abc123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://deckofcardsapi.com/api/deck/abc123/draw/?count=1',
    );
    expect(result.cards).toHaveLength(1);
    expect(result.cards[0].value).toBe('ACE');
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });

    await expect(drawCard('bad-id')).rejects.toThrow('Failed to draw card');
  });
});
