import styles from './card-counter.module.css';

interface CardCounterProps {
  cardsDrawn: number;
  totalCards: number;
}

export function CardCounter({ cardsDrawn, totalCards }: CardCounterProps) {
  if (cardsDrawn === 0) return null;

  return (
    <p className={styles.counter}>
      Card {cardsDrawn} of {totalCards}
    </p>
  );
}
