import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SnapMessage } from '../snap-message';

describe('SnapMessage', () => {
  it('renders empty container when snapResult is null', () => {
    render(<SnapMessage snapResult={null} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renders SNAP VALUE! for value match', () => {
    render(<SnapMessage snapResult="VALUE" />);
    expect(screen.getByRole('alert')).toHaveTextContent('SNAP VALUE!');
  });

  it('renders SNAP SUIT! for suit match', () => {
    render(<SnapMessage snapResult="SUIT" />);
    expect(screen.getByRole('alert')).toHaveTextContent('SNAP SUIT!');
  });
});
