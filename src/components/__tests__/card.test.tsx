import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../card';
import type { CardData } from '../../api/deck-api';

const mockCard: CardData = {
  code: 'AS',
  image: 'https://deckofcardsapi.com/static/img/AS.png',
  images: {
    svg: 'https://deckofcardsapi.com/static/img/AS.svg',
    png: 'https://deckofcardsapi.com/static/img/AS.png',
  },
  value: 'ACE',
  suit: 'SPADES',
};

describe('Card', () => {
  it('renders a card image when card is provided', () => {
    render(<Card card={mockCard} label="Current Card" />);

    const img = screen.getByAltText('ACE of SPADES');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockCard.image);
  });

  it('renders a placeholder when card is null', () => {
    render(<Card card={null} label="Previous Card" />);

    const img = screen.getByAltText('Card placeholder');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://deckofcardsapi.com/static/img/back.png',
    );
  });

  it('displays the label', () => {
    render(<Card card={null} label="Previous Card" />);
    expect(screen.getByText('Previous Card')).toBeInTheDocument();
  });
});
