import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './app';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function mockShuffleDeck() {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        deck_id: 'test-deck',
        remaining: 52,
        shuffled: true,
      }),
  });
}

function mockDrawCard(value: string, suit: string, remaining: number) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        deck_id: 'test-deck',
        cards: [
          {
            code: `${value[0]}${suit[0]}`,
            image: `https://deckofcardsapi.com/static/img/${value[0]}${suit[0]}.png`,
            images: {
              svg: `https://deckofcardsapi.com/static/img/${value[0]}${suit[0]}.svg`,
              png: `https://deckofcardsapi.com/static/img/${value[0]}${suit[0]}.png`,
            },
            value,
            suit,
          },
        ],
        remaining,
      }),
  });
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('App', () => {
  it('renders the title and draw button', async () => {
    mockShuffleDeck();
    render(<App />);

    expect(screen.getByText('SNAP!')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Draw card')).toBeEnabled();
    });
  });

  it('draws a card and displays it', async () => {
    const user = userEvent.setup();
    mockShuffleDeck();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Draw card')).toBeEnabled();
    });

    mockDrawCard('ACE', 'SPADES', 51);
    await user.click(screen.getByText('Draw card'));

    await waitFor(() => {
      expect(screen.getByText('Card 1 of 52')).toBeInTheDocument();
    });
  });

  it('shows SNAP VALUE! when values match', async () => {
    const user = userEvent.setup();
    mockShuffleDeck();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Draw card')).toBeEnabled();
    });

    mockDrawCard('ACE', 'SPADES', 51);
    await user.click(screen.getByText('Draw card'));
    await waitFor(() => {
      expect(screen.getByText('Card 1 of 52')).toBeInTheDocument();
    });

    mockDrawCard('ACE', 'HEARTS', 50);
    await user.click(screen.getByText('Draw card'));
    await waitFor(() => {
      expect(screen.getByText('SNAP VALUE!')).toBeInTheDocument();
    });
  });

  it('shows SNAP SUIT! when suits match', async () => {
    const user = userEvent.setup();
    mockShuffleDeck();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Draw card')).toBeEnabled();
    });

    mockDrawCard('ACE', 'SPADES', 51);
    await user.click(screen.getByText('Draw card'));
    await waitFor(() => {
      expect(screen.getByText('Card 1 of 52')).toBeInTheDocument();
    });

    mockDrawCard('KING', 'SPADES', 50);
    await user.click(screen.getByText('Draw card'));
    await waitFor(() => {
      expect(screen.getByText('SNAP SUIT!')).toBeInTheDocument();
    });
  });
});
