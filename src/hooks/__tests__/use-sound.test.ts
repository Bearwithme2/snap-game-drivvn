import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSound } from '../use-sound';

const mockOscillator = {
  connect: vi.fn(),
  frequency: {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
  type: 'sine' as OscillatorType,
  start: vi.fn(),
  stop: vi.fn(),
};

const mockGain = {
  connect: vi.fn(),
  gain: {
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
};

const createOscillatorFn = vi.fn().mockReturnValue(mockOscillator);
const createGainFn = vi.fn().mockReturnValue(mockGain);

class MockAudioContext {
  createOscillator = createOscillatorFn;
  createGain = createGainFn;
  destination = {};
  currentTime = 0;
}

const AudioContextMock = vi.fn().mockImplementation(MockAudioContext);

beforeEach(() => {
  vi.stubGlobal('AudioContext', AudioContextMock);
  AudioContextMock.mockClear();
  createOscillatorFn.mockClear();
  createGainFn.mockClear();
  mockOscillator.connect.mockClear();
  mockOscillator.start.mockClear();
  mockOscillator.stop.mockClear();
  mockOscillator.frequency.setValueAtTime.mockClear();
  mockOscillator.frequency.exponentialRampToValueAtTime.mockClear();
  mockGain.connect.mockClear();
  mockGain.gain.setValueAtTime.mockClear();
  mockGain.gain.exponentialRampToValueAtTime.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useSound', () => {
  it('returns playDraw and playSnap functions', () => {
    const { result } = renderHook(() => useSound());

    expect(typeof result.current.playDraw).toBe('function');
    expect(typeof result.current.playSnap).toBe('function');
  });

  it('playDraw creates one oscillator and gain node', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.playDraw());

    expect(createOscillatorFn).toHaveBeenCalledTimes(1);
    expect(createGainFn).toHaveBeenCalledTimes(1);
    expect(mockOscillator.start).toHaveBeenCalledTimes(1);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(1);
  });

  it('playSnap creates three oscillators for the chord', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.playSnap());

    expect(createOscillatorFn).toHaveBeenCalledTimes(3);
    expect(createGainFn).toHaveBeenCalledTimes(3);
    expect(mockOscillator.start).toHaveBeenCalledTimes(3);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(3);
  });

  it('reuses the same AudioContext across calls', () => {
    const { result } = renderHook(() => useSound());

    act(() => result.current.playDraw());
    act(() => result.current.playDraw());

    expect(AudioContextMock).toHaveBeenCalledTimes(1);
  });

  it('does not throw when AudioContext is unavailable', () => {
    vi.stubGlobal(
      'AudioContext',
      vi.fn().mockImplementation(class { constructor() { throw new Error('Not supported'); } }),
    );
    const { result } = renderHook(() => useSound());

    expect(() => act(() => result.current.playDraw())).not.toThrow();
    expect(() => act(() => result.current.playSnap())).not.toThrow();
  });
});
