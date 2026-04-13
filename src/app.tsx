import { useEffect } from 'react';
import { useGame } from './hooks/use-game';
import { Card } from './components/card';
import { DrawButton } from './components/draw-button';
import { SnapMessage } from './components/snap-message';
import { GameSummary } from './components/game-summary';
import { CardCounter } from './components/card-counter';
import { Probability } from './components/probability';
import styles from './app.module.css';

export function App() {
  const game = useGame();
  const { startGame } = game;

  useEffect(() => {
    void startGame();
  }, [startGame]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>SNAP!</h1>

      {game.error && <p className={styles.error}>{game.error}</p>}

      <SnapMessage snapResult={game.snapResult} />

      <div className={styles.cards}>
        <Card card={game.previousCard} label="Previous Card" />
        <Card card={game.currentCard} label="Current Card" />
      </div>

      <CardCounter cardsDrawn={game.cardsDrawn} totalCards={game.totalCards} />

      {game.gameOver ? (
        <GameSummary
          valueMatches={game.valueMatches}
          suitMatches={game.suitMatches}
        />
      ) : (
        <DrawButton onClick={game.draw} disabled={game.loading || !game.deckId} />
      )}

      <Probability
        valueProbability={game.probability.valueProbability}
        suitProbability={game.probability.suitProbability}
        visible={game.cardsDrawn > 0 && !game.gameOver}
      />
    </div>
  );
}
