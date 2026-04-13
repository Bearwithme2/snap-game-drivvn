import styles from './game-summary.module.css';

interface GameSummaryProps {
  valueMatches: number;
  suitMatches: number;
}

export function GameSummary({ valueMatches, suitMatches }: GameSummaryProps) {
  return (
    <div className={styles.summary}>
      <p><strong>VALUE MATCHES: {valueMatches}</strong></p>
      <p><strong>SUIT MATCHES: {suitMatches}</strong></p>
    </div>
  );
}
