import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardCounter } from '../card-counter';

describe('CardCounter', () => {
  it('renders nothing when no cards drawn', () => {
    const { container } = render(<CardCounter cardsDrawn={0} totalCards={52} />);
    expect(container.firstChild).toBeNull();
  });

  it('displays the card count', () => {
    render(<CardCounter cardsDrawn={5} totalCards={52} />);
    expect(screen.getByText('Card 5 of 52')).toBeInTheDocument();
  });
});
