import styles from './draw-button.module.css';

interface DrawButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function DrawButton({ onClick, disabled }: DrawButtonProps) {
  return (
    <button
      className={styles.drawButton}
      onClick={onClick}
      disabled={disabled}
    >
      Draw card
    </button>
  );
}
