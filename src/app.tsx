import { useEffect } from 'react';
import { useGame } from './hooks/use-game';
import { useSound } from './hooks/use-sound';
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
  const { playDraw, playSnap } = useSound();

  useEffect(() => {
    void startGame();
  }, [startGame]);

  useEffect(() => {
    if (game.cardsDrawn === 0) return;
    playDraw();
    if (game.snapResult) {
      playSnap();
    }
  }, [game.cardsDrawn, game.snapResult, playDraw, playSnap]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>SNAP!</h1>

      {game.error && (
        <div className={styles.error}>
          <p>{game.error}</p>
          {!game.deckId && (
            <DrawButton label="Retry" onClick={game.startGame} disabled={game.loading} />
          )}
        </div>
      )}

      <SnapMessage key={game.cardsDrawn} snapResult={game.snapResult} />

      <div className={styles.cards}>
        <Card card={game.previousCard} label="Previous Card" />
        <Card key={game.cardsDrawn} card={game.currentCard} label="Current Card" />
      </div>

      <CardCounter cardsDrawn={game.cardsDrawn} totalCards={game.totalCards} />

      {game.gameOver && (
        <GameSummary
          valueMatches={game.valueMatches}
          suitMatches={game.suitMatches}
        />
      )}

      {game.gameOver ? (
        <DrawButton label="Play again" onClick={game.startGame} disabled={false} />
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
