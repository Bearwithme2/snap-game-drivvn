import styles from './draw-button.module.css';

interface DrawButtonProps {
  onClick: () => void;
  disabled: boolean;
  label?: string;
}

export function DrawButton({ onClick, disabled, label = 'Draw card' }: DrawButtonProps) {
  return (
    <button
      className={styles.drawButton}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
