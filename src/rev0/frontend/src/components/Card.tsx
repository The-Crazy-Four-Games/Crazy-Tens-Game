import React from 'react';
import type { Card as CardType } from '../types/game';
import { SUIT_SYMBOLS, SUIT_COLORS, formatRank } from '../types/game';
import './Card.css';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  onClick?: () => void;
  isPlayable?: boolean;
  isSelected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  card,
  faceDown = false,
  onClick,
  isPlayable = false,
  isSelected = false,
  size = 'medium',
}) => {
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const suitColor = SUIT_COLORS[card.suit];
  const displayRank = formatRank(card.rank);

  const handleClick = () => {
    if (onClick && !faceDown) {
      onClick();
    }
  };

  if (faceDown) {
    return (
      <div className={`card card-back card-${size}`}>
        <div className="card-back-pattern">
          <span>🎴</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card card-${size} ${isPlayable ? 'playable' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-corner top-left" style={{ color: suitColor }}>
        <span className="card-rank">{displayRank}</span>
        <span className="card-suit">{suitSymbol}</span>
      </div>
      <div className="card-center" style={{ color: suitColor }}>
        <span className="card-suit-large">{suitSymbol}</span>
      </div>
      <div className="card-corner bottom-right" style={{ color: suitColor }}>
        <span className="card-rank">{displayRank}</span>
        <span className="card-suit">{suitSymbol}</span>
      </div>
    </div>
  );
};

export default Card;
