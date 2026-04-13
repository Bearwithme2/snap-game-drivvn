import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameSummary } from '../game-summary';

describe('GameSummary', () => {
  it('displays value and suit match counts', () => {
    render(<GameSummary valueMatches={5} suitMatches={12} />);

    expect(screen.getByText(/VALUE MATCHES: 5/)).toBeInTheDocument();
    expect(screen.getByText(/SUIT MATCHES: 12/)).toBeInTheDocument();
  });
});
