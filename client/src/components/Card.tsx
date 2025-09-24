import React from 'react';
import { cn } from '@/lib/utils';

export interface CardData {
  id: string;
  carName: string;
  isFlipped: boolean;
  isMatched: boolean;
  isCenter?: boolean;
}

interface CardProps {
  card: CardData;
  onCardClick: (cardId: string) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onCardClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched && !card.isCenter) {
      onCardClick(card.id);
    }
  };

  const getCarGradient = (carName: string) => {
    const gradients: Record<string, string> = {
      'Bugatti Chiron': 'from-blue-600 via-blue-800 to-black',
      'Lamborghini Aventador SVJ': 'from-orange-500 via-yellow-500 to-red-600',
      'Ferrari SF90 Stradale': 'from-red-600 via-red-700 to-red-900',
      'McLaren 720S': 'from-orange-400 via-orange-600 to-orange-800',
      'Porsche 911 GT2 RS': 'from-gray-400 via-gray-600 to-gray-800',
      'Aston Martin Valkyrie': 'from-green-600 via-green-700 to-green-900',
      'Koenigsegg Jesko': 'from-purple-600 via-purple-800 to-black',
      'Pagani Huayra': 'from-amber-400 via-amber-600 to-amber-800',
      'Lamborghini Huracán STO': 'from-lime-500 via-green-600 to-green-800',
      'McLaren Artura': 'from-cyan-500 via-blue-600 to-blue-800',
      'Ferrari 296 GTB': 'from-red-500 via-pink-600 to-red-700',
      'Aston Martin DBS Superleggera': 'from-emerald-600 via-teal-700 to-green-800'
    };
    return gradients[carName] || 'from-gray-500 to-gray-700';
  };

  const renderCardContent = () => {
    if (card.isCenter) {
      return (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-500 to-orange-600 text-white">
          {/* Hot Wheels-style logo using SVG */}
          <svg className="w-12 h-12" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="25" cy="75" r="15" fill="black"/>
            <circle cx="75" cy="75" r="15" fill="black"/>
            <path d="M10 60 Q50 30 90 60 L90 75 L10 75 Z" fill="yellow"/>
            <path d="M20 50 Q50 35 80 50" stroke="red" strokeWidth="3" fill="none"/>
            <text x="50" y="45" textAnchor="middle" className="text-xs font-bold" fill="red">HW</text>
          </svg>
        </div>
      );
    }

    if (card.isFlipped || card.isMatched) {
      return (
        <div className={cn(
          "flex flex-col items-center justify-center h-full bg-gradient-to-br text-white p-2",
          getCarGradient(card.carName)
        )}>
          {/* Car icon using SVG */}
          <svg className="w-8 h-8 mb-2" viewBox="0 0 100 50" fill="currentColor">
            <ellipse cx="20" cy="40" rx="8" ry="8" fill="black"/>
            <ellipse cx="80" cy="40" rx="8" ry="8" fill="black"/>
            <path d="M5 35 L15 25 L25 20 L75 20 L85 25 L95 35 L95 40 L5 40 Z"/>
            <rect x="25" y="15" width="50" height="15" rx="5"/>
          </svg>
          <span className="text-xs font-semibold text-center leading-tight">
            {card.carName}
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
        </svg>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "card-container aspect-square cursor-pointer select-none",
        card.isCenter && "cursor-default",
        disabled && !card.isCenter && "cursor-not-allowed opacity-50"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "card-inner w-full h-full relative",
          (card.isFlipped || card.isMatched) && "flipped"
        )}
      >
        <div className="card-face card-front absolute inset-0 rounded-lg border-2 border-gray-300 shadow-lg">
          {renderCardContent()}
        </div>
        <div className="card-face card-back absolute inset-0 rounded-lg border-2 border-gray-300 shadow-lg">
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
};

export default Card;
