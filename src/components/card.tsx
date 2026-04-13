import type { CardData } from '../api/deck-api';
import styles from './card.module.css';

interface CardProps {
  card: CardData | null;
  label: string;
}

const PLACEHOLDER_URL = 'https://deckofcardsapi.com/static/img/back.png';

export function Card({ card, label }: CardProps) {
  return (
    <div className={styles.cardContainer}>
      <p className={styles.label}>{label}</p>
      <img
        className={styles.cardImage}
        src={card ? card.image : PLACEHOLDER_URL}
        alt={card ? `${card.value} of ${card.suit}` : 'Card placeholder'}
      />
    </div>
  );
}
