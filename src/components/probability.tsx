import styles from './probability.module.css';

interface ProbabilityProps {
  valueProbability: number;
  suitProbability: number;
  visible: boolean;
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function Probability({ valueProbability, suitProbability, visible }: ProbabilityProps) {
  if (!visible) return null;

  return (
    <div className={styles.probability}>
      <p>Next card value match: <strong>{formatPercent(valueProbability)}</strong></p>
      <p>Next card suit match: <strong>{formatPercent(suitProbability)}</strong></p>
    </div>
  );
}
