import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Probability } from '../probability';

describe('Probability', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(
      <Probability valueProbability={0.1} suitProbability={0.25} visible={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays probabilities as percentages', () => {
    render(
      <Probability valueProbability={0.058} suitProbability={0.235} visible={true} />,
    );
    expect(screen.getByText('5.8%')).toBeInTheDocument();
    expect(screen.getByText('23.5%')).toBeInTheDocument();
  });
});
