import type { SnapResult } from '../hooks/use-game';
import styles from './snap-message.module.css';

interface SnapMessageProps {
  snapResult: SnapResult;
}

export function SnapMessage({ snapResult }: SnapMessageProps) {
  return (
    <div className={styles.snapMessage}>
      {snapResult && (
        <span role="alert">
          {snapResult === 'VALUE' ? 'SNAP VALUE!' : 'SNAP SUIT!'}
        </span>
      )}
    </div>
  );
}
